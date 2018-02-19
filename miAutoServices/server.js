// importar
var express = require('express');
var sql = require('mssql');
var distance = require('google-distance-matrix');
var mailCtrl = require('./mailCtrl')


// configura bd 
var config = {
    server: '192.168.20.71',
    database: 'MIAUTO',
    user: 'sa',
    password: 'S0p0rt3',
    port:1433
};
 
// instanciar
var app = express();
 
// ruteo

//APP_CITAS_VALIDA_LOGIN
app.get('/Logea', function(req, res){
  // console.log(req);
   ValidaLog(req,res);
});

//APP_CITAS_REGISTRAR_USUARIO
app.get('/Registra', function(req, res){
   var dbConn = new sql.Connection(config); 
   var uss = '0';
   //console.log(req.query.user+' - '+req.query.password+' - '+req.query.vin+' - '+req.query.placas);
     dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
		
		request
		.input ('nombreUsuario',req.query.user)
		.input ('contrasenia',req.query.password)
		.input ('vin',req.query.vin)
		.input ('placas',req.query.placas)
        .execute("APP_CITAS_REGISTRAR_USUARIO").then(function (recordSet) { 
			var msj =recordSet[0][0].mensaje;
			// console.log(recordSet);
			dbConn.close();
			if(msj === 'Usuario Registrado')
				 ValidaLog(req,res);
			else
				regreso('0','sql:'+msj,res);
        }).catch(function (err) {
           dbConn.close();
		   regreso('0','err erv:'+err.message,res);
        });
    }).catch(function (err) {
		dbConn.close();
		regreso('0',err.message,res);
    });
});

function regreso(id,mensaje,res){
	//console.log(id+' - '+mensaje);
	var SendObj = {"idUsr": id, "Msj": mensaje};
	var stringData = JSON.stringify(SendObj);
		  
	// Indicamos el tipo de contenido a devolver en las cabeceras de nuestra respuesta
	res.contentType('application/json');
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
	res.send(stringData);
}

function ValidaLog(req,res){
	var dbConn = new sql.Connection(config); 
	dbConn.connect().then(function () {
		var request = new sql.Request(dbConn);
		request.input ('nombreUsuario',req.query.user)
		.input ('contrasenia',req.query.password)
        .execute("APP_CITAS_VALIDA_LOGIN").then(function (recordSet) { 
			var msj = JSON.stringify(recordSet[0][0]);
			dbConn.close();
			res.contentType('application/json');
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			
			res.send(msj);
        }).catch(function (err) {
           dbConn.close();
			regreso('0',err.message,res);
        });
    }).catch(function (err) {
		dbConn.close();
		regreso('0',err.message,res);
    });
}

//APP_CITAS_GET_UNIDADES
app.get('/GetUnidades', function(req, res){
    var dbConn = new sql.Connection(config); 
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
		
		request
		.input ('idUsuario',req.query.idUser)
		.execute("APP_CITAS_GET_UNIDADES").then(function (recordSet) { 
			var msj = JSON.stringify(recordSet[0]);
			dbConn.close();
			res.contentType('application/json');
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
			res.send(msj);
        }).catch(function (err) {
           dbConn.close();
		   regreso('0',err.message,res);
        });
    }).catch(function (err) {
		dbConn.close();
		regreso('0',err.message,res);
    });
});


function _Taller(){
	this.idProveedor = "";
	this.nombreComercial = "";
	this.idTaller = "";
	this.razonSocial = "";
	this.RFC = "";
	this.direccion = "";
	this.latitud = "";
	this.longitud = "";
	this.nombre = "";
	this.calificacionTaller = "";
	this.km = "";
	this.order = 0;
}

function kilometros() {
	this.longitud = 0;
	this.latitud = 0;
	this.kilometros = -1;
}

var talleres = []; 

//APP_CITAS_GET_TALLERES
app.get('/GetTalleres', function(req, res){
    var dbConn = new sql.Connection(config); 
	talleres = []; 
	var origins = [req.query.lat + ',' + req.query.lng];
	var destinations = [];
	
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
		request
		.input ('idUnidad',req.query.idUnidad)
		.execute("APP_CITAS_GET_TALLERES").then(function (recordSet) {
			for(var i=0; i<recordSet[0].length; i++){
				var taller = new _Taller();
				taller.idProveedor = recordSet[0][i].idProveedor;
				taller.nombreComercial = recordSet[0][i].nombreComercial;
				taller.idTaller = recordSet[0][i].idTaller;
				taller.razonSocial = recordSet[0][i].razonSocial;
				taller.RFC = recordSet[0][i].RFC;
				taller.direccion = recordSet[0][i].direccion;
				taller.latitud = recordSet[0][i].latitud;
				taller.calificacionTaller = recordSet[0][i].calificacionTaller;
				taller.order = i;
				var longi = recordSet[0][i].longitud;
				if(parseFloat(longi)>0){
					longi = '-'+longi;
				}
				taller.longitud = longi;
				talleres.push(taller);
				destinations.push(taller.latitud + ',' + taller.longitud);
			}
			dbConn.close();
			computeTotalDistance(origins,destinations,res,0);
        }).catch(function (err) {
           dbConn.close();
		   regreso('0',err.message,res);
        });
    }).catch(function (err) {
		dbConn.close();
		regreso('0',err.message,res);
    });
});

function computeTotalDistance(origins,destinations,res,noInt) {
	distance.key('AIzaSyBfaZuXKdq-hdz8G7QAWUQ7WvVkmK_Ys3k');
	distance.mode('driving');
	var Nerr=99999;
	
	distance.matrix(origins, destinations, function (err, distances) {
		if(distances !=null && distances !=undefined){
			if (distances.status == 'OK') {
				for (var i=0; i < origins.length; i++) {
					for (var j = 0; j < destinations.length; j++) {
						if(distances.rows[0].elements.length >0){
							if (distances.rows[0].elements[j].status == 'OK') {
								var distance = distances.rows[i].elements[j].distance.text;
								talleres[j].km = distance;
								talleres[j].order = parseInt(distance.split(" ")[0]);// guardo los kilometros en entero para ordenar
							} else { 
								talleres[i].km  = ' - '; 
								talleres[j].order = Nerr;
								Nerr = Nerr +1;
							}
						}
					}
				}
			}
		// ordenamos los talleres por distancia
			talleres.sort(function (a, b) {
				if (a.order > b.order) { return 1; }
				if (a.order < b.order) { return -1;}
				return 0;
			});
			LimpiayRespondeKM(res);
		}else if(noInt < 2){
			noInt = noInt + 1;
			computeTotalDistance(origins,destinations,res,noInt);
		} else{
			LimpiayRespondeKM(res);
		}
	});
}

function LimpiayRespondeKM(res){
	var respuesta = [];	
	for(var i=0; i<talleres.length; i++){
		if (talleres[i].order < 99999) respuesta.push(talleres[i]);
	}
	res.contentType('application/json');
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	res.send(respuesta);
}
//APP_CITAS_GET_ORDENES_POR_UNIDAD
app.get('/GetOrdXUni', function(req, res){
    var dbConn = new sql.Connection(config); 
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
		request
		.input ('idUnidad',req.query.idUnidad)
		.execute("APP_CITAS_GET_ORDENES_POR_UNIDAD").then(function (recordSet) { 
			var msj = JSON.stringify(recordSet[0]);
			
			dbConn.close();
			res.contentType('application/json');
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
			res.send(msj);
        }).catch(function (err) {
           dbConn.close();
		   regreso('0',err.message,res);
        });
    }).catch(function (err) {
		dbConn.close();
		regreso('0',err.message,res);
    });
});

//[GPS].[SEL_KILOMETROS_SP]
app.get('/GetKilometros', function(req, res){
    var dbConn = new sql.Connection(config); 
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
		request
		.input ('vin',req.query.vin)
		.execute("[GPS].[SEL_KILOMETROS_SP]").then(function (recordSet) { 
			var kilOtro = JSON.stringify(recordSet[0]);

			var kil = new kilometros();
			if(recordSet[0] && recordSet[0].length>0){
				kil.longitud = recordSet[0][0].longitud;
				kil.latitud = recordSet[0][0].latitud;
				kil.kilometros = recordSet[0][0].kilometros;
			}

			dbConn.close();
			res.contentType('application/json');
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
			res.send(kil);
        }).catch(function (err) {
           dbConn.close();
		   regreso('0',err.message,res);
        });
    }).catch(function (err) {
		dbConn.close();
		regreso('0',err.message,res);
    });
});

//APP_CITAS_GET_DOCUMENTOS_UNIDAD
app.get('/GetDocsXUni', function(req, res){
    var dbConn = new sql.Connection(config); 
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
		request
		.input ('idUnidad',req.query.idUnidad)
		.execute("APP_CITAS_GET_DOCUMENTOS_UNIDAD").then(function (recordSet) { 
			var msj = JSON.stringify(recordSet[0]);
			res.contentType('application/json');
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
			res.send(msj);
        }).catch(function (err) {
           dbConn.close();
		   regreso('0',err.message,res);
        });
    }).catch(function (err) {
		dbConn.close();
		regreso('0',err.message,res);
    });
});


//APP_CITAS_GET_CONFIGURACION
app.get('/GetConfiguracion', function(req, res){
   var dbConn = new sql.Connection(config); 
   var uss = '0';
   dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
		
		request
		.input ('idConfiguracion',req.query.idConfiguracion)
	    .execute("APP_CITAS_GET_CONFIGURACION").then(function (recordSet) { 
			var msj =recordSet[0][0].configuracion;
			var SendObj = {"configuracion": msj};
			var stringData = JSON.stringify(SendObj);
				  
			// Indicamos el tipo de contenido a devolver en las cabeceras de nuestra respuesta
			res.contentType('application/json');
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
			res.send(stringData);
        }).catch(function (err) {
           dbConn.close();
		   res.contentType('application/json');
		   res.header("Access-Control-Allow-Origin", "*");
		   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
		   res.send("Error: "+ err.message);
        });
    }).catch(function (err) {
		dbConn.close();
		res.contentType('application/json');
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
		res.send("Error: "+ err.message);
    });
});

//APP_CITAS_GET_PRMOCION
app.get('/GetPromocion', function(req, res){
	var dbConn = new sql.Connection(config); 
	var uss = '0';
	dbConn.connect().then(function () {
		 var request = new sql.Request(dbConn);
		 
		 request
		 .input ('marca',req.query.marca)
		 .input ('submarca',req.query.submarca)
		 .execute("APP_CITAS_GET_PRMOCION").then(function (recordSet) {
			 var stringData = JSON.stringify(recordSet[0]);
			 // Indicamos el tipo de contenido a devolver en las cabeceras de nuestra respuesta
			 res.contentType('application/json');
			 res.header("Access-Control-Allow-Origin", "*");
			 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   
			 res.send(stringData);
		 }).catch(function (err) {
			dbConn.close();
			res.contentType('application/json');
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   
			res.send("Error: "+ err.message);
		 });	
	 }).catch(function (err) {
		 dbConn.close();
		 res.contentType('application/json');
		 res.header("Access-Control-Allow-Origin", "*");
		 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   
		 res.send("Error: "+ err.message);
	 });
 });


//APP_CITAS_NUEVA_CITA
app.get('/ServicioNuevaCita', function(req, res){
    var dbConn = new sql.Connection(config); 
	   dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
		
		request
		.input ('idUnidad',req.query.idUnidad)
		.input ('idContratoOperacion',req.query.idContratoOperacion)
		.input ('idUsuario',req.query.idUsuario)
		.input ('idTaller',req.query.idTaller)
		.input ('idServicio',req.query.idServicio)
		.input ('fechaCita',req.query.fechaCita)
		.execute("APP_CITAS_NUEVA_CITA").then(function (recordSet) { 
			var msj = JSON.stringify(recordSet[0]);
			dbConn.close();
			res.contentType('application/json');
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
			res.send(msj);
        }).catch(function (err) {
           dbConn.close();
		   regreso('0','Err1:'+err.message,res);
        });
    }).catch(function (err) {
		dbConn.close();
		regreso('0','Err2:'+err.message,res);
    });
});

//APP_CITAS_GET_SERVICIOS
app.get('/CitaServicios', function(req, res){
    var dbConn = new sql.Connection(config); 
	   dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
		
		request
		.execute("APP_CITAS_GET_SERVICIOS").then(function (recordSet) { 
			var msj = JSON.stringify(recordSet[0]);
			dbConn.close();
			res.contentType('application/json');
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
			res.send(msj);
        }).catch(function (err) {
           dbConn.close();
		   regreso('0','Err1:'+err.message,res);
        });
    }).catch(function (err) {
		dbConn.close();
		regreso('0','Err2:'+err.message,res);
    });
});


//APP_CITAS_CALIFICAR_TALLER
app.get('/CalificaTaller', function(req, res){
    var dbConn = new sql.Connection(config); 
	   dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
		request
		.input ('idOrden',req.query.idOrden)
		.input ('calificacion1',req.query.calificacion1)
		.input ('calificacion2',req.query.calificacion2)
		.input ('calificacion3',req.query.calificacion3)
		.input ('calificacion4',req.query.calificacion4)
		.input ('calificacion5',req.query.calificacion5)
		.execute("APP_CITAS_CALIFICAR_TALLER").then(function (recordSet) { 
			var msj = JSON.stringify(recordSet[0]);
			dbConn.close();
			res.contentType('application/json');
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  		res.send(msj);
        }).catch(function (err) {
           dbConn.close();
		   regreso('0','Err1:'+err.message,res);
        });
    }).catch(function (err) {
		dbConn.close();
		regreso('0','Err2:'+err.message,res);
    });
});

// APP_CITAS_RECUPERA_PSW

app.get('/RecuperaPsw', function(req, res){
    var dbConn = new sql.Connection(config); 
	   dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
		request
		.input ('idUsuario',req.query.idUsuario)
		.input ('placas',req.query.placas)
		.execute("APP_CITAS_RECUPERA_PSW").then(function (recordSet) { 
			var email = recordSet[0][0].email;
			var psw = recordSet[0][0].psw;
			var SendObj = {"status":"no","msg": "Ocurrio un error en el envió, intentar más tarde."};
			if(email == 'NO' || email ==''){
				SendObj = {"status":"no","msg": "Los datos no concuerdan verificar."};
			}else  if(email ==''){
				SendObj = {"status":"no","msg": "No hay email registrado."};
			}else {
				var mail = {
					"body":"Usted ha intentado recuperar su contraseña en la App. Esta es: "+ psw,
					"email":email,
				},resp;

				mailCtrl.sendEmail(mail,resp);
				SendObj = {"status":"ok","msg": "La contraseña se envió a: "+email};
			}
			var msj = JSON.stringify(SendObj);
			dbConn.close();
			res.contentType('application/json');
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  		res.send(msj);
        }).catch(function (err) {
           dbConn.close();
		   regreso('0','Err1:'+err.message,res);
        });
    }).catch(function (err) {
		dbConn.close();
		regreso('0','Err2:'+err.message,res);
    });
});

// escuchar
app.listen(4800);
console.log("Servidor MiAuto 0.0.1 en el puerto 4800");


