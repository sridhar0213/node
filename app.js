const express = require('express');
// const serverless = require('serverless-http');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
//const bodyParser = require('body-parser');

const app = express()
// const router = express.Router();
const port = 3000
//app.use(bodyParser);
app.use(express.json())
//app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors())

//app.listen(3000, '127.0.0.1');

const db = new sqlite3.Database('./test.db',sqlite3.OPEN_READWRITE,(err)=>{
    if(err) return console.log(err.message)
    console.log("suussss")
})


//to create table
// db.run('CREATE TABLE users(name,phone,message)');

//to insert data
// const data = 'INSERT INTO users (name,phone,message) VALUES(?,?,?)';
// db.run(data,['mike4','23rfv88834','wrdfit'],(err)=>{
//     if (err) return console.log(err.message)
//     console.log("inserted")
// })








app.get('/usersData', (req, res) => {

  //res.json('Hello World!')
  //to fetch data
    const select = 'Select * FROM users'
    db.all(select, [], (err,rows)=>{
        if(err) return console.log(err.message)
        rows.forEach((row)=>{
            console.log(row)
        })
        res.json(rows)
    })
    // db.close((err)=>{
    //     if (err) return console.log(err)
    //})
})

app.post('/addUsers', (req, res) => {
   //to insert data

   console.log(req.body)
   const name = req.body.name;
   const phone = req.body.phone;
   const message = req.body.message;
   console.log(name)
   console.log(phone)

    const data = 'INSERT INTO users (name,phone,message) VALUES(?,?,?)';
    db.run(data,[name,phone,message],(err)=>{
        if (err) return console.log(err.message)
        console.log("inserted")
        res.send('Got a POST request')
    })
    
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// app.use('/.netlify/functions/api',router);
// module.exports.handler = serverless(app);