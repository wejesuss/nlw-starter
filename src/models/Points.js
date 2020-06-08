const db = require('../database/db')

module.exports = {
    find: (search) => {
        return db.query(`SELECT * FROM places WHERE city LIKE '%${search}%' OR state LIKE '%${search}%'`, [])
    },
    post: (data) => {
        return db.query(`
            INSERT INTO places (
                name,
                image,
                address,
                address2,
                state,
                city,
                items
            ) VALUES (?,?,?,?,?,?,?);
        `, data);
    }
}