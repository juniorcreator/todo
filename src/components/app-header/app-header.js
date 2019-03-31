import React from 'react';
import './app-header.css';

const AppHeader = ({toDo, done,important}) => {
  return (
    <div className="app-header d-flex">
      <h1>Todo</h1>
      <h2>{toDo} need to do <br/> {done} done <br/> {important} important</h2>
    </div>
  );
};

export default AppHeader;
