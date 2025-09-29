import React from 'react';
import '../App.css';

const Dice = (props) => {
    return (
        <div className="container">
            <button
                className={`dice-button ${props?.dice?.isHeld ? 'dice-held' : ''}`}
                type="button"
                onClick={props.freeze}
            >
                {props?.dice?.value}
            </button>

        </div>
    );
};

export default Dice;