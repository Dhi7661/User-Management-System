import { useState, useEffect } from 'react';
import UserCard from './UserCard';

function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [city, setCity] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/users`)
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error("Fetch error:", err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!name || !age || !city) {
            setError("All fields are required!");
            return;
        }

        if (age < 0 || age > 100) {
            setError("Age must be between 0 and 100!");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, age: Number(age), city })
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error);
                return;
            }

            const newUser = await response.json();
            setUsers([...users, newUser]);

            setName("");
            setAge("");
            setCity("");
        } catch (err) {
            setError("Failed to add user!");
            console.error(err);
        }
    };

    const deleteUser = async (id) => {
        await fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
            method: "DELETE"
        });
        setUsers(users.filter(user => user._id !== id));
    };

    const toggleStatus = async (id) => {
        const user = users.find(u => u._id === id);
        const updatedUser = { ...user, isActive: !user.isActive };

        await fetch(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser)
        });

        setUsers(users.map(u => u._id === id ? updatedUser : u));
    };

    return (
        <main className="min-h-screen bg-gray-100 px-4 py-10">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">
                        User Management System
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Add, delete and manage user status
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mb-8 rounded-2xl bg-white p-6 shadow-md"
                >
                    {error && (
                        <p className="mb-4 rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700">
                            {error}
                        </p>
                    )}

                    <div className="grid gap-4 md:grid-cols-4">
                        <input
                            className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                            type="number"
                            placeholder="Age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />

                        <input
                            className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />

                        <button
                            className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
                            type="submit"
                        >
                            Add User
                        </button>
                    </div>
                </form>

                <div className="grid gap-4 md:grid-cols-2">
                    {users.map(user => (
                        <UserCard
                            key={user._id}
                            {...user}
                            onToggle={() => toggleStatus(user._id)}
                            onDelete={() => deleteUser(user._id)}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default App;