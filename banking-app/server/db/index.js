const mysql = require('mysql');
const config = require('../config')

function Connection() {
    return mysql.createConnection({
        host: '127.0.0.1',
        user: 'wdev',
        password: config.dbPass,
        database: 'Banking'
    })
}

module.exports =  {
    getTransactions : cb => {
        const cn = Connection();
        cn.connect()
        cn.query('call Banking.get_transactions()', (e,r,f) => {
            if(!e) {
                cb(r)
            } else {
               console.log(e)
            }
        })
    },

    getPayees : cb => {
        const cn = Connection();
        cn.connect()
        cn.query('call Banking.get_payees()', (e,r,f) => {
            if(!e) {
                cb(r)
            } else {
                console.log(e)
            }
        })
    },

    getCategories : cb => {
        const cn = Connection();
        cn.connect()
        cn.query('call Banking.get_categories()', (e,r,f) => {
            if(!e) {
                cb(r)
            } else {
                console.log(e)
            }
        })
    }


}
