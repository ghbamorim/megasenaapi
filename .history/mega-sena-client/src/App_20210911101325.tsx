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
  const cols : number[] = [1..10];
  return (
    <div className="App">
      <header className="App-header">
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Number number={1} />
            </Grid>
            <Grid item xs={2}>
              <Number number={1} />
            </Grid>
            <Grid item xs={2}>
              <Number number={1} />
            </Grid>
            <Grid item xs={2}>
              <Number number={1} />
            </Grid>
            <Grid item xs={2}>
              <Number number={1} />
            </Grid>
          </Grid>
        </div>
      </header>
    </div>
  );
}

export default App;