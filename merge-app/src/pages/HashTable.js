import React, {useState} from 'react';

import {Link} from 'react-router-dom';

const HashTableVisual = () => {

    const [key, setKey] = useState('');
    const [value, setValue] = useState('');
    const [table, setTable] = useState({});

    const onKeyUpdate = event => {
        setKey(event.target.value);
    }

    const onValueUpdate = event => {
        setValue(event.target.value);
    }

    const onAddButton = () => {
        table[key] = value;
        setKey('');
        setValue('');
        
    }


    const onRemoveButton = () => {
        delete table[key];
        setKey('');
        setValue('');
    }

    const loadPair =(k, v) => {
        setKey(k);
        setValue(v);
    }

    const hashTable = () => {
        return (
            <table>
                    <tbody>
                        <tr key='key'>{keyRow()}</tr>
                        <tr value='value'>{valueRow()}</tr>
                    </tbody>
                </table>
        );
    }

    const keyRow = () => {
        return Object.keys(table).sort().map((key) => (
            <td  onClick={(() => loadPair(key, table[key]))}>{key}</td>
        ))
    }

    const valueRow = () => {
        return Object.keys(table).sort().map((key) => (
            <td>{table[key]}</td>
        ))
    }


    return (
        <div>
            <h3>Hash Table</h3>
            <div>
                <table>
                    <tbody>
                        <tr key='input'>
                            <td><input type='text' value={key} onChange={onKeyUpdate}></input></td>
                            <td><input type='text' value={value} onChange={onValueUpdate}></input></td>
                        </tr>
                        <tr key='control'>
                            <td><button onClick={onAddButton}>Add</button></td>
                            <td><button onClick={onRemoveButton}>Remove</button></td>
                        </tr>
                    </tbody>
                </table>
                </div>
                <br/><br/>
                <div>
                {hashTable()}
            </div>
        </div>
    )
}

export default HashTableVisual;