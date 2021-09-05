import React, { useContext, useEffect, useState } from "react";
import "./Dashboard.css";
import SideNav from "./SideNav";
import { findAllNotes, findTrashedNotes, findArchivedNotes } from "../services/Api";
import { AuthContext } from "../context/AuthContext";
import Notification from "./Notification";
export default function Dashboard(props) {
  const [notes, setNotes] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  useEffect(() => {
    findNotes("all");
  }, []);
  const { userId } = useContext(AuthContext);
  const getNotesSuccess = (res) => {
    if (res.data.success === true) {
      setNotes(res.data.data);
    } else {
      setNotify({
        isOpen: true,
        message: res.message,
        type: "error",
      });
    }
  }
  const getNotesError = (error) => {
    let message;
    if (error.message.includes("500")) {
      message = "Error while retrieving the notes";
    }
    else if ((error.message.includes("400"))) {
      message = "Bad request";
    }
    else {
      message = error.response && error.response.data.message;
    }
    setNotify({
      isOpen: true,
      message: message,
      type: "error",
    });
  }
  const findNotes = (status) => {
    if (status === "trash") {
      findTrashedNotes(userId).then((res) => {
        getNotesSuccess(res);
      }).catch((error) => {
        getNotesError(error);
      });
    } else if (status === "archive") {
      findArchivedNotes(userId).then((res) => {
        getNotesSuccess(res);
      }).catch((error) => {
        getNotesError(error);
      });
    } else {
      findAllNotes(userId).then((res) => {
        getNotesSuccess(res);
      }).catch((error) => {
        getNotesError(error);
      });
    }
  }
  return (
    <div>
      <div className="container-fluid">
        <div>{props.match.params.status}</div>
        <SideNav callback={findNotes} notes={notes}></SideNav>
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </div>
  );
}
