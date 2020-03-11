module.exports = (db) => { // <-- db has been declated in the main server page which this has access to
  return {

    someOtherFunc: (input) => {
      const qs = `SELECT * FROM tableName WHERE id=$1;`
      return db.query(qs, [input])
    }
  }
}