import React from 'react';
import { Link } from 'react-router-dom';

export default function Directory(props) {

  console.log(props.users)

  return (
    <div>
      <h1>USER DIRECTORY</h1>
      {props.users.map((user, i) => {
        return (
          <Link to={`/users/${user._id}`}>
            <li key={i}>{user.name}</li>
          </Link>
        )
      })}
    </div>
  );
};