import React from 'react';
import styled from 'styled-components';
import './App.css';
import Week from './Week';
import days from '../days';
import Events from './Events';
import events from '../events';

const Title = styled.h2`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;


function App() {

  return (
    <div className="container">
      <Title>Hello user, L'ets plan your week!</Title>
      <Week days={days} />
      <div>
        <h3>Events board</h3>
      <Events events={events} />
      </div>
    </div>
  );
}

export default App;
