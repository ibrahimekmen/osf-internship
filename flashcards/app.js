const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.set('view engine','pug');

app.get('/', (req,res)=>{
    const name = req.cookies.username;
    if(name){
        res.render('index',{name: req.cookies.username});
    }else
        res.redirect('/hello');
    
});

app.get('/cards', (req,res)=>{
    res.render('card', {prompt: "who climbed the empire state", hint: "The answer is big and furry"});
});

app.get('/hello',(req,res)=>{
    res.render('hello');
});

app.post('/hello',(req,res)=>{
    res.cookie('username', req.body.username);
    if(req.body.username){
        res.redirect('/');
    }else{
        res.render('hello');
    }
});

app.listen(3000);