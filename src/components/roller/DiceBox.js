import {useRollContext} from "../../context/RollContext";
import Container from "@material-ui/core/Container";
import {DiceBoxMenu} from "./DiceBoxMenu";
import {Die, RolledDie} from "./Die";
import React from "react";
import {ActiveSkill} from "./ActiveSkill";

export function DiceBox(props) {
  const [{dice}] = useRollContext();

  return <Container>
    <DiceBoxMenu/>
    {dice.map((die, i) => <RolledDie die={die} key={die.id} />)}
    <ActiveSkill />
  </Container>
}