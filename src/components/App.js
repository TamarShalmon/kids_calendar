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

  const [showEvents, setShowEvents] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>

      <div className='container' >
        <Header weatherIcon={weatherIcon} days={days} />
        <Week days={days} events={events} />

        <button
          onClick={() => setShowEvents(!showEvents)}>
          Toggle Events
        </button>
        <div>
          {showEvents && <Events
            className="event-show"
            events={events}
            style={{ position: 'fixed', bottom: showEvents ? '0' : '-200px', transition: 'bottom 0.5s ease-in-out' }} />}
        </div>
      </div>
    </DndProvider>
  );
}

export default App;