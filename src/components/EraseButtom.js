import { useDrop } from 'react-dnd';
import { useContext } from 'react';
import { ModalEraseContext } from './App'


function EraseButtom() {

    const { setModalEraseOpen } = useContext(ModalEraseContext)


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
       // if (eraseItem.id !== undefined && eraseItem.type === 'event')
        {
            console.log('Even', eraseItem)
            eraseItem.setBoard([])
        }
    };
    /////----------------------------------



    return (
        <>

            <div ref={dropErase} onClick={(eraseItem) => setModalEraseOpen(eraseItem)} >
                <button >
                    <img src='https://cdn-icons-png.flaticon.com/512/3976/3976956.png' />
                </button>
            </div>


        </>
    )
}

export default EraseButtom

