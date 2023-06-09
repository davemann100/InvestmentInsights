import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const Create = (props) => {
  //state variables for each form input
  const [date, setDate] = useState("");
  const [b_s, setB_s] = useState("");
  const [ticker, setTicker] = useState("");
  const [numShares, setNumShares] = useState(0);
  const [purchasePrice, setPurchasePrice] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [stopLoss, setStopLoss] = useState(0);

  const navigate = useNavigate();

  const formHandler = (e) => {
    e.preventDefault();
    console.log("form submit");
    //create obj from form data to mimic server model
    const tempObjToSendServer = {
      date: date,
      b_s: b_s,
      ticker: ticker,
      numShares: numShares,
      purchasePrice: purchasePrice,
      sellPrice: sellPrice,
      stopLoss: stopLoss,
    };
    //post to sever
    axios
      .post("http://localhost:8000/api/records", tempObjToSendServer)
      .then((serverResponse) => {
        console.log("Server Response:", serverResponse);
        navigate("/dashboard");
      })
      .catch((errorObj) => {
        console.log("ERROR", errorObj);
      });
  };

  return (
    <div>
      <p className="text-warning">create.jsx</p>
      <h1>Trade Tracker</h1>
      {/* Scrolling tickers */}
      <marquee>
        <div>
          <p className="bg-danger text-dark w-50 text-center border border-success">
            TSLA=$172.32 META=$172.32 NVDA=$172.32
          </p>
        </div>
      </marquee>
      {/* Record Form */}
      <div className="container">
        <div className="card rounded-5 p-2">
          <div className="text-center">New Record</div>
          <form onSubmit={formHandler} className="w-75 mx-auto">
            <div className="form-group d-flex justify-content-between">
              <div className="d-flex">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  className="form-control form-control-sm"
                  name="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>
              <div className="d-flex">
                <label htmlFor="b-s">Buy/Sell</label>
                <select
                  className="form-select"
                  name="b-s"
                  onChange={(e) => {
                    setB_s(e.target.value);
                  }}
                >
                  <option defaultValue="Buy">Buy</option>
                  <option value="Sell">Sell</option>
                </select>
              </div>
            </div>
            <div className="form-group d-flex justify-content-between">
              <div className="d-flex">
                <label htmlFor="ticker">Ticker</label>
                <input
                  className="form-control"
                  name="ticker"
                  placeholder="Ex: NVDA"
                  value={ticker}
                  onChange={(e) => {
                    setTicker(e.target.value);
                  }}
                />
              </div>
              <div className="d-flex">
                <label htmlFor="numShares">Number of Shares</label>
                <input
                  type="number"
                  className="form-control"
                  name="numShares"
                  value={numShares}
                  onChange={(e) => {
                    setNumShares(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group d-flex justify-content-between">
              <div className="d-flex">
                <label htmlFor="purchasePrice">Purchase Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="purchasePrice"
                  value={purchasePrice}
                  onChange={(e) => {
                    setPurchasePrice(e.target.value);
                  }}
                />
              </div>
              <div className="d-flex">
                <label htmlFor="stopLoss">Stop Loss</label>
                <input
                  type="number"
                  className="form-control"
                  name="stopLoss"
                  value={stopLoss}
                  onChange={(e) => {
                    setStopLoss(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="form-group d-flex justify-content-between">
              <div className="d-flex">
                <label htmlFor="sellPrice">Sell Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="sellPrice"
                  value={sellPrice}
                  onChange={(e) => {
                    setSellPrice(e.target.value);
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-2 p-2 text-success"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <hr></hr>
      <Link to={"/dashboard"}>
        <button className="bg-danger rounded-4 p-2">Home</button>
      </Link>
    </div>
  );
};

export default Create;
