import React from 'react';
import { useParams, Link } from 'react-router-dom';

const url = process.env.REACT_APP_URL;

export default function UserProfile(props) {

  let {id} = useParams();

  return (
    <div>
      <h1>USER PROFILE</h1>
      <div>Name: {props.user.name}</div>
      <div>ID: {props.user._id}</div>
      <div>Email: {props.user.email}</div>
      <div>
        Documents:
        {props.user.documents.map((doc, i) => {
          return (
            <Link to={`/documents/edit/${doc._id}`}>
              <li key={i}>{doc.title}</li>
            </Link>
          );
        })}
      </div>
    </div>
  );
};