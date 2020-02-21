//Make sure to go to react-backend and start server first

fetch("/accounts")
  .then(res => res.json())
  .then(data => data["0"])
  .then(row => console.log(row));

//will log the account id for given row
