const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} ${new Date().toISOString()}`);
    next();
});

// ✅ Add validation middleware BEFORE routes
const validateUser = (req, res, next) => {
    const { name, age, city } = req.body;
    
    if (!name || !age || !city) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    
    if (age < 0 || age > 150) {
        return res.status(400).json({ error: "Invalid age" });
    }
    
    next();  // ✅ validation passed, continue to route
};

let users = [
    { id: 1, name: "Dhiraj", age: 21, city: "Mumbai", isActive: true },
    { id: 2, name: "Ram", age: 25, city: "Delhi", isActive: false },
    { id: 3, name: "Sita", age: 23, city: "Bangalore", isActive: true }
];

// GET all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// GET single user
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// ✅ POST - Add validateUser middleware
app.post('/api/users', validateUser, (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age,
        city: req.body.city,
        isActive: true
    };
    
    users.push(newUser);
    res.status(201).json(newUser);
});

// ✅ PUT - Add validateUser middleware
app.put('/api/users/:id', validateUser, (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
        users[userIndex] = {
            id: userId,
            name: req.body.name,
            age: req.body.age,
            city: req.body.city,
            isActive: req.body.isActive
        };
        res.json(users[userIndex]);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// DELETE - No validation needed
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1);
        res.json({ message: "User deleted", user: deletedUser[0] });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});