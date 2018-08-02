var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')
mongoose.Promise = Promise
var dbUrl = 'mongodb://bruno:user123@ds163781.mlab.com:63781/learning-node'

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

var messages = [
    {name: 'Tom', message: 'Hi People'},
]

var Message = mongoose.model('Message', {
    name: String,
    message: String
})

app.get('/messages', (req,res) =>{
    Message.find({}, (err, messages) =>{
        res.send(messages)
    })
})




app.post('/messages', async (req,res) =>{

    try {
        var message = new Message(req.body)
        var savedMessage = await message.save()
        console.log('saved')
        var censored = await Message.findOne({message:'badword'})
        if (censored)
            await  Message.remove({_id:censored.id})
        else 
            io.emit('message', req.body)
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
        console.log(error)

    } finally{
        console.log('Finally finished')
    }


})


/* Message.findOne({ message: 'badword'},(err,censored) =>{
    if(censored){
        console.log('censored words found', censored)
        Message.remove({_id: censored.id}, err =>{
            console.log('removed censored message')
        })
    }


})  */

mongoose.connect(dbUrl,{useNewUrlParser: true}, err => console.log('mongodb', err))

io.on('connection', (socket) =>{
    console.log('A user connected')
})
var server = http.listen(3000, () => console.log('Server is listening on port', server.address().port))