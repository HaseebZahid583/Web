const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const users = [];
const pets = [];

const SECRET_KEY = 'ABC';

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token is required');
  jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
    if (err) return res.status(500).send('Invalid Token');
    req.userId = decoded.id;
    next();
  });
};

app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  const user = { id: users.length + 1, email, password };
  users.push(user);
  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(400).send('Invalid email or password');
  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

app.get('/pets', verifyToken, (req, res) => {
  res.json(pets.filter(pet => pet.userId === req.userId));
});

app.post('/pets', verifyToken, (req, res) => {
  const { name, type, breed, price } = req.body;
  const pet = { id: pets.length + 1, userId: req.userId, name, type, breed, price };
  pets.push(pet);
  res.json(pet);
});

app.put('/pets/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { name, type, breed, price } = req.body;
  const petIndex = pets.findIndex(p => p.id == id && p.userId == req.userId);
  if (petIndex === -1) return res.status(404).send('Pet not found');
  pets[petIndex] = { ...pets[petIndex], name, type, breed, price };
  res.json(pets[petIndex]);
});

app.delete('/pets/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const petIndex = pets.findIndex(p => p.id == id && p.userId == req.userId);
  if (petIndex === -1) return res.status(404).send('Pet not found');
  pets.splice(petIndex, 1);
  res.send('Pet deleted');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
