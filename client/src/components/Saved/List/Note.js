import React from "react";
import { Button } from "reactstrap";


export const Note = ({ article, id, title, body, deleteNote }) => (
    <li className="list-group-item">
        <h4 id={id}>{title}</h4>
        <p>{body}</p>
        <Button article-id={article} note-id={id} color="warning" onClick={deleteNote}>Delete Note</Button>
    </li>
)