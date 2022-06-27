import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "./userSlice";
import { v4 as uuidv4 } from 'uuid';

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
  });
  const handleAddUser = () => {
    dispatch(
      addUser({
        id: uuidv4(),
        name: values.name,
        email: values.email,
      })
    );
    setValues({ name: "", email: "" });
    navigate("/");
  };
  return (
    <div className="mt-10 max-w-xl mx-auto">
      <TextField
        label="Name"
        value={values.name}
        onChange={(e) => setValues({ ...values, name: e.target.value })}
        inputProps={{ type: "text", placeholder: "John Doe" }}
      />
      <TextField
        label="Email"
        value={values.email}
        onChange={(e) => setValues({ ...values, email: e.target.value })}
        inputProps={{ type: "email", placeholder: "johndoe@mail.com" }}
      />
      <Button onClick={handleAddUser}>Submit</Button>
    </div>
  );
};

export default AddUser;
