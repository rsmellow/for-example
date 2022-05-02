import {Utils} from '../../util'
import { CheckBox } from '../ui'
import './transactionDetail.css'

function DetailItem({transId, selected, date, description, amount, changeHandler}) {
    return (
        <li>
            <CheckBox isChecked={selected} 
                      value={transId} 
                      handleChange={changeHandler}/>
            <p className="trans-date">{date}</p>
            <p className="trans-description">{description}</p>
            <p className="trans-amount">{amount}</p>
        </li>
    )
}

function DetailList({visible, transactions, selections, handleSelection}) {
    
    return (
        <ul className={`trans-detail-list ${visible?'showem':'hidem'}`}>
        {
            transactions.map(v => {
                return <DetailItem key ={v.id}
                                   selected = {selections.includes(`${v.id}`)}
                                   date={Utils.localizeDate(v.date)}
                                   description={v.description}
                                   amount={Utils.localizeAmount(v.amount)}
                                   transId={v.id}
                                   changeHandler={handleSelection}
                                    />
            })
        }
        </ul>
    )
}


export {DetailList}
