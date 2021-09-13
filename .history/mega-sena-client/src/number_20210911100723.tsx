import React from "react";
import logo from "./logo.svg";
import "./App.css";

export interface INumberProps {
  number: number;
}

const Number: React.FC<INumberProps> = ({ number }: INumberProps) => {
  return (
    <div className="App">
      <p>| {number} |</p>
    </div>
  );
};

export default Number;
