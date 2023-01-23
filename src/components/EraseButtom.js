import { useDrop } from 'react-dnd';
import events from '../events';



function EraseButtom({ events, title, style, id, image, board, setBoard }) {




    ///// Drag and drop Erase------------
    const [{ isOverErase }, dropErase] = useDrop(() => ({
        accept: "button",
        drop: (eraseItem) => EraseFromBoard(eraseItem),
        collect: (monitor) => ({
            isOverErase: !!monitor.isOver(),
        }),
    }));

    const EraseFromBoard = (eraseItem) => {
        console.log('Event Erase ID before', eraseItem)
        if (eraseItem.id && eraseItem.type === 'event') {
            console.log('Event Erase ID after', eraseItem)
            // const index = board.findIndex(event => event.id === eraseItem.id);
            // if (index !== -1) {
            //     board.splice(index, 1);
            // }

           
        }
    };
    /////----------------------------------



    return (
        <>

            <div ref={dropErase} className="">
                <button>
                    <img src='https://cdn-icons-png.flaticon.com/512/3976/3976956.png' />
                </button>
            </div>


        </>
    )
}

export default EraseButtom

