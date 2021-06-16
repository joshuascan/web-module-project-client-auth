import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialFriendValues = {
  id: "",
  name: "",
  age: "",
  email: "",
};

const FriendsList = (props) => {
  const [newFriend, setNewFriend] = useState(initialFriendValues);
  const { push } = useHistory();

  const handleChange = (e) => {
    setNewFriend({ ...newFriend, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/friends", { ...newFriend, id: Date.now() })
      .then((res) => {
        props.setFriends(res.data);
        setNewFriend(initialFriendValues);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (id) => {
    push(`/edit-friend/${id}`);
  };

  const handleDelete = (id) => {
    axiosWithAuth()
      .delete(`/api/friends/${id}`)
      .then((res) => {
        props.setFriends(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
      <div className="friends-container">
        {props.friends.map((friend) => (
          <div className="friend" key={friend.id}>
            <p>Name: {friend.name}</p>
            <p>Age: {friend.age}</p>
            <p>Email: {friend.email}</p>
            <button onClick={() => handleEdit(friend.id)}>Edit</button>
            <button type="submit" onClick={() => handleDelete(friend.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsList;
