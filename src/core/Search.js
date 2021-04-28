import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  // Destructure state
  const { categories, category, search, results, searched } = data;

  // loads categories returned from getCategories
  const loadCategories = () => {
    getCategories().then((res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        setData({ ...data, categories: res });
      }
    });
  };

  // load categories on page load
  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    // console.log(search, category);
    if (search) {
      list({ search: search || undefined, category: category }).then((res) => {
        if (res.error) {
          console.log(res.error);
        } else {
          setData({ ...data, results: res, searched: true });
        }
      });
    }
  };

  // searches for data on search submit
  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  // change handler for inputs
  const handleChange = (name) => (e) => {
    setData({ ...data, [name]: e.target.value, searched: false });
  };

  // Creates product cards based on search results
  const searchedProducts = (results = []) => {
    return (
      <div className="row">
        {results.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>
    );
  };

  // Returns search form
  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select
              value={category}
              className="btn mr-2"
              onChange={handleChange("category")}
            >
              <option value="All">Pick Category</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <div className="container-fluid mb-3">{searchedProducts(results)}</div>
    </div>
  );
};

export default Search;
