import React, { Component } from "react";
export default class CardList extends Component {
    render() {
        return (
            <React.Fragment>
                {
                    this.props.notes !== undefined && this.props.notes.map((note) => {
                        return (
                            <article className="card" key={note.title}>
                                <div className="text">
                                    <h3>{note.title}</h3>
                                    <p>{note.description}</p>
                                </div>
                            </article>
                        );
                    })
                }
            </React.Fragment>
        );
    }
}
