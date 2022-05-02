require('dotenv').config()

module.exports = {
    port: process.env.PORT,
    dbPass: process.env.DB_PASS
}
