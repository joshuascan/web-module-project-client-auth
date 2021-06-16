import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialFormValues = {
  name: "",
  age: "",
  email: "",
};

const EditFriend = (props) => {
  const [formValues, setFormValues] = useState(initialFormValues);

  const { id } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosWithAuth().get(`/api/friends/${id}`);
        const { name, age, email } = data;

        setFormValues((prev) => ({ ...prev, name, age, email }));
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/friends/${id}`, formValues)
      .then((res) => {
        props.setFriends(res.data);
        push("/friends");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h4>Edit Friend</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formValues.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formValues.age}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          value={formValues.email}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default EditFriend;
