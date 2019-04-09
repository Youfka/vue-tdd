const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const bodyParser = require("body-parser");
let heroes = require('./mock data/heroes.json');

app.use(cors());
// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(express.json());
app.get('/heroes', (req, res, next) => {
    res.json(heroes);
}); 
app.post('/heroes/add', (req, res, next) => {
    let json = JSON.stringify(heroes);
    fs.readFile('./src/mock data/heroes.json', 'utf8', function readFileCallback(err, data){
         if (err){
            console.log(err);
        } else {
        let heroes = JSON.parse(data); 
        heroes.push(req.body); 
        json = JSON.stringify(heroes);
        fs.writeFile('./src/mock data/heroes.json', json, 'utf8', (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          }); 
    }});
    console.log(req.body, 'req');
    res.send('success');
});
app.put('/heroes/:id', function (req, res) {
    let id = req.id;
    let json = JSON.stringify(heroes);
    fs.readFile('./src/mock data/heroes.json', 'utf8', function readFileCallback(err, data){
         if (err){
            console.log(err);
        } else {
        let heroes = JSON.parse(data); 
        heroes[id] = req.body; 
        json = JSON.stringify(heroes);
        fs.writeFile('./src/mock data/heroes.json', json, 'utf8', (err) => {
            if (err) throw err;
            console.log('The file has been edited!');
          }); 
    }});
    console.log(req.body, 'req');
    res.send('success');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});