

export default function User({ customer,user,handleUserChange }) {
  if (customer === "BBC") {
    return (
      <div>
        <label>Select user</label>
        <select value={user} onChange={handleUserChange}>
          <option value="BBC">BBC</option>
          <option value="CNN">CNN</option>
          <option value="Aljazeera">Aljazeera</option>
          <option value="Foxnews">Foxnews</option>
          <option value="BTv">BTv</option>
        </select>
      </div>
    );
  }
  else if(customer==="BTv") 
  {
    return (
        <div>
          <label>Select user</label>
          <select value={user} onChange={handleUserChange}>
            <option value="sakib">sakib</option>
            <option value="sabbir">sabbir</option>
            <option value="Miraz">Miraz</option>
            <option value="Taskin">Taskin</option>
            <option value="Rubel">Rubel</option>
          </select>
        </div>
      );
  }
  else {
    // return <div> hello from user.</div>;
  }
}
