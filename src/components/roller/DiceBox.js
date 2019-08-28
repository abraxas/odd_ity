import {useRollContext} from "../../context/RollContext";
import Container from "@material-ui/core/Container";
import {DiceBoxMenu} from "./DiceBoxMenu";
import {Die} from "./Die";
import React from "react";
import {DiceMerger} from "./DiceMerger";

export function DiceBox(props) {
  const [{dice}] = useRollContext();

  return <Container>
    <DiceBoxMenu/>
    {dice.map((die, i) => <Die key={die.id} index={i}/>)}
    <DiceMerger />
  </Container>
}