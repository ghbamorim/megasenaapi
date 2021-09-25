import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import "./App.css";
import Row from "./row";
import axios from "axios";

const getLast = async () => {
  try {
    const response: any = await axios.get(
      "https://megasenaapi.herokuapp.com/last"
    );
    const result: number[] = [];
    result.push(response.coluna_1);
    result.push(response.coluna_2);
    result.push(response.coluna_3);
    result.push(response.coluna_4);
    result.push(response.coluna_5);
    result.push(response.coluna_6);
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
  getLast();
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
