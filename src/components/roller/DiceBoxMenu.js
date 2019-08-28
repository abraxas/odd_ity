import {RollManager, RollModes, useRollContext} from "../../context/RollContext";
import React from "react";
import {useForm} from "react-hooks-useform";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {DieModal} from "./DieModal";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CasinoIcon from '@material-ui/icons/Casino';
import AddIcon from '@material-ui/icons/Add';
import SortIcon from '@material-ui/icons/Sort';
import ClearIcon from '@material-ui/icons/Clear';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export function DiceBoxMenu(props) {
  const [{dice, mode}, dispatch] = useRollContext();
  const rollManager = new RollManager(dispatch);
  const [modalOpen, setModalOpen] = React.useState(false);

  const [fields, form] = useForm({
    fields: [
      {name: 'strength', label: 'Strength', value: 0},
      {name: 'agility', label: 'Agility', value: 0},
      {name: 'magic', label: 'Magic', value: 0},
      {name: 'heroic', label: 'Heroic', value: 0},
    ]
  });

  const clearClicked = rollManager.clearDice.bind(rollManager);

  const rollClicked = () => {
    const dice = {
      strength: fields.strength.value,
      agility: fields.agility.value,
      magic: fields.magic.value,
      heroic: fields.heroic.value,
    };

    rollManager.rollDice(dice);
  }
  const onSortClicked = rollManager.sort.bind(rollManager);

  const addDieClicked = () => {
    setModalOpen(true);
  };
  const onModalClose = () => {
    setModalOpen(false);
  };

  const onModalSubmit = (die) => {
    rollManager.addDice([{type: die.type.value, value: die.value.value, selected: 'false'}]);
  };

  const mergeModeClicked = () => {
    if(mode===RollModes.MERGE) {
      rollManager.setMode(RollModes.NORMAL);
    } else {
      rollManager.setMode(RollModes.MERGE);
    }
  }

  const classes = useStyles();

  return <Container>
    <form.Form>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField {...fields.strength} margin="normal"/>
        </Grid>
        <Grid item xs={3}>
          <TextField {...fields.agility} margin="normal"/>
        </Grid>
        <Grid item xs={3}>
          <TextField {...fields.magic} margin="normal"/>
        </Grid>
        <Grid item xs={3}>
          <TextField {...fields.heroic} margin="normal"/>
        </Grid>
      </Grid>

      <DieModal open={modalOpen} onSubmit={onModalSubmit} onClose={onModalClose}/>

      <Button variant="contained" color="primary" onClick={rollClicked} className={classes.button}>
        <CasinoIcon />
        Roll
      </Button>
      <Button variant="contained" onClick={addDieClicked} className={classes.button}>
        <AddIcon />
        Add Die
      </Button>
      {!!dice.length &&
      <Box display="inline">
        <Button variant="contained" color="secondary" onClick={clearClicked} className={classes.button}>
          <ClearIcon />
          Clear
        </Button>
        <Button variant="contained" onClick={onSortClicked} className={classes.button}>
          <SortIcon />
          Sort
        </Button>
      </Box>}
      {dice.length > 1 &&
      <FormControlLabel
        control={
          <Switch checked={mode===RollModes.MERGE} onChange={mergeModeClicked} value="createHeroic" />
        }
        label="Create Heroic"
      />}

    </form.Form>
  </Container>
}