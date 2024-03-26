const router = require('express').router();
const path = require('path');

//defines the route that sends 'index.html' as a response to a client when a GET request is made
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

module.exports = router;