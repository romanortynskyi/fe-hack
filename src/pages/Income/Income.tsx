import React, { useState } from 'react';

const Income: React.FC = () => {
    const [items, setItems] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState('');

    const addItemToList = () => {
        if (inputValue.trim() !== '') {
            setItems(prevItems => [...prevItems, inputValue]);
            setInputValue('');
        }
    };

    const removeItemFromList = (index: number) => {
        setItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />
                <button onClick={addItemToList}>Add Item</button>
            </div>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        {item}
                        <button onClick={() => removeItemFromList(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default Income;
