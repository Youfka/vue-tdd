const express = require('express');
const cors = require('cors');
const app = express();
let heroes = require('./mock data/heroes.json');

app.use(cors());
 
app.get('/heroes', (req, res, next) => {
    res.json(heroes);
}); 
// app.post('/heroes/add', (req, res, next) => {
//     res.json(heroes);
// }); 

app.listen(3000, () => {
    console.log('Server running on port 3000');
});