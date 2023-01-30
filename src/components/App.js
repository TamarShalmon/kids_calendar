
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useState, createContext } from "react";


import './App.css';
import Header from './Header';
import Week from './Week';
import weatherIcon from '../weatherIcon';
import days from '../days';
import Events from './Events';
import events from '../events';
import Home from './Home'


export const ModalEraseContext = createContext();

function App() {
  
  const [modalEraseOpen, setModalEraseOpen] = useState(false);
  



  return (
    //<Home/>
    <ModalEraseContext.Provider value={{modalEraseOpen, setModalEraseOpen}}>
      <DndProvider backend={HTML5Backend}>

        <div className='container' >
          <Header weatherIcon={weatherIcon} days={days} />
          <Week days={days} events={events}  />
          <Events className="event-show" events={events} />
        </div>

      </DndProvider>
    </ModalEraseContext.Provider>

  );
}

export default App;