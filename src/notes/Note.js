import React, { Component } from "react";
import "./Note.css";
import FundooNotesDisplay from "./FundooNotesDisplay";
export class Note extends Component {
  render = () => {
    return (
      <div>
        <div className="container-fluid">
          <FundooNotesDisplay notes={this.props.notes} />
        </div>
      </div>
    );
  };
}
