// components/Counter.js

import React, { useState } from 'react';

const Counter = ({ initialValue = 0, onChange }) => {
    const [count, setCount] = useState(initialValue);

    const increment = () => {
        setCount(prevCount => prevCount + 1);
        if(onChange) onChange(count + 1);
    };

    const decrement = () => {
        if (count > 0) {
            setCount(prevCount => prevCount - 1);
            if(onChange) onChange(count - 1);
        }
    };

    return (
        <div className="counter">
            <button onClick={decrement}>-</button>
            <input type="number" value={count} readOnly />
            <button onClick={increment}>+</button>
        </div>
    );
};

export default Counter;