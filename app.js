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
// db.run('CREATE TABLE users(name,phone,message,date,id)');

//to insert data
// const data = 'INSERT INTO users (name,phone,message,date,id) VALUES(?,?,?,?,?)';
// db.run(data,['mike4','23rfv88834','wrdfit','date','45'],(err)=>{
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

  //  console.log(req.body)
   const name = req.body.name;
   const phone = req.body.phone;
   const message = req.body.message;
   const date = new Date();
   const id = Date.now();
  

   if(name || phone || message){
    const data = 'INSERT INTO users (name,phone,message,date,id) VALUES(?,?,?,?,?)';
    db.run(data,[name,phone,message,date,id],(err)=>{
        if (err) return console.log(err.message)
        console.log("inserted")
        res.send('saved successfully')
    })

  }else{
    res.send('bye bye successfully')
  }
    
  })


  app.post('/deleteAllRecords',(req,res)=>{
    const sql = 'DELETE FROM users'
    if(req.body.key){
    db.run(sql,[],(err)=>{
      if(err) return console.log(err.message)
      res.send('Deleted all recodrs')
    })
  }else{
    res.send("thank you")
  }
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

