import * as React from "react";
import {useReducer, useContext} from "react";
import times from "lodash/times";
import sortBy from "lodash/sortBy";
import isEqual from "lodash/isEqual";
import cloneDeep from "lodash/cloneDeep";
import uuidv1 from "uuid/v1";

export const RollContext = React.createContext();

function roll() {
  return Math.floor(Math.random() *  (5)) + 1;
}

function rollReducer(state, action) {
  function rollDie(type) {
    return {
      type,
      value: roll(),
      selected: false,
      id: uuidv1(),
    }
  }

  const {index} = action;
  let newState;

  switch(action.type){
    case 'ROLL_DICE':
      const newDice = [];
      Object.keys(action.dice).forEach((type) => {
        const count = action.dice[type];
        times(count, () => {
          newDice.push(rollDie(type));
        });
      });
      return {...state, dice: [...state.dice, ...newDice]};
    case 'ADD_DICE':
      return {...state, dice: [...state.dice, ...action.dice]};
    case 'CLEAR':
      return {...state, dice: []};
    case 'ROLL_NEW_DICE':
      return rollReducer(rollReducer(state, {type: 'CLEAR'}), {...action, type: 'ROLL_DICE'});
    case 'EDIT_DIE':
      newState = cloneDeep(state);
      const {die} = action;
      newState.dice[index] = die;
      return newState;
    case 'SELECT_DIE':
      newState = cloneDeep(state);
      const {set} = action;
      newState.dice[index].selected = (set !== undefined) ? set : !newState.dice[index].selected;
      return newState;
    case 'SET_MODE':
      return {...state, mode: action.mode };
    case 'SORT':
      const typeOrder = {
        "strength": 1,
        "agility": 2,
        "magic": 3,
        "heroic": 4,
      };

      const sorted = sortBy(state.dice, [(x) => typeOrder[x.type], 'value']);
      if(!isEqual(state.dice, sorted)) return {...state, dice: sorted};

      // Since we're already sorted by type, let's sort by number instead

      return {...state, dice: sortBy(state.dice, ['value', (x) => typeOrder[x.type]])};
    default:
      return state;
  }
}

export const RollModes = {
  NORMAL: 0,
  MERGE: 1,
};

export const RollProvider = ({children}) => (
  <RollContext.Provider value={useReducer(rollReducer, {
    dice: [],
    mode: RollModes.NORMAL,
  })}>
    {children}
  </RollContext.Provider>
);

export const useRollContext = () => useContext(RollContext);

export class RollManager {

  constructor(dispatcher) {
    this.dispatch = dispatcher;
  }

  rollDice(dice) { this.dispatch({type: 'ROLL_DICE', dice}); }
  addDice(dice) {
    dice.forEach(die => {
      die.id = uuidv1();
    });
    this.dispatch({type: 'ADD_DICE', dice});
  }
  clearDice() { this.dispatch({type: 'CLEAR'}); }

  setMode(mode) { this.dispatch({type: 'SET_MODE', mode,}); }

  updateDie(index, die) {
    this.dispatch({type: 'EDIT_DIE', index, die });
  }
  selectDie(index, set) {
    this.dispatch({type: 'SELECT_DIE', index, set });
  }

  sort() { this.dispatch({type: 'SORT'}); }
  clickShouldSelect(mode) {
    return [RollModes.MERGE].indexOf(mode) >= 0 }


}