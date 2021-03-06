angular.module("myApp.create", ['ngRoute'])

.config(['$routeProvider', function($routeProvider, $http, config) {
	$routeProvider.when('/create', {
		templateUrl: 'views/create.html',
		controller: 'CreateCtrl'
	});
}])



	//http://jsfiddle.net/timriley/GVCP2/
	.controller('CreateCtrl',['$scope', 'questionAPI', 'config',function($scope, questionAPI, config) {


		var begin =  function(){

			$scope.tipoResposta = ["TEXTO", "MULTIPLA_ESCOLHA", "SELECAO"];
			loadQuestion();

		}

		var loadQuestion = function() {

			questionAPI.getQuestions().then(
				function(response){
					$scope.questions = response.data
				});



		}


		$scope.addQuestion = function(question){

			questionAPI.saveQuestion(question).then(

				function(response){
					delete $scope.question;
					loadQuestion();
				}, function(error){
					console.log("Não foi possível adicionar nova questão");
				})

	
		}	


		$scope.isQuestionSelected = function (questions){
			return questions.some(function (question){
				return question.selected;
			});
		}


		$scope.deleteQuestion = function(questions){


			$scope.questions = questions.filter(function(question){
				if (question.selected){
					questionAPI.deleteQuestion(question);
				}else{
					return question;
				}	
			});	

		}

		$scope.enableEditQuestion = function(question){

			$scope.enuciado = question;

		}

		$scope.saveEditQuestion = function(newEnunciado) {

			var news = $scope.enuciado;

			questionAPI.setQuestion(news, newEnunciado).success(function(data) {

				delete $scope.newEnunciado;
				delete $scope.enunciado;
				loadQuestion();

			})

		}

		begin();


	}])


