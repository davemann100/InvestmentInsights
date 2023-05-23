import React, { useState } from "react";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard.jsx</h1>
      <marquee>Stock Tickers Here</marquee>
      <p>Stock Search</p>
      <input placeholder="Ex: AAPL" />
      <button>Submit</button>
      <table>
        <thead>
          <th>test1</th>
          <th>test2</th>
        </thead>
        <tbody>
          <td>content1</td>
          <td>content2</td>
        </tbody>
      </table>
      <button>Create</button>
    </div>
  );
};

export default Dashboard;
