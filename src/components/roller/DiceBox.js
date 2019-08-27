import {useRollContext} from "../../context/RollContext";
import Container from "@material-ui/core/Container";
import {DiceBoxMenu} from "./DiceBoxMenu";
import {Die} from "./Die";
import React from "react";
import {DiceMerger} from "./DiceMerger";

export function DiceBox(props) {
  const [{dice}] = useRollContext();

  const dieKey = (index, die) => {
    return `${index}:${die.type}:${die.value}`;
  }

  return <Container>
    <DiceBoxMenu/>
    {dice.map((die, i) => <Die key={dieKey(i, die)} index={i}/>)}
    <DiceMerger />
  </Container>
}