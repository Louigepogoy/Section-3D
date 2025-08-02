const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let mockData = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];


app.get('/api/users', (req, res) => {
  res.json(mockData);
});


app.post('/api/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  const newUser = { id: Date.now(), name };
  mockData.push(newUser);
  res.status(201).json(newUser);
});


app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  const user = mockData.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  user.name = name;
  res.json(user);
});


app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = mockData.length;
  mockData = mockData.filter(u => u.id !== id);
  if (mockData.length === initialLength) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json({ message: "User deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
