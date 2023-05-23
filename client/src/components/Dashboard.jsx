<<<<<<< HEAD
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  //quick search functionality
  const searchHandler = (e) => {
    e.preventDefault();
    console.log("search click");
  };

  return (
    <div>
      <p className="text-center text-warning">Dashboard.jsx</p>
      <h1 className="text-center">Welcome -FirstNameHere-</h1>
      {/* Scrolling tickers */}
      <marquee>
        <div>
          <p className="bg-danger text-dark w-50 text-center border border-success">
            TSLA=$172.32 META=$172.32 NVDA=$172.32
          </p>
        </div>
      </marquee>

      {/* L/R cols for chart and quick search */}
      <div className="container d-flex justify-content-between">
        <div className="left">
          <p>$.Chart Here.$</p>
          <p>-need todo research-</p>
        </div>
        <div className="right">
          <form onSubmit={searchHandler}>
            <label htmlFor="search">Quick Search</label>
            <input name="search" placeholder="Ex: AAPL" />
            <button>Search</button>
          </form>
          <div className="card p-3">
            <h4 className="text-center text-success">Search Results</h4>
            <table className="table text-small">
              <thead>
                <tr>
                  <th scope="col">Ticker</th>
                  <th scope="col">-stock name here-</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Current Price</th>
                  <td>-price here-</td>
                </tr>
                <tr>
                  <th scope="row">Open</th>
                  <td>-price here-</td>
                </tr>
                <tr>
                  <th scope="row">Today's High</th>
                  <td>-price here-</td>
                </tr>
                <tr>
                  <th scope="row">Today's Low</th>
                  <td>-price here-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <hr></hr>
      {/* Records table */}
      <div className="container">
        <div className="w-25 d-flex justify-content-between">
          <h4>Trade Tracker</h4>
          <Link to={"/create"}>
            <button className="bg-success rounded-4 p-2">Insert</button>
          </Link>
        </div>
        <table className="table table-striped table-bordered table-hover rounded">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Buy-Sell</th>
              <th scope="col">Stock</th>
              <th scope="col"># Shares</th>
              <th scope="col">Purchase Price</th>
              <th scope="col">Total Cost</th>
              <th scope="col">Stop Loss</th>
              <th scope="col">Max Risk</th>
              <th scope="col">Current Price</th>
              <th scope="col">P/L</th>
              <th scope="col">ROI</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">05-15-2023</th>
              <td>Buy</td>
              <td>NVDA</td>
              <td>5</td>
              <td>$302.25</td>
              <td>$1511.25</td>
              <td>$295</td>
              <td>$36.25</td>
              <td>-autofill-</td>
              <td>-autofill-</td>
              <td>-autofill-</td>
            </tr>
            <tr>
              <th scope="row">05-15-2023</th>
              <td>Buy</td>
              <td>NVDA</td>
              <td>5</td>
              <td>$302.25</td>
              <td>$1511.25</td>
              <td>$295</td>
              <td>$36.25</td>
              <td>-autofill-</td>
              <td>-autofill-</td>
              <td>-autofill-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
=======
import React from 'react';

const Dashboard = () => {
  return <div>Welcome to the dashboard!</div>;
};

export default Dashboard;
>>>>>>> c92074dcfe1a07e80d1e3949aa9e61ff06ae771f
