import { useState } from 'react'
import UserCard from './UserCard'
import Greeting from './Greeting'

function App() {
  const [count, setCount] = useState(0)

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new user to users array
    (e) => setName(e.target.value)

  };

  const users = [
    { id: 1, name: "Dhiraj", age: 21, city: "Mumbai", isActive: true },
    { id: 2, name: "Ram", age: 25, city: "Delhi", isActive: false },
    { id: 3, name: "Sita", age: 23, city: "Bangalore", isActive: true }
  ];

  // Render all using map()

  return (
    <>
      <section id="center">
        <button onClick={() => setCount((count) => --count)}>-</button>
        <button
          type="button"
          className="counter"
        >
          {count}
        </button>
        <button onClick={() => setCount((count) => ++count)}>+</button>
        <button onClick={() => setCount(0)}>reset</button>

      </section>
      {users.map(user => <UserCard key={user.id} {...user} />)}

      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={handleSubmit} />
        <button >Submit</button>

        <p>you typed: {name}  </p>

      </form>


    </>
  )
}

export default App
