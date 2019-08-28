import React from "react";
import Container from "@material-ui/core/Container";
import {RollProvider} from "../context/RollContext";
import {DiceBox} from "./roller/DiceBox";
import {AssignedDice} from "./roller/AssignedDice";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import {SkillsBox} from "./roller/SkillsBox";

function RollMenu(props) {


  return <Container>
    <Stepper activeStep={0}>
      <Step>
        <StepLabel>Roll Dice</StepLabel>
      </Step>
      <Step>
        <StepLabel>Apply Skills</StepLabel>
      </Step>
      <Step>
        <StepLabel>Assign Dice</StepLabel>
      </Step>
    </Stepper>
  </Container>
}

export default function Roller() {
  return <RollProvider>
    <RollMenu />
    <DiceBox />
    <SkillsBox />
  </RollProvider>
}