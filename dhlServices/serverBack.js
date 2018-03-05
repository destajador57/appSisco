// importar
var express = require('express');
var sql = require('mssql');
var multer = require('multer');
var bodyParser = require('body-parser');


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
 
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// ruteo

//APP_DHL_VALIDA_LOGIN
app.get('/Logea', function(req, res){
    ValidaLog(req,res);
});

function regreso(id,mensaje,res){
	//console.log(id+' - '+mensaje);
	var SendObj = {"Status": id, "Msj": mensaje};
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
			regreso('false',err.message,res);
        });
    }).catch(function (err) {
		dbConn.close();
		regreso('false',err.message,res);
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
		   regreso('false',err.message,res);
        });
    }).catch(function (err) {
		dbConn.close();
		regreso('false',err.message,res);
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
		   regreso('false',err.message,res);
        });
    }).catch(function (err) {
		dbConn.close();
		regreso('false',err.message,res);
    });
});


//APP_DHL_GUARDA
app.post('/Guarda',function(req, res){
	
	var dbConn = new sql.Connection(config); 
	var respuestaM = [];
	dbConn.connect().then(function () {

		res.contentType('application/json');
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

		var bErr =false;
		for(var i=0; i<req.body.Doctos.length; i++){
			var request = new sql.Request(dbConn);
			request
			.input ('DoctoId',req.body.Doctos[i].DoctoId)
			.input ('ArchivoId',req.body.Doctos[i].ArchivoId)
			.input ('Vin',req.body.Vin)
			.execute("APP_DHL_GUARDA").then(function (recordSet) {
			}).catch(function (err) {
				console.log(err.message);
			});
		}

		var request = new sql.Request(dbConn);
		request
		.input ('Vin',req.body.Vin)
		.execute("APP_DHL_GET_VIN").then(function (recordSet) {
			var msj = JSON.stringify(recordSet[0][0]);
			res.send(msj);
			dbConn.close();
		}).catch(function (err) {
			console.log(err.message);
			res.send(JSON.stringify({"status": "False", "Msj": err.message}));
			dbConn.close();
		});
    }).catch(function (err) {
		dbConn.close();
		res.send(JSON.stringify({"status": "False", "Msj": err.mensaje}));
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
		.input ('DoctoId',req.query.DoctoId)
		.input('Extencion',req.query.Extencion)
		.execute("APP_DHL_GUARDADOCTO_APPDHL").then(function (recordSet) {
			//var msj = JSON.stringify();
			
			dbConn.close();
			res.contentType('application/json');
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
			console.log(recordSet[0][0].ArchivoId);
			res.send(recordSet[0][0].ArchivoId);
        }).catch(function (err) {
           dbConn.close();
		   regreso('false',err.message,res);
        });
    }).catch(function (err) {
		dbConn.close();
		regreso('false',err.message,res);
    });
    
});

app.get('/instrucciones', function (req, res) {

    let respuesta = { imagen: true };

    switch (req.query.tipoDocumento) {
        case "1":
            respuesta.imagen = true;
            respuesta.valor = 'http://189.204.141.193/Promociones/placa.jpg';
        case "2":
            respuesta.imagen = true;
            respuesta.valor = 'http://189.204.141.193/Promociones/placa.jpg';
            break;
        case "3":
            respuesta.imagen = false;
            respuesta.valor = ['Foto de cabina completa con la puerta del conductor abierta'];
            break;
        case "4":
            respuesta.imagen = false;
            respuesta.valor = ['Dar vuelta a la llave del switch para que encienda el tablero y entonces tomar la foto']
            break;
        case "5":
            respuesta.imagen = true;
            respuesta.valor = 'http://189.204.141.193/Promociones/motor.jpg';
            break;
        case "6":
            respuesta.imagen = true;
            respuesta.valor = 'http://189.204.141.193/Promociones/circulacion.jpg';
            break;
        case "7":
            respuesta.imagen = true;
            respuesta.valor = 'http://189.204.141.193/Promociones/verificacion.jpg';
            break;
        case "8":
            respuesta.imagen = false;
            respuesta.valor = ['Únicamente si aplica'];
            break;
        case "9":
            respuesta.imagen = false;
            respuesta.valor = [
                '1. Iniciar video con el celular ',
                '2. Encender la unidad',
                '3. Caminar hacia atrás realizando toma del número económico de la unidad, placa trasera y escape verificando si emite o no humo la unidad, todo sin cortar vídeo hasta finalizar. MAXIMO 30 SEGUNDOS',
				
            ];
            break;
        default:
            respuesta.imagen = false;
            respuesta.valor = [
                '1. Iniciar video con el celular',
                '2. Encender la unidad',
                '3. Realizar los cambios pertinentes en la caja de transmisión para verificar su buen funcionamiento, todo sin cortar vídeo hasta finalizar. MAXIMO 30 SEGUNDOS'
            ];
            break;
    }

	res.contentType('application/json');
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(respuesta);
});

// escuchar
app.listen(4850);
console.log("Servidor MiAutoDHL 0.0.1 en el puerto 4850");