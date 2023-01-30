import {useContext, createContext, useState} from 'react';
import { ModalEraseContext } from './App'
import Day from './Day';
import './Week.css';
import EraseModal from './EraseModal'

export const BoardsContext = createContext();


function Week({ days }) {

    const currentDay = new Date().getDay() + 1;


    const { modalEraseOpen, setModalEraseOpen } = useContext(ModalEraseContext);
    const [boards, setBoards] = useState({
        sunday:[],
        monday:[],
    });


    const removeAllItem = () => {
         console.log('erase from week')
        setBoards({
            sunday:[],
            monday:[],
        })
    }
    
    return (
        
        <BoardsContext.Provider value={{modalEraseOpen, setModalEraseOpen}}>
        {modalEraseOpen && <EraseModal eraseItem={modalEraseOpen} setModalEraseOpen={setModalEraseOpen} onSubmit={removeAllItem} />}
        
        <div className="week">
            {days.map((day) => (
                <Day
                    key={day.id}
                    title={day.title}
                    style={day.style}
                    currentDay={currentDay === day.id}
                />
            ))}
        </div>
        </BoardsContext.Provider>
        
    );
}

export default Week;



