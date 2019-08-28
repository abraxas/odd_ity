import * as React from "react";
import {useReducer, useContext} from "react";
import times from "lodash/times";
import sortBy from "lodash/sortBy";
import isEqual from "lodash/isEqual";
import cloneDeep from "lodash/cloneDeep";
import minBy from "lodash/minBy";
import filter from "lodash/filter";
import concat from "lodash/concat";
import uuidv1 from "uuid/v1";
import findIndex from "lodash/findIndex";

export const RollContext = React.createContext();

export const RollModes = {
  NORMAL: 0,
  MERGE: 1,
};


function makeDie(type, value) {
  return {
    type,
    value,
    selected: false,
    id: uuidv1(),
  }
}

const mergeHeroicHandler = {
  canSelect: (dice, index) => {
    const selectedDice = filter(dice, x=>x.selected);
    return selectedDice.length < 2;
  },
  expectedResult: (dice) => {
    const selectedDice = filter(dice, x=>x.selected);
    const newDice = [];
    const value = minBy(selectedDice, (x) => x.value).value;
    return [makeDie('heroic', value)];
  },
  canExecute: (dice) => {
    const selectedDice = filter(dice, x=>x.selected);
    return selectedDice.length == 2;
  },
  reducer: (dice) => {
    return concat(filter(dice, x => !x.selected), mergeHeroicHandler.expectedResult(dice));
  },
};

const handlers = {};
handlers[RollModes.MERGE] = mergeHeroicHandler;


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

  const {id} = action;
  const index = id && findIndex(state.dice, x => x.id===id);


  const handler = handlers[state.mode];
  const rollManager = new RollManager()
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
      if(!rollManager.clickShouldSelect(state.mode)) { return state; }

      const selectedDie = newState.dice[index];
      if(selectedDie.selected || handler.canSelect(state.dice, index)) {
        newState.dice[index].selected = (set !== undefined) ? set : !selectedDie.selected;
      }
      return newState;
    case 'SET_MODE':
      newState = cloneDeep(state);
      if(!(new RollManager()).clickShouldSelect(action.mode)) {
        newState.dice.forEach(die => die.selected = false);
      }
      const tentativeHandler = handlers[action.mode];

      return {...newState, mode: action.mode, handler: tentativeHandler };
    case 'EXECUTE_SKILL':
      newState = cloneDeep(state);
      newState.dice = handler.reducer(state.dice);
      return {...newState, mode: action.NORMAL, handler: undefined};
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

export const RollProvider = ({children}) => (
  <RollContext.Provider value={useReducer(rollReducer, {
    dice: [],
    mode: RollModes.NORMAL,
    handler: undefined,
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

  updateDie(id, die) {
    this.dispatch({type: 'EDIT_DIE', id, die });
  }
  selectDie(id, set) {
    this.dispatch({type: 'SELECT_DIE', id, set });
  }

  executeSkill() {
    this.dispatch({type: 'EXECUTE_SKILL'});
  }

  sort() { this.dispatch({type: 'SORT'}); }
  clickShouldSelect(mode) {
    return [RollModes.MERGE].indexOf(mode) >= 0 }


}