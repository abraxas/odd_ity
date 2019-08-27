import React from "react";
import {DieModal} from "./DieModal";
import Box from "@material-ui/core/Box";
import {RollManager, useRollContext} from "../../context/RollContext";

export function Die(props) {
  const {index} = props;

  const [{dice}, dispatch] = useRollContext();
  const rollManager = new RollManager(dispatch);

  const [modalOpen, setModalOpen] = React.useState(false);
  const roll = dice[index];

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


  const onClick = () => {
    setModalOpen(true);
  };
  const onModalClose = () => {
    setModalOpen(false);
  };

  const onModalSubmit = (die) => {
    rollManager.updateDie(index, {type: die.type.value, value: die.value.value});
    // dispatch({type: 'EDIT_DIE', index, die: {type: die.type.value, value: die.value.value}});
  };

  return <Box display="inline">
    <DieModal open={modalOpen} die={dice[index]} onSubmit={onModalSubmit} onClose={onModalClose} isUpdate={true}/>
    <div onClick={onClick} style={style}>
      {roll.value}
    </div>
  </Box>;
}