import React, { Component } from "react";
import {
  Jumbotron, Nav, Button,
  Container, Row, Col, Input,
  Modal, ModalHeader,
  Form, FormGroup, Label
} from "reactstrap";
import API from "../../utils/API";
import { List, SavedItem } from "./List";

class App extends Component {
  state = {
    articles: [],
    articleid: "",
    notetitle: "",
    notetext: "",
    modal: false
  };

  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  componentDidMount = () => {
    API.getSaved().then(res => {
      console.log(res.data);
      this.setState({ articles: res.data })
    }).catch(err => console.log(err));
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  idToggle = event => {
    event.preventDefault();
    //console.log(event.target.name);
    this.setState({
      articleid: event.target.name
    })
    this.toggle();
  };

  addNote = event => {
    event.preventDefault();
    //console.log(event.target.name, this.state.notetitle, this.state.notetext);
    this.toggle();
    API.saveNote(event.target.name, this.state.notetitle, this.state.notetext)
      .then(res => {
        window.location.reload();
        console.log(res.data);
      }).catch(err => console.log(err));
  };

  deleteNote = event => {
    event.preventDefault();
    let article = event.target.getAttribute("article-id"),
      note = event.target.getAttribute("note-id");

    //console.log("WHY DOESNT THIS SHOW UP",note, article);
    API.removeNote(note, article)
      .then(res => {
        window.location.reload();
        console.log(res.data);
      }).catch(err => console.log(err));
  };

  deleteArticle = event => {
    event.preventDefault();
    //console.log(event.target.name);
    API.removeArticle(event.target.name)
      .then(res => {
        window.location.reload();
        console.log(res.data);
      }).catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add A Note</ModalHeader>
          <Form>
            <FormGroup>
              <Label for="noteTitle">Title</Label>
              <Input type="email" name="notetitle" id="noteTitle" placeholder="Enter a Title" onChange={this.handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label for="noteText">Note</Label>
              <Input type="textarea" name="notetext" id="noteText" onChange={this.handleInputChange} />
            </FormGroup>
            <Button color="primary" name={this.state.articleid} onClick={this.addNote}>Submit Note</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </Form>
        </Modal>
        <Nav />
        <Jumbotron>
          <h1 className="display-3">NYT Saved Articles</h1>
          <p className="lead">Search for and annotate articles of interest</p>
          <hr className="my-2" />
        </Jumbotron>
        <Container>
          <Row>
            <Col size="xs-12">
              {!this.state.articles.length ? (
                <h1 className="text-center">No Articles to Display</h1>
              ) : (
                  <List>
                    {this.state.articles.map(article => {
                      return (
                        <SavedItem
                          key={article._id}
                          id={article._id}
                          title={article.title}
                          href={article.link}
                          pubDate={article.pubDate}
                          saveDate={article.saveDate}
                          notes={article.notes}
                          idToggle={this.idToggle}
                          summary={article.summary}
                          deleteArticle={this.deleteArticle}
                          addNote={this.addNote}
                          deleteNote={this.deleteNote}
                        />
                      );
                    })}
                  </List>
                )}
            </Col>
          </Row>
        </Container >
      </div >
    );
  }
}

export default App;