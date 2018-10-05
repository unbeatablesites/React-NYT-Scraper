import axios from "axios";

// Export an object with a "search" method that searches the Giphy API for the passed query
export default {
  getArticles: function (query) {
    let queryParams = {};
    queryParams.q = query.q;
    if (query.begin_date) queryParams.begin_date = query.begin_date;
    if (query.end_date) queryParams.end_date = query.end_date;
    queryParams["api-key"] = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
    return axios.get("/api/articles", {
      params: queryParams
    });
  },

  saveArticle: function (title, date, url, summary) {
    return axios.post('/api/articles', {
      title: title,
      pubDate: date,
      link: url,
      summary: summary
    });
  },

  getSaved: function () {
    return axios.get('/api/saved');
  },

  saveNote: function (id, title, text) {
    return axios.post(`/api/note/${id}`, {
      title: title,
      body: text
    });
  },

  removeArticle: function (id) {
    return axios.post('/api/delete/article', {
      id: id
    });
  },

  removeNote: function (note, article) {
    return axios.post('/api/delete/note', {
      note: note,
      article: article
    });
  },

};

