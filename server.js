var express = require('express');

var app = express();

var PORT = process.env.PORT || 3000;

var todos = [{
	id:1,
	description: 'Meet mom for lunch',
	completed: false
}, {

	id:2,
	description: 'Let\'s do this',
	completed: false
}, {

	id:3,
	description: 'Feed the cat',
	completed: true
}
];


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




	

app.get('/', function(req,res){
    res.send('Todo API Root');
});


app.listen(PORT, function(){
    console.log('Express listening on port ' + PORT + '!')

});