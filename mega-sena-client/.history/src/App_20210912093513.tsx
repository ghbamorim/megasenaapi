import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import "./App.css";
import Row from "./row";

const useStyles = makeStyles((theme) => ({
  App: {
    textAlign: "center",
  },

  AppHeader : {
    backgroundColor: "#282c34",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white",
  }
  
  

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
    <div className={classes.App}>
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
