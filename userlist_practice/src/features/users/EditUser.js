import { useDebugValue, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Button from "../../components/Button";
import TextField from "../../components/TextField";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "./userSlice";

const EditUser = () => {
  const params = useParams();
  console.log(params);
  const dispatch = useDispatch();
  const users = useSelector((store) => store.users);
  const navigate = useNavigate();
  const existingUser = users.filter((user) => user.id === params.id);
  const { name, email } = existingUser[0];
  const [values, setValues] = useState({
    name,
    email,
  });
  const handleEditUser = () => {
    setValues({ name: "", email: "" });
    dispatch(
      editUser({
        id: params.id,
        name: values.name,
        email: values.email,
      })
    );
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
      <Button onClick={handleEditUser}>Edit</Button>
    </div>
  );
};

export default EditUser;
