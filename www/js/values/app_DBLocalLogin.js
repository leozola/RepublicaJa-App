(function(){
    "use strict"; 
    
    angular.module("myApp").value("DBLoginDeUsuario", { 
            db:null,  
            
            initLogin: function () {
                var size = 2 * 1024 * 1024;
                this.db = window.openDatabase("LOGINUSUARIO", "1.0", "Banco Local", size);

                this.db.transaction(function (res) {
                    //res.executeSql('DROP TABLE LOGINUSUARIO');
                    res.executeSql("CREATE TABLE IF NOT EXISTS LOGINUSUARIO(idusuario TEXT, nome TEXT, email TEXT, celular TEXT, telefone TEXT, data_user TEXT);", []);
                });

            }

    })
})();