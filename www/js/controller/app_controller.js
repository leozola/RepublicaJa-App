(function () {
	"use strict";

	angular.module("myApp").controller('initCtrl', function ($scope, Data, $ionicModal, $location, $ionicLoading, DBLocal, DBLoginDeUsuario) {
		$scope.avatar = "img/user.png";
		$scope.nome = "Entre com sua conta";
		$scope.anuncios = []; 
		$scope.myswipe = true;
		$scope.dadosUser = [];
		$scope.estados = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT",
						"MS", "MG", "PA", "PB", "PR", "PE", "PI",
						"RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
		
		$scope.pgLoginAnuncio = "#/menu/vlogin";
		$scope.pgLoginPerfil = "#/menu/vlogin";  
		$scope.pgLoginUserAd = "#/menu/vlogin"; 
		
		//Banco de dados Local
		DBLocal.localdb();
		//BD Login de Usuario
		DBLoginDeUsuario.initLogin();

		DBLoginDeUsuario.db.transaction(function (res) {
			var q = "SELECT * FROM LOGINUSUARIO";
			res.executeSql(q, null, function (i, data) {
				if (data.rows === null) {
					$scope.nome = "Entre com sua conta";
					$scope.pgLoginAnuncio = "#/menu/vlogin";
					$scope.pgLoginPerfil = "#/menu/vlogin"; 
					$scope.pgLoginUserAd = "#/menu/vlogin"; 

				}
				else {
					$scope.nome = data.rows.item(i).nome;
					$scope.pgLoginAnuncio = "#/menu/anuncio";
					$scope.pgLoginPerfil = "#/menu/perfil"; 
					$scope.pgLoginUserAd = "#/menu/userAnuncios"; 

					$scope.dadosUser = data.rows.item(i);
					$scope.id = parseInt(data.rows.item(i).idusuario);

				}

			});
		});

		//Deslogar
		$scope.sair = function () {
			DBLoginDeUsuario.db.transaction(function (res) {
				res.executeSql("DELETE FROM LOGINUSUARIO WHERE rowid = 1;")
				alert("Você saiu de sua conta!")
			})
			window.location = "index.html";
		};


		//Recupera os dados
		var getDados = function (busca) {
			var params = {
				local: busca,
				counter: $scope.anuncios.lenght,
				token: "kNe42mT57E220WfKB0qc3Go0hcAbv4j7"
			};

			Data.getData(params).success(function (data) {
				$scope.anuncios = data;   
				console.log(data);
				console.log(busca); 

			}).error(function (data) {
				console.log(data ? data : "Não foi possivel acessar o servidor");

			});

		};

		//Modal Altera Cadastro
		 $ionicModal.fromTemplateUrl('views/alteraCadastro.html',{
		 	scope: $scope,
		 	animation: 'slide-in-up'

		 }).then(function(modal) {
		 	$scope.modal = modal;
		 });

		 $scope.abreModal = function(){
		 	$scope.modal.show();
		 };

		 $scope.fechaModal = function(){
		 	$scope.modal.hide();
		 };

		//Modal Cadastro
		$ionicModal.fromTemplateUrl('views/cadastro.html', {
			scope: $scope,
			animation: 'slide-in-up'

		}).then(function (modalCad) {
			$scope.modalCad = modalCad;
		});

		$scope.abreModalCad = function () {
			$scope.modalCad.show();
		};

		$scope.fechaModalCad = function () {
			$scope.modalCad.hide();
		};

		//Atualiza pagina
		getDados();

		// Função de Cadastro de Usuario
		$scope.cadastroUsuario = function (cadastro) {
			Data.setData(cadastro).success(function (data) {
				alert(data);
				getDados();
				$scope.fechaModalCad();
			}).error(function (data) {
				alert(data);
			});

			console.log(cadastro);
		};

		//Função de anuncio de Republicas
		$scope.anunciarRep = function (anuncio) {
			 Data.setAnuncio(anuncio).success(function (data) {
			 	alert(data);
			 	getDados();
				window.location = "index.html";
			 }).error(function (data) {
			 	alert(data);
			 });
			 console.log(anuncio);
		};

		//Favotirar Republica
		// $scope.favoritaRepublica = function (fav) { 
		// 	DBLocal.db.transaction(function (res) {
		// 		res.executeSql("INSERT INTO FAVORITOS(idanuncio, nome, email, celular, telefone, titulo, descricao, data_anuncio, endereco, bairro, cidade, estado, cep) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?);", 
		// 					[fav.idanuncio, fav.nome, fav.email, fav.celular, fav.telefone, fav.titulo, fav.descricao, fav.data_anuncio, fav.endereco, fav.bairro, fav.cidade, fav.estado, fav.cep]);
		// 		alert("Anúncio salvo!");
		// 	});
		// 	console.log(fav);
		// };

		//Função de atualizar Cadastro
		$scope.atualizarCadastro = function () { 
			Data.setUpdate($scope.dadosUser).success(function (data) {
			 	alert(data);
			 	getDados(); 
				$scope.fechaModal();
			 }).error(function (data) {
			 	alert(data);
			 });
			 console.log($scope.dadosUser);
		};

		//Função de busca
		$scope.buscaRepublica = function (busca) {
			getDados(busca);
		}; 

		//Apagar anúncio 
		$scope.apagarAnuncio = function(dadosAnuncio) {
				 console.log(dadosAnuncio.idanuncio);   
				 navigator.notification.confirm(
				 	"Deseja apagar o anúncio?", 
				 	deletaAnuncio, 
				 	"Atenção", 
				 	["Apagar", "Cancelar"]
				 );  

				 function deletaAnuncio(buttonIndex) {
				 	if(buttonIndex === 1){
				 	Data.delData(dadosAnuncio.idanuncio).success(function(data){
				 				navigator.notification.alert(data?data:"Não foi possivel apagar este anúncio.", null,"Anúncio","OK"); 
				 				 getDados(); 
				 		}).error(function(data){
				 			navigator.notification.alert("Não foi possivel apagar este anúncio. Tente novamente.", null,"Anúncio","OK");
				 		});
				 	}
				 }
				
			};


		//Função para passar dados para outra pagina
		$scope.perfilRepublica = function (idanuncio) {
			$scope.republicaPerfil = $scope.anuncios.filter(function (element) {
				return element.idanuncio == idanuncio;

			});
			console.log($scope.republicaPerfil);
			$location.path("/menu/republica");
		};

		//alerts
		$scope.showAlert = function () {
			var alertPopup = $ionicPopup.alert({
				title: 'Don\'t eat that!',
				template: 'It might taste good'
			});

			alertPopup.then(function (res) {
				console.log('Thank you for not eating my delicious ice cream cone');
			});
		};



	});
})();