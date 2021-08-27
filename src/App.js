import React, { Component } from "react";
import "./App.css";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Ananya",
      noteList: [
        {
          title: "note1",
          description: "note desc1",
          isPinned: false,
        },
        {
          title: "note2",
          description: "note desc2",
          isPinned: false,
        },
        {
          title: "note3",
          description: "note desc3",
          isPinned: false,
        },
      ],
      newNoteTitle: "",
      newNoteDescription: "",
    };
  }
  changeStateData = () => {
    this.setState({
      userName: this.state.userName === "Ananya" ? "Anu" : "Ananya",
    });
  };
  updateNewNoteTitle = (event) => {
    this.setState({
      newNoteTitle: event.target.value,
    });
  };
  updateNewNoteDescription = (event) => {
    this.setState({
      newNoteDescription: event.target.value,
    });
  };
  createNote = () => {
    if (
      !this.state.noteList.find((note) => {
        return note.title === this.state.newNoteTitle;
      })
    ) {
      this.setState({
        noteList: [
          ...this.state.noteList,
          {
            title: this.state.newNoteTitle,
            description: this.state.newNoteDescription,
            isPinned: false,
          },
        ],
      });
    }
  };
  populateNotes = () => {
    return this.state.noteList.map((note) => (
      <article className="card">
        <div className="text">
          <h3>{note.title}</h3>
          <p>{note.description}</p>
        </div>
      </article>
    ));
  };
  render = () => {
    return (
      <div>
        <h4 className="bg-primary text-white text-center p-2">
          {this.state.userName}'s Fundoo Notes
        </h4>
        <div className="container-fluid">
          <div className="my-1">
            <input
              className="form-control"
              value={this.state.newNoteTitle}
              onChange={this.updateNewNoteTitle}
            ></input>
            <input
              className="form-control"
              value={this.state.newNoteDescription}
              onChange={this.updateNewNoteDescription}
            ></input>
            <button className="btn btn-primary m-2" onClick={this.createNote}>
              Add Note
            </button>
          </div>
          <main className="cards">{this.populateNotes()}</main>
        </div>
      </div>
    );
  };
}
