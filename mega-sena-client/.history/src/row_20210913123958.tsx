import Grid from "@material-ui/core/Grid";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

interface IRowProps {
  selected?: boolean;
  endNumber: number;
}
const useStyles = makeStyles((theme) => ({
  selectedNumber: {
    border: "2px solid black",
  },
}));
const Row: React.FC<IRowProps> = ({ selected, endNumber }: IRowProps) => {
  const cols: number[] = [];
  const classes = useStyles();
  for (let i = 1; i <= 10; i++) {
    cols.push(i + endNumber);
  }

  return (
    <React.Fragment>
      {cols.map((i) => {
        return (
          <Grid item xs={1}>
            <div className={selected ? classes.selectedNumber : undefined}>
              <p>| {i} |</p>
            </div>
          </Grid>
        );
      })}
    </React.Fragment>
  );
};

export default Row;
