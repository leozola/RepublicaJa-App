(function(){ 
	"use strict"; 

	angular.module("myApp").value("Config", {
		
		getUrl: "http://apprepublicaja.esy.es/apirepublicaja/v1/"

	});

	angular.module("myApp").service("Data",function($http, Config){
		//Recupera os anuncios
		this.getData = function(params){
			
			return $http({
					method: "POST",
					url: Config.getUrl + "recuperaAnuncios.php", 
					data: params, 
					headers:{
						'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
					} 
				});
		};   
		
		//Login
		this.loginData = function(credential){
			
			return $http({
					method: "POST",
					url: Config.getUrl + "apiLogin.php", 
					data: credential, 
					headers:{
						'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
					} 
				});
		}; 
		
		//Cadastro de Usuarios
		this.setData = function(dados){
			return $http({
					method: "POST",
					url: Config.getUrl + "cadastroUsuario.php", 
					data: dados,
					headers:{
						'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
					} 
				});
		};   
		
		//Deleta anúncio 
		 this.delData = function(idanuncio){
		 	return $http({
		 			method: "POST",
		 			url: Config.getUrl + "deletaAnuncio.php", 
		 			data: idanuncio,
		 			headers:{
		 				'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
		 			} 
		 		});
		 };
		
		//Anuncia República
		this.setAnuncio = function(dadosAnuncio){
			return $http({
					method: "POST",
					url: Config.getUrl + "anunciaRep.php", 
					data: dadosAnuncio,
					headers:{
						'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
					} 
				}); 
		};
		
		//Atualiza Cadastro
		this.setUpdate = function(usuario){
			
			return $http({
					method: "POST",
					url: Config.getUrl + "atualizaCadastro.php", 
					data: usuario,
					headers:{
						'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
					} 
				});
		};
	});
})();