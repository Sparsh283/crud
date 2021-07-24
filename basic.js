const Joi = require('joi');
const express = require ('express');
const app = express();

app.use(express.json());
const trainee = [
{id : 1, name: 'Sparsh'},
{id : 2, name: 'Sameer'},
{id : 3, name: 'Valerian'},
];
app.get('/', (req, res ) =>{
    res.send('This is the first try.');
});

app.get('/flexiloans/trainee', (req, res) =>{
    res.send(trainee)
});
app.get('/flexiloans/trainee/:id', (req, res)=> {
    //res.send(req.query)
    const traine = trainee.find(c => c.id === parseInt(req.params.id));
    if(!traine) res.status(404).send('The trainee with given id was not found')// error 404
    res.send(traine);
});

app.post('/flexiloans/trainee', (req, res)=> {
    const { error } = validateTraine(req.body);

    if(error){
        res.status(400).send(error.details[0].message);         //400 = Bad connection
        return;
    }

    const traine = {
        id: trainee.length + 1,
        name: req.body.name
    };
    trainee.push(traine);
    res.send(traine);
});
app.put('/flexiloans/trainee/:id', (req, res) => {
    const traine = trainee.find(c => c.id === parseInt(req.params.id));    //first check the names
    if(!traine) res.status(404).send('The trainee with given id was not found')// error 404
    const { error } = validateTraine(req.body);
    if(error){
        res.status(400).send(error.details[0].message);         //400 = Bad connection
        return;
    }
    traine.name = req.body.name;
    res.send(traine);
});

app.delete('/flexiloans/trainee/:id', (req, res) => {
    const traine = trainee.find(c => c.id === parseInt(req.params.id));    //first check the names
    if(!traine) res.status(404).send('The trainee with given id was not found')// error 404

    const index = trainee.indexOf(traine);
    trainee.splice(index,1);

    res.send(traine);
});

function validateTraine(traine){
    const schema = {
        name: Joi.string().min(3).required()
    };
     return Joi.validate(traine, schema);
}

//const port = process.env.port || 8080;
app.listen(8080, function(){
    console.log('Listening on port 8080');

});