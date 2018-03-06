var DashView = require('../views/reference'),
    ModelView = require('../models/dataAccess');
// fs = require("fs");

// var pathSave = "C:\\Desarrollo\\AndradeCMSDocumentos\\public\\promociones\\";
// var prefijoPromo = "Promo_";

var dash = function (conf) {
    this.conf = conf || {};
    this.view = new DashView();
    this.model = new ModelView({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
}

dash.prototype.get_autoAll = function (req, res, next) {
    var self = this;
    // var table = req.query.table;
    // console.log("Query", req.query);
    var params = [];

    this.model.query("WEB_DHL_GET_UNIDADES", params, function (error, result) {

        console.log(error);
        console.log(result);

        // console.log( result );
        if (result.length > 0) {
            //console.log( "Resultado: " + result );
        }
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

// "api/dash/getcomentariobyid"
dash.prototype.get_getcomentariobyid = function (req, res, next) {
    var self = this;
    var idUnidad = req.query.idUnidad;
    //console.log('QueryString = ' + req.query);

    var params = [
        { name: 'idUnidad', value: idUnidad, type: self.model.types.INT }
    ];

    this.model.query('WEB_DHL_GET_COMUNIDAD', params, function (error, result) {
        //console.log('Parametros: ' + params);
        if (result.length > 0) {
            // console.log("resultaaaaaaa " + result[0]);
        }
        self.view.expositor(res, {
            error: error,
            result: result,
        });
    });
};

module.exports = dash;