import Grid from "@material-ui/core/Grid";
import React from "react";
import "./App.css";

const Row = () => {
  const cols: number[] = [1, 2, 3];
  /*for (let i = 1; i <= 10; i++) {
    cols.push(i);
  }*/

  return (
    <div>
      <Grid item xs={1}>
        <div className="App">
          <p>| {10} |</p>
        </div>
      </Grid>
    </div>
  );
};

export default Row;
