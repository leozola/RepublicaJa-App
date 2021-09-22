(function(){
	"use strict";
	angular.module("myApp").config(function($stateProvider, $urlRouterProvider){
		//onde o app vai iniciar
		$urlRouterProvider.otherwise("/menu/home");
		
		//Rotas para navegação do app 
		$stateProvider
		.state("menu", {
			url:"/menu",
			templateUrl:"views/menu.html",
			abstract: true,
			controller: "initCtrl"
			
		})

		.state("menu.home", {
			url:"/home",
			views:{
				'menuContent':{
					templateUrl:"views/home.html", 
				}
			}
		})    

		.state("menu.userAnuncios", {
			url:"/userAnuncios",
			views:{
				'menuContent':{
					templateUrl:"views/userAnuncios.html", 
				}
			}
		}) 

		.state("menu.perfil", {
			url:"/perfil",
			views:{
				'menuContent':{
					templateUrl:"views/perfil.html",  
					controller: "initLogin"
				}
			}
		})  

		.state("menu.perfil.alteraCadastro", {
			url:"/alteraCadastro",
			templateUrl:"views/alteraCadastro.html"
		}) 

        .state("menu.anuncio", {
            url:"/anuncio", 
            views:{
                'menuContent':{
                    templateUrl:"views/anuncio.html"
                }
            }
        })  

		.state("menu.republica", {
			url:"/republica", 
			views:{
				'menuContent':{
					templateUrl:"views/republica.html"
				}
			}
		})

		.state("menu.vlogin", {
			url:"/vlogin", 
			views:{
				'menuContent':{
					templateUrl:"views/vlogin.html", 
					controller: "initLogin" 
				}
			}
		}) 

		.state("menu.login.cadastro", {
			url:"/cadastro",
			templateUrl:"views/cadastro.html"
		});
	});
})();