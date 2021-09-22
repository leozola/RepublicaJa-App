(function () {
	"use strict";

	angular.module("myApp").controller("initLogin", function ($scope, Data, $ionicModal, $location, DBLocal, DBLoginDeUsuario) {
		$scope.loginUsuario = function (login){ 
			
			Data.loginData(login).success(function(data){    
				var dadosUsuario = data; 
				console.log(dadosUsuario);
				if (data.permissao === false){
					alert(data ? data.erro : "Não foi possivel fazer o login. Tente novamente mais tarde.")
				}
				if (data.permissao === true){
					DBLoginDeUsuario.initLogin();
					alert("Você está logado, seja bem vindo!");
					DBLoginDeUsuario.db.transaction(function (req) {  
						req.executeSql("INSERT INTO LOGINUSUARIO(idusuario, nome, email, celular, telefone, data_user) VALUES(?,?,?,?,?,?);", [data.idusuario, data.nome, data.email, data.celular, data.telefone, data.data_user]) 
						window.location = "index.html";
					});
				}
			}); 
			
		};
	});
})();