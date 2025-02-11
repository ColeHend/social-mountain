// @ts-nocheck
import React, { Component } from "react";

import "./Search.css";

import SearchIcon from "react-icons/lib/md/search";

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  render() {
    const { searchText, updateSearch } = this.props;
    const onChangeHandle = (ev) => updateSearch(ev.target.value);
    return (
      <section className="Search__parent">
        <div className="Search__content">
          <input
            onChange={onChangeHandle}
            value={searchText}
            placeholder="Search Your Feed"
          />

          <SearchIcon id="Search__icon" />
        </div>
      </section>
    );
  }
}
