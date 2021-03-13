import React from 'react'
// import Saved from './Saved'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SaveShortNote = (props) => {

  return (
    <div>
      {/* <Saved /> */}
      <TextField
        style={{ background: "white", borderRadius: "5px", width:"10%" }}
        id="username"
        label="User"
        defaultValue={props.currentUser}
        InputLabelProps={{
          shrink: true,
        }}
      />
      &nbsp;
      <TextField
        style={{ background: "white", borderRadius: "5px", width:"20%" }}
        id="datetime"
        label="Date"
        defaultValue={new Date()}
        InputProps={{
          readOnly: true,
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      &nbsp;
      <TextField
        style={{ background: "white", borderRadius: "5px", width:"30%" }}
        id="shortnote"
        label="Note"
        placeholder={"Location 1"}
        InputLabelProps={{
          shrink: true,
        }}
      />
      &nbsp;
      <Button variant="contained" color="secondary" size="large">
        Save Current Location
      </Button>
      <br/>
    </div>
  )
}

export default SaveShortNote;
