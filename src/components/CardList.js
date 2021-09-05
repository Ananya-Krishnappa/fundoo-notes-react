import React from "react";
export default function Dashboard(props) {
    return (
        <React.Fragment>
            {
                props.notes !== undefined && props.notes.map((note) => {
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
