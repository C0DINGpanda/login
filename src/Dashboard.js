import React, { useState, useEffect } from 'react';
import { getUser, removeUserSession, getToken } from './Utils/Common';
import axios from 'axios';

function Dashboard(props) {
  const user = getUser();
  const token = getToken();

  ///basic
  const [BasicUser, setBasicUser] = useState('');

  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }

  useEffect(() => {
    const token = getToken();
    getBasicDetails()
    if (!token) {
      return;
    }
    const userID = getUser();
  }, []);

  const getBasicDetails = () => {

    axios.get('https://gattimela-api.azurewebsites.net/api/BasicDetails',{ headers: {"Authorization" : `Bearer ${token}`} } ).then(response => {
      setBasicUser(response.data[0].name);
    }).catch(error => {
      throw ""
    });
  }


  return (
    <div>
      Welcome {user}!: basic user=== {BasicUser}<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

export default Dashboard;
