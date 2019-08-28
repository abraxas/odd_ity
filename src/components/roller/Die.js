import React from "react";
import {DieModal} from "./DieModal";
import Box from "@material-ui/core/Box";
import {RollManager, useRollContext} from "../../context/RollContext";

export function Die(props) {
  const {index} = props;

  const [modalOpen, setModalOpen] = React.useState(false);

  const [{dice, mode}, dispatch] = useRollContext();
  const roll = dice[index];
  const rollManager = new RollManager(dispatch.bind(dispatch));


  const dieColor = ({
    strength: '#d3c200',
    agility: '#d77687',
    magic: 'blue',
    heroic: 'black'
  })[roll.type];

  const style = {
    "backgroundColor": dieColor,
    color: "white",
    "borderRadius": "3px",
    "borderColor": dieColor,
    padding: "10px",
    margin: "10px",
    width: 30,
    height: 30,
    "fontSize": '1.6em',
    "textAlign": "center",
    "display": "inline-block",
    lineHeight: "30px",
  };

  const styleSelected = {...style,
    border: "2px solid green",
  };


  const onClick = () => {
    if(rollManager.clickShouldSelect(mode)) {
      rollManager.selectDie(index);
    } else {
      setModalOpen(true);
    }
  };
  const onModalClose = () => {
    setModalOpen(false);
  };

  const onModalSubmit = (die) => {
    rollManager.updateDie(index, {type: die.type.value, value: die.value.value});
  };

  console.dir(roll);

  return <Box display="inline">
    <DieModal open={modalOpen} die={roll} onSubmit={onModalSubmit} onClose={onModalClose} isUpdate={true}/>
    <div onClick={onClick} style={roll.selected ? styleSelected : style}>
      {roll.value}
    </div>
  </Box>;
}