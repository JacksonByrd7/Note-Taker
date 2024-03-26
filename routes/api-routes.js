const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require ("fs");

//defines the get request to this routes end point '/api/notes'
router.get('/api/notes', async (req, res) => {
  const dbJson = await JSON.parse(fs.readFileSync("db/db.json","utf8"));
  res.json(dbJson);
});

//defines the post request to this routes end point '/api/notes'
router.post('/api/notes', (req, res) => {
  const dbJson = JSON.parse(fs.readFileSync("db/db.json","utf8"));
  const newFeedback = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  dbJson.push(newFeedback);
  fs.writeFileSync("db/db.json",JSON.stringify(dbJson));
  res.json(dbJson);
});

//defines the delete request to this routes end point '/api/notes'
//be aware that if you follow the same methodology and approach with uuidv4 you must enter "npmi uuid@3.4.0" in the command line of your terminal
router.delete('api/notes/:id', (req, res) => {
    let data = fs.readFileSync("db/db.json", "utf-8");
    const dataJSON = JSON.parse(data);
    const newNotes = data.JSON.filter((note) => {
        return note.id !== req.params.id;
    });
    fs.writeFileSync("db/db.json",JSON.stringify(newNotes));
    res.json("Note deleted.");
});

module.exports = router;