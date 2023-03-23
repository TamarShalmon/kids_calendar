import React from "react";
import '../../App.css';

function MobileOnly() {
    return (
        <div className="MobileOnly container fill">
            <h1>This website cannot be used on mobile devices or a small screen.</h1>
            {/* <h1>maybe in the future</h1> */}
        </div>
    );
}

// npm install --legacy-peer-deps

export default MobileOnly;