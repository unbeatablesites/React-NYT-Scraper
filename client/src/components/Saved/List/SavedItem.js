import React from "react";
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from "reactstrap";
import { List, Note } from "../List";

export const SavedItem = ({ id, title, href, pubDate, saveDate, notes, summary, deleteArticle, idToggle, deleteNote }) => (
  <li className="list-group-item">
    <Card id={id}>
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardSubtitle>Published: {pubDate}</CardSubtitle>
        <CardSubtitle>Saved: {saveDate}</CardSubtitle>
        <CardText>Summary: {summary}</CardText>
        <CardSubtitle><a href={href} target="_blank">Go to Article</a></CardSubtitle>
        <Button
          color="danger"
          name={id}
          onClick={deleteArticle}
        >Delete Article</Button>
        <h2>Notes:</h2>
        <ul>
          {!notes.length ? (<h1 className="text-center">No Notes</h1>) :
            <List>{
              notes.map(note => {
                return (
                  <Note
                    article={id}
                    key={note._id}
                    id={note._id}
                    title={note.title}
                    body={note.body}
                    deleteNote={deleteNote}
                  />
                )
              }
              )}
            </List>
          }
        </ul>
        <Button color="primary" name={id} onClick={idToggle}>New Note</Button>
      </CardBody>
    </Card>
  </li>)