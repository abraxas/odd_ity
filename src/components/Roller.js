import React from 'react';
import Container from "@material-ui/core/Container";
import {RollProvider, useRollContext} from "../context/RollContext";
import Button from "@material-ui/core/Button";

function RollMenu(props) {
  return <Container>
    ROLLMENU
  </Container>
}

function DiceBoxMenu(props) {
  const [_, dispatch] = useRollContext();

  function roll(type) {
    console.log('CLIK');

    dispatch({
      type: 'ROLL_NEW_DICE',
      dice: {
        strength: 4,
        agility: 2,
        magic: 1,
      }
    })

    //dispatch({dieType: type, type: 'ROLL_DIE'});
  }

  return <Container>
    <Button onClick={() => roll('heroic')}>Roll</Button>
    Diceboxmenu
  </Container>
}

function DiceBox(props) {
  const [rolls, _] = useRollContext();
  console.log('rollin');
  console.dir(rolls);

  return <Container>
    <DiceBoxMenu />
    {rolls.map((roll, i) => <div key={i}>
      {roll.type}:{roll.value},
    </div>)}
  </Container>
}

export default function Roller() {
  return <RollProvider>
    <RollMenu />
    <DiceBox />
  </RollProvider>
}