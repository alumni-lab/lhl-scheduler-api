const addNewUser = (db, user) => {
  let qsParam = [user.name, user.email, user.google_id];
  let qs = `
    INSERT INTO users (name, email, google_id) 
    VALUES ($1, $2, $3)
    RETURNING *;
  `
  return db.query(qs, qsParam).then(res => {
    return res.rows[0];
  })
}

exports.addNewUser = addNewUser;

const getUserByGoogleId = (db, google_id) => {
  let qsParam = [google_id];
  let qs = `
    SELECT * 
    FROM users
    WHERE google_id = $1;
  `
  return db.query(qs, qsParam).then(res => {
    return res.rows[0];
  })
}

exports.getUserByGoogleId = getUserByGoogleId;