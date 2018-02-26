// importar
var express = require('express');
var sql = require('mssql');
var multer = require('multer');

// configura bd 
var config = {
    server: '192.168.20.71',
    database: 'MIAUTODHL',
    user: 'sa',
    password: 'S0p0rt3',
    port:1433
};
 
// instanciar
var app = express();
 
// ruteo

//APP_DHL_VALIDA_LOGIN
app.get('/Logea', function(req, res){
    ValidaLog(req,res);
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

		request
		.input ('App','1')
		.input ('Usuario',req.query.Usuario)
		.input ('Password',req.query.Password)
        .execute("APP_DHL_VALIDA_LOGIN").then(function (recordSet) { 
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

//APP_DHL_GET_VIN
app.get('/BuscarVin', function(req, res){
    var dbConn = new sql.Connection(config); 
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
		request
		.input ('Vin',req.query.Vin)
		.execute("APP_DHL_GET_VIN").then(function (recordSet) {
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
});

//APP_DHL_GET_DOCTOS
app.get('/BuscarDoctos', function(req, res){
    var dbConn = new sql.Connection(config); 
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
		request
		.input ('Vin',req.query.Vin)
		.execute("APP_DHL_GET_DOCTOS").then(function (recordSet) {
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
});




let UPLOAD_PATH = './uploads/';
 
// Multer Settings for file upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('destino');
        cb(null, UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        console.log('carga de archivo');
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
})
let upload = multer({ storage: storage })

app.post('/cargaimagen', upload.single('image'), (req, res, next) => {
	var dbConn = new sql.Connection(config); 
    dbConn.connect().then(function () {
        var request = new sql.Request(dbConn);
		request
		.input ('Vin',req.query.Vin)
		.execute("APP_DHL_GUARDADOCTO").then(function (recordSet) {
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
    
});


// escuchar
app.listen(4850);
console.log("Servidor MiAutoDHL 0.0.1 en el puerto 4850");


