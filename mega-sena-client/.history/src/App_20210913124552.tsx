import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import "./App.css";
import Row from "./row";
import axios from "axios";

const getLast = async () => {
  try {
    const response = await axios.get("https://megasenaapi.herokuapp.com/last");
  } catch (error) {
    console.error(error);
  }
};

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
  for (let i = 0; i <= 5; i++) {
    rows.push(i);
  }

  return (
    <div className={classes.App}>
      <header className={classes.AppHeader}>
        <div>
          {rows.map((i) => {
            return (
              <Grid container spacing={1}>
                <Row selected={true} endNumber={i * 10} />
              </Grid>
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
