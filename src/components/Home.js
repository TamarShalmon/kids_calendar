import React from 'react'
import './Home.css';


function Home() {
    return (
        <div className='container-home fill-home'>

            <div className='pics-flex'>
                <img src="/kids1.png" />
                <img src="/kids2.png" />
                <img src="/kids3.png" />
                <p>for kids!</p>
            </div>
            <h1>My week planner</h1>
            <h3>this is my name:</h3>
            <div className='container-name'></div>
            <div className='bnt-flex'>
                <img src="/add.png" />
                <img src="/recycle-bin.png" />
                <img src="/settings.png" />
            </div>

        </div >
    )
}

export default Home