const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const axios = require('axios');

router.post('/screenshots', (req, res) => {
  return axios({
    url: "https://api-v3.igdb.com/screenshots",
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'user-key': keys.igdbKey
    },
    data: req.body.data
  })
  .then(response => {
    return res.json(response.data);
  })
  .catch(err => {
    console.error(err);
  });
});

router.post('/game', (req, res) => {
  return axios({
    url: `https://api-v3.igdb.com/games`,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'user-key': keys.igdbKey
    },
    data: req.body.data
  })
    .then(response => {
      const game = response.data[0];
      if (game){
        game.igdb_id = game.id;
        delete game.id;
      }
      return res.json(game);
    })
    .catch(err => {
      console.error(err);
    });
});

router.post('/games', (req, res) => {
  return axios({
    url: `https://api-v3.igdb.com/games`,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'user-key': keys.igdbKey
    },
    data: req.body.data
  })
    .then(response => {
      const games = response.data;
      games.forEach(game => {
        game.igdb_id = game.id;
        delete game.id;
      });
      return res.json(games);
    })
    .catch(err => {
      console.error(err);
    });
});

router.post('/ttb', (req, res) => {
  return axios({
    url: `https://api-v3.igdb.com/time_to_beats`,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'user-key': keys.igdbKey
    },
    data: req.body.data
  })
  .then(response => {
    const { data } = response;
    let normally = 0;
    let normally_count = 0;
    let completely = 0;
    let completely_count = 0;
    let hastily = 0;
    let hastily_count = 0;
    data.forEach(el => {
      el.normally ? normally =  normally + el.normally : '';
      el.completely ? completely = completely + el.completely  : '';
      el.hastily ? hastily = hastily + el.hastily  : '';

      el.normally ? normally_count++: '';
      el.completely ?  completely_count++  : '';
      el.hastily ? hastily_count++  : '';
    });

    normally=normally/normally_count;
    completely=completely/completely_count;
    hastily=hastily/hastily_count;

    return res.json({normally, completely, hastily});
  })
  .catch(err => {
    console.error(err);
  });
});

module.exports = router;
