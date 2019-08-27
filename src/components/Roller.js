import React from "react";
import Container from "@material-ui/core/Container";
import {RollProvider} from "../context/RollContext";
import {DiceBox} from "./roller/DiceBox";
import {AssignedDice} from "./roller/AssignedDice";

function RollMenu(props) {
  return <Container>
    <div></div>
  </Container>
}

export default function Roller() {
  return <RollProvider>
    <RollMenu />
    <DiceBox />
    <AssignedDice />
  </RollProvider>
}