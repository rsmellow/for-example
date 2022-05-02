import React from 'react'
import {db} from '../../db'


class EditPanel extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {payee: '', payees: []}
    }

    componentDidMount() {
        db.getPayees(data => this.setState({payees: data}))
    }
    
    handleChange(e) {
        this.setState({payee: e.target.value})
    }
    
    handleSubmit(e) {
        e.preventDefault()
        this.props.onComplete(this.state.payee);
    }

    render() {
       return (
            <div className='editor'>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <label>Set Payee</label>
                    <select value={this.state.payee} onChange={e => this.handleChange(e)}>
                        {this.state.payees.map(p => <option value={p.id}>{p.name}</option>)}
                    </select>
                    <input type='submit' value='OK' />
                </form>
            </div>
       )
    }

}
export {EditPanel}
