import "./App.css";
import Contacts from "./components/contacts/Contacts";
import FormComponent from "./components/form/FormComponent";
import { AddUser, UpdateUser } from "./utils/functions";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  username: "",
  phoneNumber: "",
  gender: "",
};

function App() {
  const [info, setInfo] = useState(initialValues);
  const [isAdd, setIsAdd] = useState("ADD");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (info.id) {
      UpdateUser(info);
    } else {
      AddUser(info);
    }
    setIsAdd("ADD");
    setInfo(initialValues);
  };

  const showInForm = (id, username, phoneNumber, gender) => {
    setIsAdd("UPDATE");
    setInfo({ id, username, phoneNumber, gender });
  };

  return (
    <div className="App">
      <ToastContainer />
      <FormComponent
        info={info}
        setInfo={setInfo}
        handleSubmit={handleSubmit}
        isAdd={isAdd}
      />
      <Contacts showInForm={showInForm} />
    </div>
  );
}

export default App;
