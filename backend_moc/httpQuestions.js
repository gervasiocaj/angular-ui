
var routerHTTP = require('./routerHTTP')

var app = routerHTTP(3412);

var questions = [{
					  id: 1,
					  enunciado: "teste",
					 tipoResposta: "TEXTO",
					  comentario: false
					},

				{	  id: 2,
					  enunciado: "O programa da disciplina esteve de acordo com a ementa da mesma?",
					  tipoResposta: "TEXTO",
					  comentario: false },

				{	 id: 3,
					  enunciado: "vai aparecer em todo canto",
					  tipoResposta: "TEXTO",
					  comentario: false }];


var types = ["Múltipla Escolha"];

var teacher =[{name:"Matheus Gaudêncio", matter:"Administração de Sistemas"},
			{name:"Não sei quem é", matter:"Banco de Dados I"}, 
			{name:"Nazareno", matter:"Sistema de Informação I"}, 
			{name:"Carlos Wilson", matter:"Gerência da Informação"}];			


app.interceptor(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

app.interceptor(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  next();
});



app.get('/question', function(req, res) {
	res.write(JSON.stringify(questions));
	res.end();
});


app.get('/types', function(req, res) {
	res.write(JSON.stringify(types));
	res.end();
});

app.get('/teachers', function(req, res) {
	res.write(JSON.stringify(teacher));
	res.end();
});

app.post('/question', function(req, res) {

	var question = req.body;
	questions.push(JSON.parse(question));
	res.end();

});

app.delete('/question', function(req, res) {
	var question = req.body;
	console.log(question);
	var pos = questions.indexOf(question);
	console.log(pos);
	questions.slice(pos,1);
	res.end();

});


app.options('/question', function(req, res) {
	res.end();
});



