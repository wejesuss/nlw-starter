const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database("./src/database/database.db", (err) => err)

db.query = function(sql, params) {
    let that = this;
    if(!Array.isArray(params)) throw new Error("params is not an array")
    return new Promise(function(resolve, reject) {
        that.all(sql, params, function(err, rows) {
            if(err) {
                reject(err)
                return err
            } else {
                resolve(rows)
            }
        })
    })
}

module.exports = db