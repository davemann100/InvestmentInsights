import React, { useState } from "react";

const Dashboard = (props) => {
  return (
    <div>
      <h1>Dashboard.jsx</h1>
      <marquee>Stock Tickers Here</marquee>
      <p>Stock Search</p>
      <input placeholder="Ex: AAPL" />
      <button>Submit</button>
      <table className="border border-danger">
        <thead>
          <tr>
            <th>test1</th>
            <th>test2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>content1</td>
            <td>content2</td>
          </tr>
        </tbody>
      </table>
      <button>Create</button>
    </div>
  );
};

export default Dashboard;
