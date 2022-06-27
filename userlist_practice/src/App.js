import logo from "./logo.svg";
import "./App.css";
import UserList from "./features/users/UserList";
import { Route, Routes } from "react-router";
import AddUser from "./features/users/AddUser";
import EditUser from "./features/users/EditUser";

function App() {
  return (
    <div className="container mx-auto px-2 maw-w-5xl pt-10 md:pt32">
      <h1 className="text-center font-bold text-2xl text-gray-700">
        CRUD with redux toolkit
      </h1>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default App;
