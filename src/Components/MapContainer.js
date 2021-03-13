import React, { useState, useEffect } from 'react'
import GoogleMap from 'google-map-react';
import axios from 'axios';
import Pusher from 'pusher-js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SaveShortNote from './SaveShortNote';
// import './GoogleMap.css';

const MapContainer = (props) => {

  const [center, setCenter] = useState({ lat: 5.6219868, lng: -0.23223 });
  const [locations, setLocations] = useState({});
  const [usersOnline, setUsersOnline] = useState([]);
  const [currentUser, setCurrentUser] = useState('User');

  const mapStyles = {
    width: '100%',
    height: '650px',
    position: "relative"
  };

  const markerStyle = {
    height: '5%',
    width: '5%',
    marginTop: '0px'
  };

  const imgStyle = {
    height: '100%'
  };

  const Marker = ({ title }) => (
    <div style={markerStyle}>
      <img style={imgStyle} src="https://res.cloudinary.com/og-tech/image/upload/s--OpSJXuvZ--/v1545236805/map-marker_hfipes.png" alt={title} />
      <h6>{title}</h6>
    </div>
  );

  const notify = () => toast(`Users online : ${Object.keys(usersOnline).length}`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    type: 'info'
  });

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(position => {
        let location = { lat: position.coords.latitude, lng: position.coords.longitude };
        // this.setState((prevState, props) => {
        //   let newState = { ...prevState };
        //   newState.center = location;
        //   newState.locations[`${prevState.current_user}`] = location;
        //   return newState;
        // });
        setCenter(location);
        let newLocations = { ...locations };
        newLocations[`${locations.currentUser}`] = location;
        setLocations(newLocations);

        axios.post("http://localhost:3128/update-location", {
          username: currentUser,
          location: location
        }).then(res => {
          if (res.status === 200) {
            console.log("new location updated successfully");
          }
        });
      })
   } else {
      alert("Sorry, geolocation is not available on your device. You need that to use this app");
    }
  }

  useEffect(() => {
      let pusher = new Pusher('c5a485ae6a7778db308b', {
        authEndpoint: "http://localhost:3128/pusher/auth",
        cluster: "mt1"
      })
      let presenceChannel = pusher.subscribe('presence-channel');

      presenceChannel.bind('pusher:subscription_succeeded', members => {
        setUsersOnline(members.members);
        setCurrentUser(members.myID);
        getLocation();
        notify();
      })

      presenceChannel.bind('location-update', body => {
        // this.setState((prevState, props) => {
        //   const newState = { ...prevState }
        //   newState.locations[`${body.username}`] = body.location;
        //   return newState;
        // });
        setLocations(body.location);
      });

      presenceChannel.bind('pusher:member_removed', member => {
        // this.setState((prevState, props) => {
        //   const newState = { ...prevState };
        //   // remove member location once they go offline
        //   delete newState.locations[`${member.id}`];
        //   // delete member from the list of online users
        //   delete newState.users_online[`${member.id}`];
        //   return newState;
        // })
        let newLocation = { ...locations };
        // remove member location once they go offline
        delete newLocation[`${member.id}`];
        setLocations(newLocation);

        let newUsersOnline = { ...usersOnline };
        // delete member from the list of online users
        delete newUsersOnline[`${member.id}`];
        setUsersOnline(newUsersOnline);

        notify();
      })

      presenceChannel.bind('pusher:member_added', member => {
        notify();
      })
    }
  )

  let locationMarkers = Object.keys(locations).map((username, id) => {
    return (
      <Marker
        key={id}
        title={`${username === currentUser ? 'My location' : username + "'s location"}`}
        lat={locations[`${username}`].lat}
        lng={locations[`${username}`].lng}
      >
      </Marker>
    );
  });

  return (
    <div>
      <SaveShortNote currentUser={currentUser} location={locations.currentUser}/>
      <GoogleMap
        style={mapStyles}
        bootstrapURLKeys={{ key: 'AIzaSyDVjzPdNCZx39hunAmxrmMbbbnNTqJbhU4' }}
        center={center}
        zoom={14}
        disableDefaultUI={true}
        streetViewControl={true}
        controlSize={16}
      >
      {locationMarkers}
      </GoogleMap>
    </div>
  )
}

export default MapContainer;

