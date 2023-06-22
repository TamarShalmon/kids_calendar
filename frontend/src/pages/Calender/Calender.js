import React, { useState, createContext, useContext } from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Header from './layers/Header/Header'
import Week from './layers/Week/Week';
import weatherIcon from '../../assets/data/weatherIcon';
import days from '../../assets/data/days';
import Events from './layers/Events/Events';
import events from '../../assets/data/events';

function Calender() {

  return (
    <DndProvider backend={HTML5Backend}>

      <div className='container' >
        <Header weatherIcon={weatherIcon} days={days} />
        <Week days={days} events={events} />
        <Events className="event-show" events={events} />
        <h3 className="print-footer">Website: kids-calender.onrender.com</h3>
      </div>

    </DndProvider>
  )
}

export default Calender