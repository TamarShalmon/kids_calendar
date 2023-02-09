import { useState, createContext, useContext } from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Header from './Header';
import Week from './Week';
import weatherIcon from '../weatherIcon';
import days from '../days';
import Events from './Events';
import events from '../events';



function Calender() {

  
  return (
        <DndProvider backend={HTML5Backend}>

          <div className='container' >
            <Header weatherIcon={weatherIcon} days={days} />
            <Week days={days} events={events} />
            <Events className="event-show" events={events} />
          </div>

        </DndProvider>
  )
}

export default Calender