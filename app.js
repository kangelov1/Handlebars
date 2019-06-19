const express = require('express')
const path = require('path')
const hbs = require('express-handlebars')

const helpersHbs = hbs.create({
    extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname + '/views/layouts',
    helpers:{
        calculation:function(value){
            return value + 7
        },
        list:function(value,options){
            return '<h2>' + options.fn({test:value}) + '</h2>' 
        }
    }
})

const app = express()

let quotesArr = ['Quote 1','Quote 2','Quote 3']

app.engine('hbs',helpersHbs.engine)

app.set('views',path.join(__dirname,'views'))
app.set('view engine','hbs')

app.get('/',(req,res)=>{
    res.render('home',{title:"My home page",condition:true})
})

app.get('/about',(req,res)=>{
    res.render('about',{title:"My about page",quotes:quotesArr,htmlTag:'<p>This is a paragraph</p>',youCare:true})
})

app.get('/each',(req,res)=>{
    res.render('each',{
        people:['James','Peter','Sadrack','Morissa'],
        user:{
            username:'user1',
            age:20,
            phone:467644
        },
        lists:[
            {items:['Mango','Banana','Pineapple']},
            {items:['Potato','Manioc','Avocado']}
        ]
    })
})

app.get('/lookup',(req,res)=>{
    res.render('lookup',{
        user:{
            username:'Pesho',
            age:20
        },
        people:['James','Peter','Sadrack','Morissa']
    })
})

app.listen(3000,()=>{
  console.log('Listening to port 3000')  
})