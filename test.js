var express = require('express')
var app = express()
var cors =require('cors');
var bodyParser =require('body-parser');
var User =require('./models/user');
var path = require('path');

var mongoose = require('mongoose');
 mongoose.connect('mongodb://sudha:sudha@ds231715.mlab.com:31715/mytasklist_db');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

app.use(cors());
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
// app.post('/register', function (req, res) {
//     // res.send('Hello World')
//     console.log(req.body)
//     var newUser = new User();
//     newUser.name=req.body.newDivision;
//     newUser.type=req.body.type;
//     req.body.time.forEach((elm, i) => {
//         let tm = {
//             name: elm.name,
            
//         }
       
//         newUser.time.push(tm);
//     });

//     newUser.save(function (err, insertedUser) {
//         if (err) throw new Error(err);
        
//         res.json({ success: true, msg: "User Created Successfully", plan: insertedUser });
//     });

// })
// 
//   app.use(express.static(path.join(__dirname, 'public')));

// app.get('*', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'pulic/index.html'));
// })
app.listen(3000);