import React from "react";
import {
  Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from "reactstrap";


export const ListItem = ({ id, title, href, pubDate, summary, saveArticle }) => (
  <li className="list-group-item">
    <Card id={id}>
      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardSubtitle>Published: {pubDate}</CardSubtitle>
        <CardSubtitle><a href={href} target="_blank">Go to Article</a></CardSubtitle>
        <CardText>Summary: {summary}</CardText>
        <Button
          color="info"
          title={title}
          data-date={pubDate}
          data-url={href}
          data-summary={summary}
          onClick={saveArticle}
        >Save Article</Button>
      </CardBody>
    </Card>
  </li>)