const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: "*"
}));

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB!'))
    .catch(err => console.error('❌ Error:', err));

// ✅ Schema with isActive
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    city: { type: String, required: true },
    isActive: { type: Boolean, default: true }  // ✅ Added
});

const User = mongoose.model('User', userSchema);

const validateUser = (req, res, next) => {
    const { name, age, city } = req.body;
    if (!name || !age || !city) {
        return res.status(400).json({ error: "Missing fields" });
    }
    if (age < 0 || age > 150) {
        return res.status(400).json({ error: "Invalid age" });
    }
    next();
};

app.get("/", (req, res) => {
    res.send("Backend is running");
});

// GET all
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET single
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST - Create
app.post('/api/users', validateUser, async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            age: req.body.age,
            city: req.body.city,
            isActive: true  // ✅ Default to true
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// PUT - Update ✅ Fixed to handle isActive
app.put('/api/users/:id', async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                age: req.body.age,
                city: req.body.city,
                isActive: req.body.isActive  // ✅ Save isActive
            },
            { new: true }
        );
        if (updated) {
            res.json(updated);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE
app.delete('/api/users/:id', async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (deleted) {
            res.json({ message: "User deleted", user: deleted });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});