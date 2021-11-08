import "./App.css";
import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS, GET_ONE_USER } from "./query/user";
import { CREATE_USER } from "./mutation/user";

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
    variables: { id: 1 },
  });
  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [username, setUserName] = useState("");
  const [age, setAge] = useState(0);
  console.log(oneUser);
  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data]);
  if (loading) {
    return <h1>Loading...</h1>;
  }

  const addUser = (e) => {
    e.preventDefault();
    newUser({ variables: { input: { username, age } } }).then(({ data }) => {
      console.log(data);
      setUserName("");
      setAge("");
    });
  };
  const getAllUsers = (e) => {
    e.preventDefault();
    refetch();
  };
  return (
    <div>
      <form>
        <input
          type="text"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <div className="btns">
          <button onClick={(e) => addUser(e)}>Add user</button>
          <button onClick={(e) => getAllUsers(e)}>Get users</button>
        </div>
      </form>
      <div>
        {users.map((user) => {
          return (
            <div className="user" key={user.id}>
              {user.id}. {user.username} {user.age}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
