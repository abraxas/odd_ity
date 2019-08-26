import * as React from "react";
import {useReducer, useContext} from "react";
import times from "lodash/times";

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
      console.log('rollded');
      const newDice = [];
      console.log('dorollingthem');
      console.dir(action);
      Object.keys(action.dice).forEach((type) => {
        console.log('kiki');
        console.dir(type);
        const count = action.dice[type];
        times(count, () => {
          console.log('oneD' + type);
          newDice.push(rollDie(type));
        });
      });
      return [...state, ...newDice];
    case 'ADD_DICE':
      return {...state, ...action.dice};
    case 'CLEAR':
      return [];
    case 'ROLL_NEW_DICE':
      return rollReducer(rollReducer(state, {type: 'CLEAR'}), {...action, type: 'ROLL_DICE'});
    default:
      return state;
  }
}

export const RollProvider = ({children}) => (
  <RollContext.Provider value={useReducer(rollReducer, [])}>
    {children}
  </RollContext.Provider>
);

export const useRollContext = () => useContext(RollContext);