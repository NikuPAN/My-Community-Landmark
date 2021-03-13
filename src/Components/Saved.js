import React, { useState, useEffect, useCallback } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

const Saved = () => {

  const [shortNotes, setShortNotes] = useState([
    { id: 1, date: "2021-03-07", username: "User1", location: {lat: 10.11111, lng: -12.11111 }, note: "Location 1" },
    { id: 2, date: "2021-03-07", username: "User2", location: {lat: 9.11111, lng: -10.11111 }, note: "Location 2" },
    { id: 3, date: "2021-03-08", username: "User3", location: {lat: 8.61111, lng: -8.11111 }, note: "Location 3" },
    { id: 4, date: "2021-03-08", username: "User4", location: {lat: 8.11111, lng: -6.11111 }, note: "Location 4" },
    { id: 5, date: "2021-03-08", username: "User5", location: {lat: 7.61111, lng: -4.11111 }, note: "Location 5" }
  ]);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [columnsDefs, setColumnsDefs] = useState([]);

  const getAllNotesFromDB = async() => {
    let response = await fetch('/all-short-notes', {
      method: 'post',
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    });

    let data = await response.json();
    if(data && data.success === true) {
      console.log("From backend");
      return data.data;
    }
    return null;
  }

  const updateAllNotes = useCallback(() => {
    getAllNotesFromDB()
      .then(res =>
        res.map(note => {
            return {
              id: note.id,
              date: note.date,
              user: note.username,
              location: "{" + note.location.lat + ", "+ note.location.lng + "}",
              note: note.note
            };
        })
      )
      .then(infos => setShortNotes(infos));
  }, []);
  
  useEffect(() => {
    updateAllNotes();
  }, [updateAllNotes, shortNotes]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    setColumnsDefs([
      { headerName: "#", field: "id", sortable: true, filter: false, minWidth: 100 },
      { headerName: "Date", field: "date", sortable: true, filter: true, minWidth: 200 },
      { headerName: "Created User", field: "username", sortable: true, filter: true, minWidth: 100 },
      { headerName: "Location (latitude)", field: "location.lat", sortable: true, filter: true, minWidth: 200 },
      { headerName: "Location (longitude)", field: "location.lng", sortable: true, filter: true, minWidth: 200 },
      { headerName: "Note", field: "note", sortable: true, filter: true, minWidth: 700 },
    ]);
  }

  useEffect(() => {

  }, [shortNotes])

  return (
    <div>
      <h3>
        You can sort and search for specific short note by each column. <br/>
        You can also search with combination of multiple filters in multiple columns.
      </h3>
      <div className="ag-theme-alpine-dark" style={{ height: 450, width: '100%' }}>
        <AgGridReact
          onGridReady={onGridReady}
          columnDefs={columnsDefs}
          rowData={shortNotes}>
        </AgGridReact>
      </div>
    </div>
  )
}

export default Saved;
