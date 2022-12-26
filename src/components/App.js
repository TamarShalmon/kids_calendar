import { useState } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import './App.css';
import Header from './Header';
import Week from './Week';
import weatherIcon from '../weatherIcon';
import days from '../days';
import Events from './Events';
import events from '../events';



function App() {

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        <Header weatherIcon={weatherIcon} />
        <Week days={days} events={events} />
        <div>
          <Events events={events} />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
