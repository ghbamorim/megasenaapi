import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import "./App.css";
import Row from "./row";

const useStyles = makeStyles((theme) => ({
  App: {
    textAlign: "center",
  },

  AppHeader: {
    backgroundColor: "#FDFDD7",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "#DF977E",
  },
}));

function App() {
  const classes = useStyles();
  const rows: number[] = [];
  for (let i = 1; i <= 6; i++) {
    rows.push(i);
  }

  return (
    <div className={classes.App}>
      <header className={classes.AppHeader}>
        <div>
          {rows.map((i) => {
            return (
              <Grid container spacing={1}>
                <Row startNumber={i} endNumber={i + 9} />
              </Grid>
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
