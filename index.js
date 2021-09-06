const express = require('express')
const app = express()
const path = require('path');
const fs = require('fs')
var multer  = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
const port = 3000
var match_score = require('./matchAlgorithm.js');

app.use(express.static(__dirname + '/'));


app.get('/', (req, res) => {
    score = match_score("Jack","Jill")
    output = "Jack matches Jill " + score.toString() + "%"
    if (score > 80 ){
        output += ", good match"
    }
    res.sendFile(path.join(__dirname+'/home.html'));
})

app.get('/match', (req, res) => {
    male = req.query.male
    female = req.query.female 
    if( !/^[a-zA-Z]+$/.test(male) ||  !/^[a-zA-Z]+$/.test(female) ) {
        res.send('Error: Non alphabet character detected!') ;
    }
      
    score = match_score(male,female)
    output = male + " matches " + female + " " + score.toString() + "%"
    if (score > 80 ){
        output += ", good match"
    }
    res.send( output) ;
})


app.post("/match_csv", upload.single('csv_file'), (req, res) => {    
    var b = Buffer.from(req.file["buffer"], 'utf8')
    var data = b.toString('utf8').split("\r\n")
    console.log(data)

    let data2 = fs.createReadStream(req.file.originalname,'utf8');

    // Create separate lists
    males = []
    females = []
    for( let x in data.toString('utf8')){
        console.log(x)
        let rec = x.toString('utf8').split(",")
        console.log(rec)
        if ( rec.length === 2 ){
            if( rec[1].toLowerCase() === "f" && females.indexOf(rec[0]) < 0 ){ females.push(rec.shift());}
            if( rec[1].toLowerCase() === "m" && males.indexOf(rec[0]) < 0){ males.push(rec.shift());}
        }
    }
    console.log("---------------------------")
    console.log(males)
    console.log(females)

    //Calculate the matches for all different pairs  
    results = []
    for( let m in males ){
        for( let f in females){
            score = match_score(m,f)
            output = m + " matches " + f + " " + score.toString() + "%"
            if (score > 80 ){ output += ", good match"}
            results[score] = output 
            console.log(m + f)
        }
    }

    res.send(results)
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})