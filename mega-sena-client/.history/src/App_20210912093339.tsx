import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import "./App.css";
import Row from "./row";

const useStyles = makeStyles((theme) => ({
  App: {
    textAlign: "center",
  },

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

  return (
    <div className="App">
      <header className="App-header">
        <div className={classes.root}>
          <Grid container spacing={1}>
            <Row />
          </Grid>
        </div>
      </header>
    </div>
  );
}

export default App;
