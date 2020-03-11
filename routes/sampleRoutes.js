/*
 * All routes for Sample are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 * Can perform all CRUD operations here
 */

 const express = require('express');
 const router = express.Router();

 module.exports = (sampleRepository) => {
  
  router.get('/', (req, res) => {
    res.send('Welcome to sample route')
  })

  // If DATABASE is concerned, it is an async function
  router.post('/', async (req, res) => {
    // const input = req.body;
    const input = 'can be brought from url or the body if a form is submitted in front-end'
    try {
      await sampleRepository.someFunc(input)
    // if setting cookie, uncomment the following code
    /*
    res.cookie('user', JSON.stringify({
      name: userInfoBackFromDb.name
      id: userInfoBackFromDb.id
    }))
    */
    res.send(input)
    } 
    catch (error) {
      console.error(error)
    }
  })

  
  return router
 };