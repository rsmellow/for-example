import _ from 'underscore'
import {Component} from 'react'
import {GroupList} from '../transaction'

import {db} from '../../db'
import './ledger.css'

class Ledger extends Component {
    constructor(props) {
        super(props)
        this.allTransactions = []
        this.groupedTransactions = []
        this.state = {
            transactions: [{date: Date.toLocaleString(), amount:0, description: 'nill'}]
        }
    }

    groupTransactions() {
        this.groupedTransactions.length = 0
        const grouped = _.groupBy(this.allTransactions.filter(t => this.isCredit()? t.amount >= 0 : t.amount < 0), 'payee')
        for( const prop in grouped){
                this.groupedTransactions.push(
                {
                    group: prop,
                    transactions: grouped[prop].map(v => ({id: v.id, description: v.description, amount: v.amount, date: v.date}))
                })
        }
    }

    isCredit() {
        return this.props.type === 'credit'
    }

    processData() {
        this.setState({transactions: this.groupedTransactions})
    }

    loadData() {
        if(this.allTransactions.length > 0) {
            // we already have the transaction data
            this.groupTransactions()
            this.processData()
        } else {
            db.getTransactions(data => {
                this.allTransactions = data
                this.groupTransactions()
                this.processData()
            })
        }
    }

    componentDidMount() {
       this.loadData()
    }

    componentDidUpdate(pProps) {
        if(pProps.type !== this.props.type) {
            this.loadData()
        }
    }

    render(props) {
        let tView
        tView = <GroupList list={this.groupedTransactions} />

       return (
            <div className='grid2cell'>
                <div id='ledger'>
                    {tView}
                </div>
            </div>
        )
    }
}

export {Ledger}
