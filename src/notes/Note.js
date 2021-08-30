import React, { Component } from "react";
import "./Note.css";
import FundooNotesBanner from "./FundooNotesBanner";
import FundooNotesDisplay from "./FundooNotesDisplay";
export class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Ananya",
    };
  }

  render = () => {
    return (
      <div>
        <FundooNotesBanner userName={this.state.userName} />
        <div className="container-fluid">
          <FundooNotesDisplay notes={this.props.notes} />
        </div>
      </div>
    );
  };
}
