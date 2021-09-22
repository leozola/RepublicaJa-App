(function(){
    "use strict"; 

    angular.module("myApp").value("DBLocal", {
            db:null, 
            
            localdb: function () {
                this.db = window.openDatabase("dbLocal", "1.0", "Banco Local", 2000);

                this.db.transaction(function (res) { 
                    res.executeSql('DROP TABLE FAVORITO');
                    res.executeSql("CREATE TABLE IF NOT EXISTS FAVORITOS(idanuncio TEXT, nome TEXT, email TEXT, celular TEXT, telefone TEXT, titulo TEXT, descricao TEXT, data_anuncio TEXT, endereco TEXT, bairro TEXT, cidade TEXT, estado TEXT, cep TEXT);", []);
                });

            }

    })
})();