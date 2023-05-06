import { useState } from "react";

import "./App.css";
import { useEffect } from "react";
import { data } from "autoprefixer";

function App() {
  const [users, setUsers] = useState([]);
  const handleuser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { name, email };
    console.log(user);
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        const newUser = [...users, data];
        setUsers(newUser);
        e.target.reset();
      });
  };
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  return (
    <>
      <form onSubmit={handleuser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="add user" />
      </form>
      <h1>User management system</h1>
      {users.map((user) => (
        <p key={user.id}>
          {user.id} : {user.name} : {user.email}
        </p>
      ))}
    </>
  );
}

export default App;
