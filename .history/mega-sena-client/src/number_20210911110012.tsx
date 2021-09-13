import React from "react";
import logo from "./logo.svg";
import "./App.css";

export interface IRowProps {
  number: number;
}

const Row: React.FC<IRowProps> = ({ number }: IRowProps) => {
  return (
    <div className="App">
      <p>| {number} |</p>
    </div>
  );
};

export default Row;
