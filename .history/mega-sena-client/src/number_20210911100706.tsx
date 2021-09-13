import React from "react";
import logo from "./logo.svg";
import "./App.css";

export interface INumberProps {
  number: number;
}

cosnt Number: React.FC<INumberProps> = ({number}: INumberProps) => {
  return (
    <div className="App">
      <p>| 01 |</p>
    </div>
  );
}

export default Number;
