import React, { Component } from "react";
import axios from "axios";
import "./App.css";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";
import Post from "./Post/Post";

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      search: "",
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
  }

  componentDidMount() {
    axios.get("https://practiceapi.devmountain.com/api/posts").then((res) => {
      this.setState({ posts: res.data });
    });
  }

  updatePost(id, text) {
    axios
      .put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
      .then((results) => {
        this.setState({ posts: results.data });
      });
  }

  deletePost(id) {
    axios
      .delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then((results) => {
        this.setState({ posts: results.data });
      });
  }

  createPost(text) {
    axios
      .post("https://practiceapi.devmountain.com/api/posts", { text })
      .then((results) => {
        this.setState({ posts: results.data });
      });
  }
  updateSearch(value) {
    this.setState({ search: value });
  }
  render() {
    const { posts, search } = this.state;
    const filtered = posts.filter((ele) => {
      return ele.text.includes(search);
    });
    return (
      <div className="App__parent">
        <Header search={search} updateSearch={this.updateSearch} />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {search.length > 0
            ? filtered.map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  text={post.text}
                  date={post.date}
                  updatePostFn={this.updatePost}
                  deletePostFn={this.deletePost}
                />
              ))
            : posts.map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  text={post.text}
                  date={post.date}
                  updatePostFn={this.updatePost}
                  deletePostFn={this.deletePost}
                />
              ))}
        </section>
      </div>
    );
  }
}

export default App;
