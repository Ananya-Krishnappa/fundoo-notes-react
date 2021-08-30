import React, { Component } from "react";
export default class FundooNotesBanner extends Component {
  render() {
    return (
      <h4 className="bg-primary text-white text-center p-2">
        {this.props.userName}'s Fundoo Notes
      </h4>
    );
  }
}
