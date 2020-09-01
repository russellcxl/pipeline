import React from 'react';

export default function UserProfile(props) {

  console.log(props.user);

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