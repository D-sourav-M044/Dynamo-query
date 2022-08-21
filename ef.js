"use strict";
const AWS = require("aws-sdk");
const { insertDataToDDB } = require("./lib/DDBToolkit");

module.exports.hello = async (event) => {
  if (isAPIQuery(event)) {
    const fileName = event.queryStringParameters.name;
    if (!fileName) {
      return {
        statusCode: 400,
        body: "Please provide a file name"
      }
    }
    const s3 = new AWS.S3({ signatureVersion: 'v4' });
    const key = "uploaded_" + fileName;
    const params = { Bucket: process.env.BUCKETNAME, Key: key }
    try {
      const url = await s3.getSignedUrlPromise('putObject', params);
      return {
        statusCode: 200,
        body: JSON.stringify(url),
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        body: JSON.stringify(err.message)
      }
    }
  } else if (isValidPostRequest(event)) {
    const reqBody = JSON.parse(event.body);
    const fileName = reqBody.name;
    const metadata = reqBody.metadata;
    if (!fileName || !metadata) {
      return {
        statusCode: 400,
        body: "Please provide a file name and also provide metadata"
      }
    }
    try {
      metadata.uploadDate = new Date().toISOString();
      await insertDataToDDB(metadata);
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        body: JSON.stringify(err.message)
      }
    }
    return {
      statusCode: 200,
      body: "Data inserted successfully"
    }
  } else if (isAWSEvent(event)) {
    if (event.Records[0].eventSource === "aws:sqs") {
      const body = JSON.parse(event.Records[0].body);
      const ddb = new AWS.DynamoDB.DocumentClient({ region: process.env.REGION });
      if (body.Records) {
        let fileName = body?.Records[0]?.s3?.object?.key;
        if (fileName) {
          if (isValidForConversion(fileName)) {
            fileName = fileName.replace("uploaded_", "")
            const conversionResult = convertVideoFile(fileName);
            if (conversionResult.success) {
              return await writeFileToS3('converted_' + fileName, conversionResult.body);
            } else {
              return {
                statusCode: 500,
                body: JSON.stringify(conversionResult.body)
              }
            }
          } else {
            const params = {
              TableName: process.env.TABLENAME,
              Item: {
                'fileName': fileName,
                'message': "Written from lambda",
              }
            }
            try {
              await ddb.put(params).promise();
            } catch (err) {
              console.log(err);
              return {
                statusCode: 500,
                body: JSON.stringify(err.message)
              }
            }
          }
        }
      }
      return;
    } else if (event.Records[0].eventSource === "aws:dynamodb") {
      const eventName = event.Records[0]?.eventName;
      const fileName = event.Records[0]?.dynamodb?.Keys?.fileName?.S
      if (fileName && eventName) {
        const message = "User: Eftakhar, Action: " + eventName + " file: " + fileName;
        const sns = new AWS.SNS();
        const params = {
          Message: message,
          TopicArn: process.env.TOPICARN
        };
        try {
          await sns.publish(params).promise();
        } catch (err) {
          console.log(err);
          return {
            statusCode: 500,
            body: JSON.stringify(err.message)
          }
        }
      }
      return
    } else if (event.Records[0].EventSource === "aws:sns") {
      let message = event.Records[0].Sns?.Message
      if (message) {
        message += " from sns through serverless";
        try {
          const axios = require('axios').default;
          await axios.post(
            `${process.env.WEBHOOK_URL}${process.env.WEBHOOK_PATH}`,
            { 'content': message })
        } catch (err) {
          console.log(err);
          return {
            statusCode: 500,
            body: JSON.stringify(err.message)
          }
        };
      }
    } else if (event.Records[0].eventSource === "aws:s3") {
      if (event.Records[0].eventName === "ObjectRemoved:Delete") {
        return {
          statusCode: 200,
          body: "success"
        }
      }
    } else {
      console.log(event);
      return {
        statusCode: 500,
        message: "Unexpected AWS event"
      }
    }
  } else {
    return {
      statusCode: 400,
      body: "Unrecognized request format"
    }
  }
};
const isValidForConversion = (fileName) => {
  return fileName.startsWith('uploaded_')
    && (fileName.endsWith(".mp4") || fileName.endsWith(".mkv") || fileName.endsWith(".avi") || fileName.endsWith(".mov"))
}
const convertVideoFile = (fileName) => {
  const s3 = new AWS.S3({ signatureVersion: 'v4' });
  try {
    const url = s3.getSignedUrl('getObject', {
      Bucket: process.env.BUCKETNAME,
      Key: `uploaded_${fileName}`
    });
    const { readFileSync, unlinkSync } = require("fs");
    const { spawnSync } = require('node:child_process');
    spawnSync(
      "/opt/ffmpeg/ffmpeg",
      ["-i", `${url}`, "-f", "h264", "-y", "-s", "852x480", `/tmp/converted_${fileName}`],
      { stdio: "inherit" });
    const convertedFile = readFileSync(`/tmp/converted_${fileName}`);
    unlinkSync(`/tmp/converted_${fileName}`);
    return {
      success: true,
      body: convertedFile
    }
  } catch (err) {
    return {
      success: false,
      body: err.message
    }
  }
}
const writeFileToS3 = async (fileName, file) => {
  try {
    const s3 = new AWS.S3({ signatureVersion: 'v4' });
    await s3.putObject({
      Bucket: process.env.BUCKETNAME,
      Key: fileName,
      Body: file
    }).promise();

  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: JSON.stringify(err.message)
    }
  }
}
const isAPIQuery = (event) => {
  return event.queryStringParameters !== undefined
}
const isAWSEvent = (event) => {
  return event.Records !== undefined
}
const isValidPostRequest = (event) => {
  if (event.requestContext?.http?.method === "POST"
    && event.requestContext?.http?.path === "/upload") {
    return event.body !== null
  } else return null;
}