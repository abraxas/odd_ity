import * as React from "react";
import {useReducer, useContext} from "react";
import times from "lodash/times";
import sortBy from "lodash/sortBy";
import isEqual from "lodash/isEqual";

export const RollContext = React.createContext();

function roll() {
  return Math.floor(Math.random() *  (5)) + 1;
}

function rollReducer(state, action) {
  function rollDie(type) {
    return {
      type,
      value: roll(),
    }
  }

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
      const {index, die} = action;
      state.dice[index] = die;
      return state;
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
  addDice(dice) { this.dispatch({type: 'ADD_DICE', dice}); }
  clearDice() { this.dispatch({type: 'CLEAR'}); }
  updateDie(index, die) {
    this.dispatch({type: 'EDIT_DIE', index, die });
  }

  sort() { this.dispatch({type: 'SORT'}); }
  clickShouldSelect(mode) { return [RollModes.MERGE].indexOf(mode) > 0 }


}