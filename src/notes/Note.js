import React, { Component } from "react";
import "./Note.css";
import SideNav from "../components/SideNav";
export class Note extends Component {
  render = () => {
    return (
      <div>
        <div className="container-fluid">
          <SideNav notes={this.props.notes}></SideNav>
        </div>
      </div>
    );
  };
}
