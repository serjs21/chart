import React from 'react';
import './ProgressBar.scss';

const ProgressBar = ({total, value}) => {
    const percent = ((value / total) * 100).toFixed(2);
   return <div className='progress-bar'>
            <div>Last value: {value || '--'}</div>
            <div>Percent: {percent}%</div>
            <div className='total'>
                <div className='fill' style={{width: `${percent}%`}} />
            </div>
            </div>
}

export default ProgressBar;