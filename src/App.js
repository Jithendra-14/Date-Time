import "./App.css";
import "./Input-Format/css/input-moment.css";
import React, { useState } from "react";
import moment from "moment";
import InputMoment from "./Input-Format/input-moment";

const App = () => {
  const [m, setM] = useState(moment());
  const handleChange = (m) => {
    setM(moment(m));
  };

  const handleSave = () => {
    console.log("saved", m.format("llll"));
  };

  return (
    <div className="app">
      <h1>Date And Time</h1>
      <form className="d-flex flex-column justify-content-around">
        <div className="form-group">
          <input
            type="text"
            className="form-control my-3"
            value={m.format("MMMM Do YYYY, hh:mm a")}
            disabled
            readOnly
          />
        </div>

        <InputMoment
          moment={m}
          onChange={handleChange}
          minStep={5}
          onSave={handleSave}
        />
      </form>
    </div>
  );
};

export default App;
