import React from 'react'
import './Home.css';


function Home() {
    return (
        <div className='container-home fill-home'>

            <div className='pics-flex'>
                <img src="/kids1.png" />
                <img src="/kids2.png" />
                <img src="/kids3.png" />
                <p>For kids!</p>
            </div>
            <h1 className='h1-home'>My week planner</h1>
            <h3 className='h3-home'>This is my name:</h3>
            <div className='container-name'></div>
            <div className='bnt-flex'>
                <img src="/add.png" alt='pic-home'/>
                <img src="/recycle-bin.png" alt='pic-home'/>
                <img src="/settings.png" alt='pic-home'/>
            </div>

        </div >
    )
}

export default Home