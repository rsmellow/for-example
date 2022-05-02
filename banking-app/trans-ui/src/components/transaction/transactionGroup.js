import {Component} from 'react'
import {DetailList} from './transactionDetail'
import {Heading, EditPanel} from '../ui'
import {Utils} from '../../util'

import './transactionList.css'

class TransactionGroup extends Component {
    constructor(props) {
        super(props)
        this.state = { showingTList: false, selectedTrans: [], editing: false, allSelected: false }
    }

    componentDidMount() {

    }

    toggleList(e) {
        if(!this.state.showingTList) {
            e.target.scrollIntoView(true)
        }

        this.setState(p => {return {showingTList: !p.showingTList}})
    }

    selectTrans(e) {
        const {checked, value} = e.target
        this.setState(p => { return {selectedTrans: [...p.selectedTrans,value]}})
        
        if(!checked) {
            this.setState(p=> {return {selectedTrans: p.selectedTrans.filter(t => t !== value) }})
        }
    }

    onEdit() {
        this.setState({editing: true})
    }

    onSelectAll() {
        
        let allSelections = []
        if(!this.state.allSelected) {
            allSelections = this.props.groupList.map(v => v.id)
        }

        this.setState(p => {return {selectedTrans: allSelections, allSelected: !p.allSelected}})
    }

    commitChange(id) {
        this.setState({editing: false})
        alert(`Setting payee Id to: ${id}`)
    }

    render() {
        let ePanel = ''
        if(this.state.editing) {
            ePanel =  <EditPanel onComplete={id => this.commitChange(id)}/>
        }
        
        return (
            <div className='trans-group'>
                <section className={`group-head ${this.state.showingTList?'showGroup':'hideGroup'}` }>
                    <button className='tlistToggle' onClick={e => this.toggleList(e)}>{this.state.showingTList?'-':'+'}</button>
                    <Heading groupName={this.props.groupName} 
                            selectAll={this.state.showingTList}
                            handleSelectAll={() => this.onSelectAll()}
                            allowEdit={this.state.showingTList && this.state.selectedTrans.length} 
                            handleEdit={() => this.onEdit()} />
                    <p className='text-right'>{this.props.groupList.length}</p>
                    <p className='text-right'>{Utils.localizeAmount(this.props.groupList.map(v => v.amount).reduce((p,c)=> p + c,0))}</p>
                </section>
                {ePanel}
                <DetailList transactions={this.props.groupList}
                            selections={this.state.selectedTrans}
                            visible={this.state.showingTList}
                            handleSelection={e => this.selectTrans(e)}/>
                
            </div>
        )
    }
}

export {TransactionGroup}
