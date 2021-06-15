import { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialFriendValues = {
  name: "",
  age: "",
  email: "",
};

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState(initialFriendValues);

  useEffect(() => {
    axiosWithAuth()
      .get("/api/friends")
      .then((res) => {
        setFriends(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setNewFriend({ ...newFriend, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>List of Friends</h2>
      <div>
        <h4>Add New Friend</h4>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newFriend.name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={newFriend.age}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            value={newFriend.email}
            onChange={handleChange}
          />
          <button>Add Friend</button>
        </form>
      </div>
      <div>
        {friends.map((friend) => (
          <div key={friend.id}>
            <p>Name: {friend.name}</p>
            <p>Age: {friend.age}</p>
            <p>Email: {friend.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
