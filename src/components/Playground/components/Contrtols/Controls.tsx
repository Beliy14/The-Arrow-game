import React from 'react';
import './controls.scss'
import { FAST_SPEED_TIME, MEDIUM_SPEED_TIME, SLOW_SPEED_TIME } from '../../constants';
import { useAppSelector } from '../../../../app/hooks';

interface ControlsProps {
    isTimerActive: boolean,
    setIsTimerActive: React.Dispatch<React.SetStateAction<boolean>>,
    setSpeedTimeout: React.Dispatch<React.SetStateAction<number>>,
    speedTimeout: number,

}

const Controls: React.FC<ControlsProps> = ({isTimerActive, setIsTimerActive, speedTimeout, setSpeedTimeout}) => {

    const { steps } = useAppSelector((state) => state.playground)

    const activeSpeedButton = (element: number): string => {
        if (element === speedTimeout) {
            return 'btn-speed active'
        }
        return 'btn-speed'
    }
    
    return (
        <div className='controls-body'>
            <h4>←↑↓→ The Arrow-game</h4>
            <p>Player's goal is to press the keyboard arrow key that was shown to him before the next one appears.</p>
            <p>After three consecutive successful hits - game won, after three errors - lost.</p>

            <div>
                <button className='btn-switching' disabled={isTimerActive} onClick={() => setIsTimerActive(true)}>Srart</button>
                <button className='btn-switching' disabled={!isTimerActive} onClick={() => setIsTimerActive(false)}>Stop</button>
            </div>

            <p>Your passing speed:</p>

            <div>
                <button disabled={steps.length ? true : false} onClick={() => setSpeedTimeout(SLOW_SPEED_TIME)} className={activeSpeedButton(SLOW_SPEED_TIME)}>Slow</button>
                <button disabled={steps.length ? true : false} onClick={() => setSpeedTimeout(MEDIUM_SPEED_TIME)} className={activeSpeedButton(MEDIUM_SPEED_TIME)}>Medium</button>
                <button disabled={steps.length ? true : false} onClick={() => setSpeedTimeout(FAST_SPEED_TIME)} className={activeSpeedButton(FAST_SPEED_TIME)}>Fast</button>  
            </div>
        </div>
    );
};

export default Controls;