import cx from "classnames";
import React, { useState } from "react";
import moment from "moment";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";

const Time = (props) => {
  const [m, setm] = useState(props.moment);

  const changeSliderHours = (e, newValue) => {
    m.hours(newValue);
    const today = moment();

    setm(today.diff(m, "hours", true) < 0 ? m : today);
    props.onChange(m);
  };

  const changeSliderMinutes = (e, newValue) => {
    m.minutes(newValue);
    const today = moment();

    setm(today.diff(m, "minutes", true) < 0 ? m : today);
    props.onChange(m);
  };

  const changeInputHours = (e) => {
    let val = parseInt(e.target.value);

    isNaN(val) ? m.hours(0) : val <= 23 ? m.hours(val) : m.hours(0);

    const today = moment();

    setm(today.diff(m, "hours", true) < 0 ? m : today);
    setImmediate(() => props.onChange(m));
  };

  const changeInputMinutes = (e) => {
    let val = parseInt(e.target.value);
    const today = moment();

    isNaN(val) ? m.minutes(0) : val <= 59 ? m.minutes(val) : m.minutes(0);

    setm(today.diff(m, "minutes", true) < 0 ? m : today);
    setImmediate(() => props.onChange(m));
  };
  return (
    <div className={cx("m-time", props.className)}>
      <div className="showtime">
        <span className="time">
          <Input
            name="hours"
            style={{ width: "42px" }}
            value={m.hour() === 0 ? "" : m.format("HH")}
            margin="dense"
            onChange={changeInputHours}
            inputProps={{
              type: "text",
              "aria-labelledby": "hours-slider",
            }}
          />
        </span>
        <span className="separater">:</span>
        <span className="time">
          <Input
            name="minutes"
            style={{ width: "42px" }}
            value={m.minutes() === 0 ? "" : m.format("mm")}
            margin="dense"
            onChange={changeInputMinutes}
            inputProps={{
              type: "text",
              "aria-labelledby": "minutes-slider",
            }}
          />
        </span>
      </div>

      <div className="sliders">
        <div className="time-text">Hours:</div>
        <div style={{ width: "250px" }}>
          <Slider
            value={typeof m.hour() !== "number" ? 0 : m.hour()}
            onChange={changeSliderHours}
            aria-labelledby="hours-slider"
            step={1}
            min={0}
            max={23}
          />
        </div>
        <div className="time-text">Minutes:</div>
        <div style={{ width: "250px" }}>
          <Slider
            value={typeof m.minutes() !== "number" ? 0 : m.minutes()}
            onChange={changeSliderMinutes}
            aria-labelledby="minutes-slider"
            step={1}
            min={0}
            max={59}
          />
        </div>
      </div>
    </div>
  );
};

export default Time;
