const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
app.use(express.urlencoded({ extended: true }));
const htmlForm = `
<form method='POST' action='/users'>
<input type='text' name='name' placeholder='Enter Your Name'></input>
<input type='email' name='email' placeholder='Enter Your Email'></input>
<button type='submit'>Save user </button>
</form>
`;

const Users = [
  { id: 1, name: "Akib Bro", email: "akib@gmail.com" },
  { id: 2, name: "Tasib Bro", email: "tasib@gmail.com" },
];
const Books = [
  { id: 1, userId: 1, name: "Akib Bro", description: "This is great job" },
  {
    id: 2,
    userId: 2,
    name: "Tasib Bro",
    description: "Relay this is great job",
  },
];
app.get("/", (req, res) => {
  res.send("Welcome Backend Task");
});
// GET BOOKS DATA
app.get("/books", (req, res) => {
  const book = Books;
  res.send(book);
});
// GET USERS DATA
app.get("/users", (req, res) => {
  res.send(htmlForm);
});
app.post("/users", (req, res) => {
  const id = Users.length + 1;
  const name = req.body.name;
  const email = req.body.email;
  const user = {
    id,
    name,
    email,
  };
  Users.push(user);
  res.status(201).json({ success: true, Users });
});
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const filter = { id: id };
  const result = Users.filter((user) => user.id !== filter);
  res.send(result);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
