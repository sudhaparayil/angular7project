
var express = require('express')
var app = express()
var cors =require('cors');
var bodyParser =require('body-parser');
var User =require('./models/user');
var multer = require('multer');
var path = require('path');
const uploadFolder = __dirname + '/upload/';
app.use(cors());
// app.use(bodyParser.json());

app.use(bodyParser.json({limit: '50mb'}));
var mongoose = require('mongoose')
 mongoose.connect('mongodb://sudha:sudha123@ds139954.mlab.com:39954/meandb');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
function decodeBase64Image(dataString) {
    // console.log(dataString);
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    //   console.log(dataString);
    var response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    ext = matches[1].split("/");
    response.ext = ext[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}
app.get('/logo/:id', function (req, res, next) {
    User.findOne({ file_name: req.params.id }, function (err, img) {
        if (err) return next(err);
        console.log(img);
        if (img) {
            res.set("Content-Type", img.logo.contentType);
            //   res.contentType(img.logo.contentType);
            res.send(img.logo.data);
        }
    });
});
app.post('/register', function (req, res) {
    // res.send('Hello World')
    console.log(req.body)
    var newUser = new User();
    newUser.title=req.body.newDivision;
    newUser.type=req.body.type;
    var base64 = decodeBase64Image(req.body.logoSrc);
    logoName = new String(new Date().getTime()) + '_' + (Math.floor(100000 + Math.random() * 900000) + '.' + base64.ext);
    var buf = new Buffer(base64.data, 'base64');
    // var fs = require("fs");
    require("fs").writeFile('./upload/' + logoName, base64.data, 'base64', function (err) {
        console.log(err);
      });
    newUser.file_name = logoName;
    newUser.logo.data = buf;
    newUser.logo.contentType = base64.type;
    req.body.time.forEach((elm, i) => {
        let tm = {
            name: elm.name,
            
        }
       
        newUser.time.push(tm);
    });

    newUser.save(function (err, insertedUser) {
        if (err) throw new Error(err);
        
        res.json({ success: true, msg: "User Created Successfully", user: insertedUser });
    });

})


app.get('/allusers', function (req, res) {
    User.find({}, (err, users) => {
        if (err) {
            throw err;
        } else {
            return res.json(users);
        }
    });

})

app.get('/singleuser/:id', function (req, res) {
    User.findOne({ _id: req.params.id }, (err, singleuser) => {
        if (err) {
            throw err;
        } else {
            return res.json(singleuser);
        }
    });

})

app.get('/download/:id', function (req, res) {
// exports.downloadFile = (req, res) => {
	let filename = req.params.id;
    res.download(uploadFolder + filename);  
    // console.log(filename)
//}
})
//   app.use(express.static(path.join(__dirname, 'public')));

// app.get('*', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'pulic/index.html'));
// })
app.listen(3000)