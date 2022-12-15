import { useState } from 'react';
import styled from 'styled-components';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import './App.css';
import Week from './Week';
import days from '../days';
import Events from './Events';
import events from '../events';


const Title = styled.h2`
  font-size: 1.5em;
  text-align: center;
  color: #557153;
`;


function App() {

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        <Title>Hello user, L'ets plan your week!</Title>
        <Week days={days} events={events} />
        <div>
          <h3>Events board</h3>
          <Events events={events} />
        </div>
      </div>
      </DndProvider>
  );
}

export default App;
