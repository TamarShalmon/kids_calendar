import { useDrop } from 'react-dnd';


function EraseButtom() {


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
        if (eraseItem.id !== undefined && eraseItem.type === 'event') {
            console.log('Event Erase ID after', eraseItem)
            eraseItem.removeItem(eraseItem.id)
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

