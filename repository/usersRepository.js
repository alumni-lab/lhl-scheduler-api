module.exports = db => {
  return {
    getAllUsers: () => {
      console.log('inside the repo')
      const qs = `SELECT * FROM users;`;
      return db.query(qs);
    }
  };
};
