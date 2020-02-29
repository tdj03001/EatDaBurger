const connection = require("../config/connection");

//These functions will execute the necessary MySQL commands in the controllers, which will be used to retrieve and store data in the DB

function selectAll() {

}

function insertOne() {

}

function updateOne() {

}

//Helper functions
function printCharacters(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

function convertToSql(obj) {
  const arr = [];
  for (let key in obj) {
    const val = obj[key];
    if (Object.hasOwnProperty.call(obj, key)) {
      if (typeof val === "string" && val.indexOf(" ") >= 0) {
        val = "'" + val + "'";
        arr.push(key + "=" + val);
      }
    }
    return arr.toString();
  }
}


const orm = {
  all: function (tableInput, callback) {
    const queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },
  create: function (table, cols, vals, callback) {
    const queryString = "INSERT INTO " + table + " (" + cols.toString() + ") VALUES (" + printCharacters(vals.length) + ")";
    console.log(queryString);
    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function (table, objColVals, condition, callback) {
    const queryString = "UPDATE " + table + " SET " + convertToSql(objColVals) + " WHERE " + condition;
    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },
  delete: function (table, condition, callback) {
    const queryString = "DELETE FROM " + table + " WHERE " + condition;

    // delete: function (table, objColVals, condition, callback) {
    //   const queryString = "DELETE " + table;

    //   // queryString += " SET ";
    //   // queryString += objToSql(objColVals);
    //   // queryString += " WHERE ";
    //   // queryString += condition;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  }
};

// Export the orm object for the model (cat.js).
module.exports = orm;
