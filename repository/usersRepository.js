module.exports = db => {
  return {
    getAllUsers: () => {
      console.log('inside the repo')
      const qs = `SELECT * FROM users;`;
      return db.query(qs);
    },
    getUserByAccount: (accountId) => {
      const qs = `SELECT * FROM users WHERE account = '${accountId}'`;
      return db.query(qs);
    },
    createUser: ({
      userFirstName,
      userLastName,
      userEmail,
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
        email,
        employee_id,
        account,
        password,
        role,
        wage,
        is_full_time,
        able_to_lecture,
        is_admin
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
      )`
      return db.query(qs, [
        userFirstName,
        userLastName,
        userEmail,
        employeeId,
        accountId,
        password,
        role,
        wage,
        fullTimeStatus,
        abilityToLecture,
        isAdmin
      ])
    },
    editUser: ({
      id,
      first_name,
      last_name,
      employee_id,
      account,
      password,
      role,
      wage,
      is_full_time,
      able_to_lecture,
      is_admin,
      email,
      phone,
      specialty,
      github,
      social_network,
      website,
      image_url
    }) => {
      console.log('edituser called')
      const qs =`
      INSERT INTO users(
        id,
        first_name,
        last_name,
        employee_id,
        account,
        password,
        role,
        wage,
        is_full_time,
        able_to_lecture,
        is_admin,
        email,
        phone,
        specialty,
        github,
        social_network,
        website,
        image_url
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 ,$13, $14, $15, $16, $17, $18
      );`

      return db.query(`Delete from users WHERE employee_id = '${employee_id}'`)
      .then(res => {
        db.query(qs,[
          id,
          first_name,
          last_name,
          employee_id,
          account,
          password,
          role,
          wage,
          is_full_time,
          able_to_lecture,
          is_admin,
          email,
          phone,
          specialty,
          github,
          social_network,
          website,
          image_url
        ])
      })
    },

    deleteUser: (id) => {
      qs = ` Delete from users Where users.id = ${id} RETURNING users.first_name, employee_id
      `
      return db.query(qs)
    }
  };
};

//security concern remains
//

// ${id},
// '${first_name}',
// '${last_name}',
// '${employee_id}',
// '${account}',
// '${password}',
// '${role}',
// ${wage},
// ${is_full_time},
// ${able_to_lecture},
// ${is_admin},
// '${email}',
// '${phone}',
// '${specialty}',
// '${github}',
// '${social_network}',
// '${website}',
// '${image_url}'
