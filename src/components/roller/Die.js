import React from "react";
import {DieModal} from "./DieModal";
import Box from "@material-ui/core/Box";
import {RollManager, useRollContext} from "../../context/RollContext";

/**
 * RolledDie handles dice in the DiceBox and includes click events for selecting
 */
export function RolledDie(props) {
  const {die} = props;
  const [{mode}, dispatch] = useRollContext();
  const [modalOpen, setModalOpen] = React.useState(false);

  const rollManager = new RollManager(dispatch.bind(dispatch));

  const onModalClose = () => {
    setModalOpen(false);
  };

  const onModalSubmit = (formDie) => {
    rollManager.updateDie(die.id, {id: die.id, type: formDie.type.value, value: formDie.value.value});
  };

  const onClick = () => {
    if(rollManager.clickShouldSelect(mode)) {
      rollManager.selectDie(die.id);
    } else {
      setModalOpen(true);
    }
  };

  return <Box display="inline">
    <DieModal open={modalOpen} die={die} onSubmit={onModalSubmit} onClose={onModalClose} isUpdate={true}/>
    <Die {...props} onClick={onClick} />
  </Box>;
}

export function Die(props) {
  const {die, onClick} = props;

  console.log('ddd');
  console.dir(die);

  const dieColor = ({
    strength: '#d3c200',
    agility: '#d77687',
    magic: 'blue',
    heroic: 'black'
  })[die.type];

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

  return <div onClick={onClick} style={die.selected ? styleSelected : style}>
      {die.value}
    </div>;
}