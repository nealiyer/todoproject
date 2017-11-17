var express = require('express');
var bodyParser = require('body-parser');
var _= require('underscore');

var app = express();

var PORT = process.env.PORT || 3000;

var todos = [];
var todoNextId =1;


app.use(bodyParser.json());
// GET /todos
app.get('/todos', function(req, res){
	res.json(todos);
} );

//GET /todos/:id

app.get('/todos/:id', function(req,res)
{
	var todoid = parseInt(req.params.id, 10);
	var flag = _.findWhere(todos, {id: todoid});

	
		

		if(flag)
		{
			res.json(flag);
		}
		else
		{
			res.status(404).send();
		}



	});

app.post('/todos', function(req,res)
{
	var body = _.pick(req.body, 'description', 'completed');
	if(!_.isBoolean(body.completed)|| !_.isString(body.description)|| body.description.trim().length ===0){
		return res.status(400).send();
	}
	body.description = body.description.trim();
	body.id = todoNextId;
	todos.push(body);
	todoNextId+=1;
	res.json(body);
	
}

	);



	

app.get('/', function(req,res){
    res.send('Todo API Root');
});


app.delete('/todos/:id', function(req,res){
	var todoid = parseInt(req.params.id, 10);
	var flag = _.findWhere(todos, {id: todoid});
	todos = _.without(todos, flag);
	
		

		if(flag)
		{
			res.json(flag);
		}
		else
		{
			res.status(404).send();
		}



	
});


app.put('/todos/:id', function(req,res){

	var todoid = parseInt(req.params.id,10);
	var flag= _.findWhere(todos, {id:todoid});

	var body = _.pick(req.body, 'description', 'completed');
	var validAttributes = {};
	if(!flag){
		res.status(404).send();
	}



	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
		validAttributes.completed = body.completed;
	}else if(body.hasOwnProperty('completed')){
		return res.status(400).send();

	}
	else{

	}

	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length>0){
		validAttributes.description = body.description;
	}else if(body.hasOwnProperty('description')){
		return res.status(400).send();

	}
	else{

	}
	_.extend(flag, validAttributes);
	res.json(flag);


	
});


app.listen(PORT, function(){
    console.log('Express listening on port ' + PORT + '!')

});