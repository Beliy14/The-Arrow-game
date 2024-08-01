import React from 'react';
import './score.scss'
import { useAppSelector } from '../../../../app/hooks';

const Score = () => {

    const {totalSuccessful, totalUnsuccessful} = useAppSelector(state => state.playground)


    return (
        <div className='score-body'>
            <h4>Score:</h4>
            <div>
                <span className='Unsuccessful'>Unsuccessful: {totalUnsuccessful}</span>
                <span className='Successful'>Successful: {totalSuccessful}</span>
            </div>
        </div>
    );
};

export default Score;