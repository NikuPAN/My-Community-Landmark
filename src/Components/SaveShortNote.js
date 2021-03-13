import React, { useState } from 'react'
// import Saved from './Saved'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SaveShortNote = (props) => {

  const [username, setUsername] = useState(props.currentUser);
  const [dateTime, setDateTime] = useState(new Date());
  const [location, setlocation] = useState(props.location);
  const [shortNote, setShortNote] = useState('Location 1');

  // Function handling name state
  const onUpdateName = (e) => {
    setUsername(e.target.value);
  }

  // Time is grabbed automatically so we don't need a handling function.

  // Function handling short note state
  const onUpdateShortNote = (e) => {
    setShortNote(e.target.value);
  }

  // This function is using for uploading new shortnote to the backend.
  const onUploadNewShortNote = async() => {
    let response = await fetch('/add-short-note', {
      method: 'post',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        username: username,
        date: dateTime,
	      location: location,
	      note: shortNote
      })
    });

    let data = await response.json();
    if(data && data.success === true) {
      console.log("New shortNote added successfully!");
    }
  }

  return (
    <div>
      {/* <Saved /> */}
      <TextField
        style={{ background: "white", borderRadius: "5px", width:"10%" }}
        id="username"
        label="User"
        placeholder={username}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => onUpdateName(e)}
      />
      &nbsp;
      <TextField
        style={{ background: "white", borderRadius: "5px", width:"20%" }}
        id="datetime"
        label="Date"
        defaultValue={dateTime}
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
        placeholder={shortNote}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => onUpdateShortNote(e)}
      />
      &nbsp;
      <Button 
        variant="contained" 
        color="secondary" 
        size="large"
        onClick={() => onUploadNewShortNote()}
      >
        Save Current Location
      </Button>
      <br/>
    </div>
  )
}

export default SaveShortNote;
