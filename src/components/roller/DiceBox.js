import {useRollContext} from "../../context/RollContext";
import Container from "@material-ui/core/Container";
import {DiceBoxMenu} from "./DiceBoxMenu";
import {RolledDie} from "./Die";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
  diceContainer: {
    minHeight: '50px',
    margin: theme.spacing(3),
  }
}));

export function DiceBox(props) {
  const [{dice}] = useRollContext();
  const classes = useStyles();

  return <Container>
    <DiceBoxMenu/>
    <Container className={classes.diceContainer}>
      {dice.map((die, i) => <RolledDie die={die} key={die.id} />)}
    </Container>
  </Container>
}