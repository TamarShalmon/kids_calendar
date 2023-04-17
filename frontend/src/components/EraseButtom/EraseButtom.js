import { useDrop } from 'react-dnd';
import React, { useContext } from 'react';
import { BoardContext } from "../../context/BoardContext";


function EraseButtom() {

    const { modalEraseToggle, deleteEvent, deleteWeather } = useContext(BoardContext);


    ///// Drag and drop Erase------------
    const [{ isOverErase }, dropErase] = useDrop(() => ({
        accept: "button",
        drop: (eraseItem) => {
            console.log('item', { eraseItem })
            if (eraseItem.id !== undefined && eraseItem.type === 'event') {
                deleteEvent(eraseItem.day, eraseItem.id, eraseItem.image);
            } else if (eraseItem.id !== undefined && eraseItem.type === 'weather') {
                console.log("ikiki")
                deleteWeather(eraseItem.day);
            }
        },
        collect: (monitor) => ({
            isOverErase: !!monitor.isOver(),
        }),
    }));

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

