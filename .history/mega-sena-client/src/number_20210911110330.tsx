import React from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";

export interface IRowProps {
  number: number;
}

const Row: React.FC<IRowProps> = ({ number }: IRowProps) => {
  const cols: number[] = [];
  for (let i = 1; i <= 10; i++) {
    cols.push(i);
  }

  return cols.map();
};

export default Row;
