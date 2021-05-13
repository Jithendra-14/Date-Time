import React, { Component } from "react";
import Moment from "moment";
import cx from "classnames";
import range from "lodash/range";
import chunk from "lodash/chunk";
import ChevronLeftOutlinedIcon from "@material-ui/icons/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@material-ui/icons/ChevronRightOutlined";

const Day = ({ i, w, d, className, ...props }) => {
  const prevMonth = w === 0 && i > 7;
  const nextMonth = w >= 4 && i <= 14;
  const cls = cx({
    "prev-month": prevMonth,
    "next-month": nextMonth,
    "current-day": !prevMonth && !nextMonth && i === d,
  });

  return (
    <td className={cls} {...props}>
      {i}
    </td>
  );
};

export default class Calendar extends Component {
  selectDate = (i, w) => {
    const prevMonth = w === 0 && i > 7;
    const nextMonth = w >= 4 && i <= 14;
    const m = this.props.moment;

    if (prevMonth) m.subtract(1, "month");
    if (nextMonth) m.add(1, "month");

    m.date(i);
    const today = Moment();
    today.isBefore(m, "date")
      ? this.props.onChange(m)
      : this.props.onChange(today);
  };

  prevMonth = (e) => {
    e.preventDefault();
    const m = this.props.moment;
    const today = Moment();
    if (today.isBefore(m, "date")) {
      today.diff(m, "month", true) > -1
        ? this.props.onChange(today)
        : this.props.onChange(m.subtract(1, "month"));
    }
  };

  nextMonth = (e) => {
    e.preventDefault();
    this.props.onChange(this.props.moment.add(1, "month"));
  };

  render() {
    const m = this.props.moment;
    const d = m.date();
    const d1 = m.clone().subtract(1, "month").endOf("month").date();
    const d2 = m.clone().date(1).day();
    const d3 = m.clone().endOf("month").date();
    const days = [].concat(
      range(d1 - d2 + 1, d1 + 1),
      range(1, d3 + 1),
      range(1, 42 - d3 - d2 + 1)
    );
    const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div className={cx("m-calendar", this.props.className)}>
        <div className="toolbar">
          <button type="button" className="prev-month" onClick={this.prevMonth}>
            <ChevronLeftOutlinedIcon />
          </button>
          <span className="current-date">{m.format("MMMM YYYY")}</span>
          <button type="button" className="next-month" onClick={this.nextMonth}>
            <ChevronRightOutlinedIcon />
          </button>
        </div>

        <table>
          <thead>
            <tr>
              {weeks.map((w, i) => (
                <td key={i}>{w}</td>
              ))}
            </tr>
          </thead>

          <tbody>
            {chunk(days, 7).map((row, w) => (
              <tr key={w}>
                {row.map((i) => (
                  <Day
                    key={i}
                    i={i}
                    d={d}
                    w={w}
                    onClick={() => this.selectDate(i, w)}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
