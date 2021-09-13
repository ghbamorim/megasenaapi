import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Number from "./number";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();
  const cols: number[] = [];
  for (let i = 1; i <= 10; i++) {
    cols.push(i);
  }
  return (
    <div className="App">
      <header className="App-header">
        <div className={classes.root}>
          <Grid container spacing={3}>
            {cols.map((i) => {
              <Grid item xs={1}>
                <Number number={i} />
              </Grid>;
            })}
          </Grid>
        </div>
      </header>
    </div>
  );
}

export default App;
