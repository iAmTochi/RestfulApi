const pool  = require ("../../config/database");


module.exports = {
    create: (data, callBack)=> {
        pool.query(
            `INSERT INTO users(firstName,lastName,gender,email,password, number)
              VALUES(?,?,?,?,?,?)`,
              [
                  data.first_name,
                  data.last_name,
                  data.gender,
                  data.email,
                  data.password,
                  data.number
              ],
              (error, results, field) => {
                  if(error){
                      return callBack(error);
                  }

                  return callBack(null, results)
              }
        )
    },
    getUsers: callBack => {
        pool.query(
            `SELECT id,firstName,lastName,gender,email,number FROM users`,
            [],
            (error, results, field)=>{
                if(error){
                    return callBack(error)
                }
                return callBack(null, results);
            }
        );
    },
    getUserByUserId: (id, callBack)=> {
        pool.query(
            `SELECT id,firstName,lastName,gender,email,number FROM users WHERE id = ?`,
            [id],
            (error, results, fields)=>{
                if(error){
                    callBack(error)
                }
                return callBack(null, results);
            
            }
        );
    },

    updateUser: (data, callBack) => {
        pool.query(
            `UPDATE users SET firstName=?, lastName=?, gender=?, email=?, password=?, number=? WHERE id = ?`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.id
            ],

            (error, results, field) => {
                if(error){
                   return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    deleteUser:(data, callBack) => {
        pool.query(
            `DELETE FROM users WHERE id =?`,
            [data.id],
            (error, results, field) => {
                if(error){
                   return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    getUserByUserEmail: (email, callBack)=>{
        pool.query(
            `SELECT * FROM users WHERE email = ?`,
            [email],
            (error, results, field) => {
                if(error){
                   return callBack(error);
                }
                return callBack(null, results[0]);
            }
        )
    }
}