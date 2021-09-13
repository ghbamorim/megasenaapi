import Grid from "@material-ui/core/Grid";
import React from "react";
import "./App.css";

const Row = () => {
  const cols: number[] = [1, 2, 3];
  /*for (let i = 1; i <= 10; i++) {
    cols.push(i);
  }*/

  return (
    <React.Fragment>
      {cols.map((i) => {
        return (
          <Grid item xs={1}>
            <div className="App">
              <p>| {i} |</p>
            </div>
          </Grid>
        );
      })}
    </React.Fragment>
  );
};

export default Row;
