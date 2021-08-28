import React, { Component } from "react";
export default class FundooNotesCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newNoteTitle: "",
      newNoteDescription: "",
    };
  }
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
    this.props.callback(this.state.newNoteTitle, this.state.newNoteDescription);
  };
  render() {
    return (
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
    );
  }
}
