import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    date: "ab",
    temp: 21,
  },
  {
    date: "ab",
    temp: 22,
  },
  {
    date: "ab",
    temp: 21,
  },
  {
    date: "ab",
    temp: 22,
  },
  {
    date: "ab",
    temp: 22,
  },
  {
    date: "ab",
    temp: 21,
  },
  {
    date: "ab",
    temp: 19,
  },
  {
    date: "ab",
    temp: 21,
  },
];

export default class Example extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/xqjtetw0/";

  render() {
    return (
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="temp"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    );
  }
}
