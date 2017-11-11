var express = require('express');
var bodyParser = require('body-parser');
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
	var flag;

	todos.forEach(function(todo){
		if(todo.id === todoid)
		{
			flag = todo;
		}
	});
		

		if(flag)
		{
			res.json(flag)
		}
		else
		{
			res.status(404).send();
		}



	});

app.post('/todos', function(req,res)
{
	var body = req.body;
	body.id = todoNextId;
	todos[todoNextId] = body;
	todoNextId+=1;
	res.json(body);
	
}

	);



	

app.get('/', function(req,res){
    res.send('Todo API Root');
});


app.listen(PORT, function(){
    console.log('Express listening on port ' + PORT + '!')

});