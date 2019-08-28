import {useRollContext} from "../../context/RollContext";
import Container from "@material-ui/core/Container";
import {DiceBoxMenu} from "./DiceBoxMenu";
import {RolledDie} from "./Die";
import React from "react";
import {ActiveSkill} from "./ActiveSkill";
import Paper from "@material-ui/core/Paper";
import {SkillsMenu} from "./SkillsMenu";

export function SkillsBox(props) {
  return <Container>
    <Paper>
      <SkillsMenu />
    </Paper>
  </Container>;
}