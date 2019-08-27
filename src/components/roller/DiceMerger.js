import {useRollContext} from "../../context/RollContext";
import React from "react";
import {useForm} from "react-hooks-useform";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {DieModal} from "./DieModal";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

export function DiceMerger(props) {
  const [{dice}, dispatch] = useRollContext();

  if(!dice.length) return <div></div>;

  return <Container>

  </Container>
}