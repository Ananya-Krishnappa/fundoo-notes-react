import React, { Component } from "react";
import "./App.css";
import FundooNotesBanner from "./FundooNotesBanner";
import FundooNotesCreator from "./FundooNotesCreator";
import FundooNotesDisplay from "./FundooNotesDisplay";
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
    };
  }

  createNote = (title, description) => {
    if (
      !this.state.noteList.find((note) => {
        return note.title === title;
      })
    ) {
      this.setState({
        noteList: [
          ...this.state.noteList,
          {
            title: title,
            description: description,
            isPinned: false,
          },
        ],
      });
    }
  };

  render = () => {
    return (
      <div>
        <FundooNotesBanner userName={this.state.userName} />
        <div className="container-fluid">
          <FundooNotesCreator callback={this.createNote} />
          <FundooNotesDisplay notes={this.state.noteList} />
        </div>
      </div>
    );
  };
}
