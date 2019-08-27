import {useRollContext} from "../../context/RollContext";
import Container from "@material-ui/core/Container";
import {DiceBoxMenu} from "./DiceBoxMenu";
import {Die} from "./Die";
import React from "react";
import {AssignDiceMenu} from "./AssignDiceMenu";

export function AssignedDice(props) {
  const [{dice}] = useRollContext();

  return <Container>
    <AssignDiceMenu/>
  </Container>
}