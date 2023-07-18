import React from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";

import Header from './layers/Header/Header'
import Week from './layers/Week/Week';
import weatherIcon from '../../assets/data/weatherIcon';
import days from '../../assets/data/days';
import Events from './layers/Events/Events';
import events from '../../assets/data/events';

function Calender() {
  const dndBackend = isMobile ? TouchBackend : HTML5Backend;


  return (
    <DndProvider backend={dndBackend}>

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