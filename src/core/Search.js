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

  const responsiveDropdown = () => {
    const searchDropdown = document.querySelector(".search-dropdown");
    if (window.innerWidth <= 576) {
      searchDropdown.classList.remove("input-group-prepend");
      searchDropdown.classList.add("input-group");
    } else {
      searchDropdown.classList.remove("input-group");
      searchDropdown.classList.add("input-group-prepend");
    }
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 576) {
        searchDropdown.classList.remove("input-group-prepend");
        searchDropdown.classList.add("input-group");
      } else {
        searchDropdown.classList.remove("input-group");
        searchDropdown.classList.add("input-group-prepend");
      }
    });
  };

  // load categories on page load
  useEffect(() => {
    responsiveDropdown();
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

  // Creates content of search message
  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };

  // Creates product cards based on search results
  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
        <div className="row">
          {results.map((product, i) => (
            <div key={i} className="col-12 col-md-6 col-xl-4 mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Returns search form
  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="search-dropdown input-group-prepend">
            <select
              value={category}
              className="btn mr-2"
              onChange={handleChange("category")}
            >
              <option value="All">All</option>
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
