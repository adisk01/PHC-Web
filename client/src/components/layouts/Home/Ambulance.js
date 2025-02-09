import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import './Ambulance.css';

const firebaseConfig = {
  apiKey: "AIzaSyB-VUgp_g0k6Vo1WAgpJfF_tz74HL0J9QI",
  authDomain: "gps-data-demo.firebaseapp.com",
  databaseURL: "https://gps-data-demo-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gps-data-demo",
  storageBucket: "gps-data-demo.appspot.com",
  messagingSenderId: "778424700278",
  appId: "1:778424700278:web:ac8c0537f5b41863b97e57"
  // Your Firebase config goes here
};

firebase.initializeApp(firebaseConfig);

const useFirebaseLocation = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const databaseRef = firebase.database().ref();
    const locationRef = databaseRef.child('UsersData/rPyQOFDu9zVLGdWiA7tJZ7cs6wX2/readings');

    locationRef.once('value', snapshot => {
      const locationsData = snapshot.val();
      const locationsArray = Object.entries(locationsData).map(([timestamp, location]) => ({
        latitude: location.latitude,
        longitude: location.longitude,
      }));
      setLocations(locationsArray);
    });
  }, []);

  return locations;
};

const Ambulance = () => {
  const t = new Date();
  const locations = useFirebaseLocation();
  const lastLocation = locations.length > 0 ? locations[locations.length - 1] : null;
  const lati = lastLocation?.latitude;
  const longi = lastLocation?.longitude;
  const url = "http://maps.google.com/maps?&z=15&mrt=yp&t=k&q="+lati+"+"+longi;

  return (
    <div className="Container">
      {lastLocation ? (
        <p style={{fontSize:"32px" ,fontWeight:"900"}}>Last location: Latitude: {lastLocation.latitude}, Longitude: {lastLocation.longitude}</p>
      ) : (
        <p>Loading please wait...</p>
      )}
      <p>{t.toString()}</p>
      <a className="link" href={url}>
        <i className="icon fas fa-map-marker-alt"></i>Locate Here
      </a>
    </div>
  );
};

export default Ambulance;
