import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

const url = process.env.REACT_APP_URL;

export default function UserProfile(props) {

  const [user, setUser] = useState({});

  let {id} = useParams();

  // useEffect(() => {
  //   Axios.get(`${url}/api/users/profile/${id}`)
  //     .then(res => {
  //       console.log(res.data.user);
  //     })
  //     .catch(e => console.log(e))
  // }, [props.users])

  return (
    <div>
      <h1>USER PROFILE</h1>
      <div>Name: {props.user.name}</div>
      <div>ID: {props.user._id}</div>
      <div>Email: {props.user.email}</div>
      <div>
        Documents:
        {props.user.documents.map((doc) => {
          return <li>{doc.title}</li>;
        })}
      </div>
    </div>
  );
};