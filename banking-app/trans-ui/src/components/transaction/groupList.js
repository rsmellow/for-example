import { TransactionGroup } from './transactionGroup'
import './transactionList.css'

    function GroupList(props) {
        return (
            <div className="tlist">
                {
                    props.list
                    .map((t,i) => <TransactionGroup key={`grp-${i}`} groupName={t.group} groupList={t.transactions} />)
                }
                </div>)
    }

    export { GroupList}
