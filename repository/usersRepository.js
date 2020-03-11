module.exports = db => {
  return {
    getAllUsers: () => {
      console.log('inside the repo')
      const qs = `SELECT * FROM users;`;
      return db.query(qs);
    },
    getUser: (newUser) => {
      const qs = `SELECT * FROM users WHERE employee_id = '${newUser.employeeId}'`;
      return db.query(qs);
    }
    ,
    createUser: ({
      userFirstName,
      userLastName,
      employeeId,
      accountId,
      password,
      role,
      wage,
      fullTimeStatus,
      abilityToLecture,
      isAdmin
    }) => {
      console.log("create user called")
      qs = `INSERT INTO users(
        first_name,
        last_name,
        employee_id,
        account,
        password,
        role,
        wage,
        is_full_time,
        able_to_lecture,
        is_admin
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
      )`
      return db.query(qs, [
        userFirstName,
        userLastName,
        employeeId,
        accountId,
        password,
        role,
        wage,
        fullTimeStatus,
        abilityToLecture,
        isAdmin
      ])
    }
  };
};
