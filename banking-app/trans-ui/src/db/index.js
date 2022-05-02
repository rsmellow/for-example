const axios = require('axios').default

const db = {

    getTransactions : (cb) => {
        axios.get('/api').then(res => {
            cb(res.data[0])
        })
    },

    getPayees : cb => {
        axios.get('/api/payees').then(res => {
            cb(res.data[0])
        })
    },

    getCategories : cb => {
        axios.get('/api').then(res => {
            cb(res.data[0])
        })
    }
}

export {db}
