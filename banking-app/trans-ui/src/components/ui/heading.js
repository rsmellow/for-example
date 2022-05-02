import {CheckBox} from './inputs'
import { faEdit, faListCheck } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import './ui.css'


function EditSelections({editHandler}) {
    return (
        <FontAwesomeIcon icon={faEdit} onClick={editHandler}/>
    )
}

function SelectAll({handleSelection}) {
    return (
     <FontAwesomeIcon icon={faListCheck} onClick={handleSelection} />
    )
}


function Heading({allowEdit, selectAll, handleSelectAll, groupName, handleEdit}) {
    let panel = ''
    let selector = ''
    if(allowEdit)
        panel = <EditSelections editHandler={handleEdit} />
    
    if(selectAll)
        selector = <SelectAll handleSelection={handleSelectAll} />
    return (
       <div className='text-left'>{groupName} {selector} {panel}</div>
    )
}


export {Heading}
