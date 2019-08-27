import {useForm} from "react-hooks-useform";
import {Modal} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React from "react";
import MenuItem from "@material-ui/core/MenuItem";

export function DieModal(props) {
  const {open, onSubmit, onClose, isUpdate, die} = props;

  const style = {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    position: 'absolute',
    width: 400,
  };

  const [fields, form] = useForm({
    fields: [
      { name: 'type', label: 'Type', value: die ? die.type : 'strength' },
      { name: 'value', label: 'Value', value: die ? die.value : 1 },
    ]
  });
  
  const onAddClick = () => {
    onClose();
    onSubmit(fields);
  };

  return <Modal
    open={open}
    onClose={onClose}
  ><Card style={style}>
    <CardHeader title={isUpdate ? "Edit Die" : "Add Die"} subheader={"..."}/>
    <CardContent>
      <form.Form>
        <div>
          <TextField select {...fields.type} >
            <MenuItem value="strength">Strength</MenuItem>
            <MenuItem value="agility">Agility</MenuItem>
            <MenuItem value="magic">Magic</MenuItem>
            <MenuItem value="heroic">Heroic</MenuItem>
          </TextField>
        </div>
        <div>
          <TextField select {...fields.value} >
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="6">6</MenuItem>
          </TextField>
        </div>
        <Button variant="contained" onClick={onAddClick}>{isUpdate ? 'Update' : 'Add'}</Button>
      </form.Form>
    </CardContent>
  </Card>
  </Modal>;
}