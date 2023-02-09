import { useDrop } from 'react-dnd';
import { useContext } from 'react';
import {BoardContext} from "../context/BoardContext";


function EraseButtom() {

    const { modalEraseToggle, deleteEvent } = useContext(BoardContext);


    ///// Drag and drop Erase------------
    const [{ isOverErase }, dropErase] = useDrop(() => ({
        accept: "button",
        drop: (eraseItem) => EraseFromBoard(eraseItem),
        collect: (monitor) => ({
            isOverErase: !!monitor.isOver(),
        }),
    }));

    

    const EraseFromBoard = (eraseItem) => {
        // console.log('Event Erase ID before', eraseItem)
        if (eraseItem.id !== undefined && eraseItem.type === 'event')
        {
            console.log('Even', eraseItem)
            deleteEvent(eraseItem.day, eraseItem.id)
        }
    };
    /////----------------------------------



    return (
        <>

            <div ref={dropErase} onClick={(eraseItem) => modalEraseToggle(eraseItem)} >
                <button>
                    <img src='https://cdn-icons-png.flaticon.com/512/3976/3976956.png' />
                </button>
            </div>


        </>
    )
}

export default EraseButtom

