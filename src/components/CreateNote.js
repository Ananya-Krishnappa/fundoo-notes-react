import React, { useContext, useEffect, useState, useRef } from "react";
import "./CreateNote.scss";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
}));

export default function CreateNote(props) {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    const classes = useStyles();
    const [toggleCreateNote, setToggleCreateNote] = useState(false);
    const toggleAccordian = () => {
        setToggleCreateNote(!toggleCreateNote ? true : true);
    }
    const closeAccordian = () => {
        setToggleCreateNote(!toggleCreateNote);
    }
    const closeIfOpenAccordian = () => {
        setToggleCreateNote(toggleCreateNote ? false : false);
    }
    /**
 * Hook that alerts clicks outside of the passed ref
 */
    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    closeIfOpenAccordian();
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    return (
        <div ref={wrapperRef} className="create-note-container">
            {toggleCreateNote && <React.Fragment><div className="pin-note"></div>
                <TextField id="title-input" placeholder="Title" fullWidth InputProps={{ classes, disableUnderline: true }} /></React.Fragment>}
            <TextField id="desc-input" placeholder="Take a note..." fullWidth
                InputProps={{ classes, disableUnderline: true }} onClick={toggleAccordian} />
            {toggleCreateNote && <div className="create-note-bottom-panel">
                <button className="close-create-note" onClick={closeAccordian}>Close</button>
            </div>}
        </div>
    );
}