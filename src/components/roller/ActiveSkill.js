import {RollManager, useRollContext} from "../../context/RollContext";
import React from "react";
import {useForm} from "react-hooks-useform";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {DieModal} from "./DieModal";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {Die} from "./Die";

export function ActiveSkill(props) {
  const [{dice, mode, handler}, dispatch] = useRollContext();
  const rollManager = new RollManager(dispatch.bind(dispatch));

  console.log('act');
  if(handler && dice) {
    console.dir({handler, len: dice.length, ex: handler.canExecute(dice)});
  }
  if(!handler || !dice.length || !handler.canExecute(dice)) return <div></div>;

  const diceToCreate = handler.expectedResult(dice);

  console.dir(diceToCreate);

  const onExecuteClicked = () => {
    rollManager.executeSkill();
  }

  return <Container>
    You will be creating:
    {diceToCreate.map(die => <Die die={die} key={die.id} onClick={() => {}}/>)}
    <Button onClick={onExecuteClicked}>Execute</Button>
  </Container>
}