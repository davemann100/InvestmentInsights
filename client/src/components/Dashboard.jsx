import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import stockchart from "../stockchart.png";

const Dashboard = (props) => {
  // state variable holding all records
  const [records, setRecords] = useState([]);
  // state var holding search input
  const [search, setSearch] = useState("");
  // state var holding api response
  const [apiResponse, setApiResponse] = useState({});

  // set state with api request on page load
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/records")
      .then((serverResponse) => {
        console.log(serverResponse.data.Record);
        setRecords(serverResponse.data.Record);
      })
      .catch((errorObj) => {
        console.log("*ERROR", errorObj);
      });
  }, []);

  //quick search functionality
  const searchHandler = async (e) => {
    e.preventDefault();
    try {
      const api1Response = await axios.get(
        `https://api.twelvedata.com/stocks?symbol=${search}&apikey=${process.env.REACT_APP_API_KEY}&exchange=NYSE`
      );
      console.log(api1Response.data);
      setApiResponse(api1Response.data);
    } catch (error) {
      console.error("An error occurred during API calls:", error);
    }
  };

  return (
    <div>
      <h1 className="text-light">Welcome Back!</h1>
      {/* Scrolling tickers */}
      <marquee>
        <div>
          <p className="bg-danger text-dark w-100 text-center border border-success">
            SPY $418.61 | META $256.32 | NVDA=$384.16 | SPY $418.61 | META
            $256.32 | NVDA=$384.16
          </p>
        </div>
      </marquee>

      {/* L/R cols for chart and quick search */}
      <div className="container d-flex">
        <div className="left w-50">
          <p className="text-danger">Live Chart</p>
          <img src={stockchart} className="w-75" />
        </div>
        <div className="right">
          <form onSubmit={searchHandler}>
            <label htmlFor="search" className="text-light">
              Quick Search
            </label>
            <input
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ex: AAPL"
            />
            <button className="bg-success rounded-4 p-2 m-1">Search</button>
          </form>
          <div className="card p-3">
            <h4 className="text-center text-success">Search Results</h4>
            <table className="table text-small">
              <thead>
                <tr>
                  <th scope="col">Ticker</th>
                  <th scope="col">-name here-</th>
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
      <div className="card p-3 col-10">
        <div className="w-25 d-flex align-items-end">
          <h4 className="text-light">Trade Tracker</h4>
          <Link to={"/create"}>
            <button className="bg-success rounded-4 p-2 m-1">Insert</button>
          </Link>
        </div>
        <div className="row">
          <table className="table table-striped table-bordered table-hover rounded">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Buy-Sell</th>
                <th scope="col">Stock</th>
                <th scope="col"># Shares</th>
                <th scope="col">Purchase Price</th>
                <th scope="col">Sell Price</th>
                <th scope="col">Total Cost</th>
                <th scope="col">Stop Loss</th>
                <th scope="col">Max Risk</th>
                {/* <th scope="col">Current Price</th> */}
                <th scope="col">P/L</th>
                <th scope="col">ROI</th>
              </tr>
            </thead>
            <tbody>
              {records.map((records) => {
                return (
                  <tr key={records._id}>
                    <th scope="row">{records.date}</th>
                    <td>{records.b_s}</td>
                    <td>{records.ticker}</td>
                    <td>{records.numShares}</td>
                    <td>${records.purchasePrice}</td>
                    <td>${records.sellPrice}</td>
                    <td>${records.purchasePrice * records.numShares}</td>
                    <td>${records.stopLoss}</td>
                    <td>
                      $
                      {(records.purchasePrice - records.stopLoss) *
                        records.numShares}
                    </td>
                    {/* <td>-autofill-</td> */}
                    <td className="text-success">
                      $
                      {(records.sellPrice - records.purchasePrice) *
                        records.numShares}
                    </td>
                    <td>
                      {/* {Math.floor(
                      (records.sellPrice - records.purchasePrice) *
                        records.numShares
                    ) / records.totalCost} */}
                      - %
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* {JSON.stringify(records)} */}
    </div>
  );
};

export default Dashboard;
