import {useState} from 'react'

function CheckBox({isChecked, handleChange, value}) {
    return (
        <input id={value} 
               type='checkbox' 
               checked={isChecked} 
               name={value} 
               value={value}
               onChange={handleChange} />
    )
}

export {CheckBox}
