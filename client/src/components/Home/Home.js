import React, { Component } from "react";
import { Jumbotron, Nav, Button, Container, Row, Col, Input } from "reactstrap";
import API from "../../utils/API";
import { List, ListItem } from "./List";
import "./List/style.css";

class App extends Component {
  state = {
    articles: [],
    articleSearch: "",
    startDate: "",
    endDate: "",
    startDateInvalid: false,
    endDateInvalid: false
  };

  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  getArticles = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    let searchParamaters = {};
    searchParamaters.q = this.state.articleSearch;
    if (/^([12]\d{3}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01]))$/.test(this.state.startDate)) {
      searchParamaters.begin_date = this.state.startDate;
      this.setState({
        startDateInvalid: false
      });
    } else this.setState({
      startDateInvalid: true
    });
    if (/^([12]\d{3}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01]))$/.test(this.state.endDate)) {
      searchParamaters.end_date = this.state.endDate;
      this.setState({
        endDateInvalid: false
      });
    } else this.setState({
      endDateInvalid: true
    });
    API.getArticles(searchParamaters)
      .then(res => {
        console.log(res.data);
        this.setState({
          articles: res.data
        })
      }
      )
      .catch(err => console.log(err));
  };

  saveArticle = event => {
    event.preventDefault();
    let title = event.target.getAttribute("title"),
      dataDate = event.target.getAttribute("data-date"),
      dataUrl = event.target.getAttribute("data-url"),
      dataSummary = event.target.getAttribute("data-summary");

    // console.log(title, dataDate, dataUrl, dataSummary);
    API.saveArticle(title, dataDate, dataUrl, dataSummary)
      .then(res => {
        console.log(res.data);
      }
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Nav />
        <Jumbotron>
          <h1 className="display-3">New York Times Articles Finder</h1>
          <p className="lead">Save Articles you like</p>
          <hr className="my-2" />
        </Jumbotron>
        <Container>
          <Row>
            <Col size="md-12">
              <form>
                <Container>
                  <h3>Topic</h3>
                  <Input
                    name="articleSearch"
                    value={this.state.articleSearch}
                    onChange={this.handleInputChange}
                    placeholder="Search For an Article"
                  />
                  <h3>Start Date (optional) <span className="date-warning">{this.state.startDateInvalid ? "Invalid Entry/Not Included in Search Result" : ""}</span></h3>
                  <Input
                    name="startDate"
                    value={this.state.startDate}
                    onChange={this.handleInputChange}
                    placeholder="Enter in YYYMMDD format"
                  />

                  <h3>End Date (optional) <span className="date-warning">{this.state.endDateInvalid ? "Invalid Entry/Not Included in Search Result" : ""}</span></h3>
                  <Input
                    name="endDate"
                    value={this.state.endDate}
                    onChange={this.handleInputChange}
                    placeholder="Enter in YYYYMMDD format"
                  />

                  <Col size="xs-3 sm-2">
                    <Button
                      id="search-nyt-main"
                      color="primary"
                      onClick={this.getArticles}
                      type="success"
                      className="input-lg"
                    >
                      Search
                      </Button>
                  </Col>
                </Container>
              </form>
            </Col>
          </Row>
          <Row>
            <Col size="xs-12">
              {!this.state.articles.length ? (
                <h1 className="text-center">No Articles to Display</h1>
              ) : (
                  <List>
                    {this.state.articles.map(article => {
                      return (
                        <ListItem
                          key={article._id}
                          id={article._id}
                          title={article.headline.main}
                          href={article.web_url}
                          pubDate={article.pub_date}
                          summary={article.snippet}
                          saveArticle={this.saveArticle}
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
