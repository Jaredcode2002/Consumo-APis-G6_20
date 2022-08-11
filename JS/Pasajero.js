var urlPasajeros = 'http://20.216.41.245:90/G6_20/Pasajero/controller/pasajero_vuelo.php?opc=GetPasajeros';
var urlInsertPasajero = 'http://20.216.41.245:90/G6_20/Pasajero/controller/pasajero_vuelo.php?opc=InsertPasajero';
var urlGetPasajero = 'http://20.216.41.245:90/G6_20/Pasajero/controller/pasajero_vuelo.php?opc=GetPasajero';
var urlUpdatePasajero = 'http://20.216.41.245:90/G6_20/Pasajero/controller/pasajero_vuelo.php?opc=UpdatePasajero';
var urlDeletePasajero = 'http://20.216.41.245:90/G6_20/Pasajero/controller/pasajero_vuelo.php?opc=DeletePasajero';

$(document).ready(function(){
   CargarPasajeros();
});

function CargarPasajeros(){
    $.ajax({
        url: urlPasajeros,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = '';
            
            for(i=0; i< MiItems.length; i++){
            Valores+=  '<tr>' + 
            '<td>' + MiItems[i].CodigoPasajero +'</td>'+
            '<td>' + MiItems[i].Nombres +'</td>'+
            '<td>' + MiItems[i].Apellidos +'</td>'+
            '<td>' + MiItems[i].FechaDeRegistro +'</td>'+
            '<td>' + MiItems[i].Nacionalidad +'</td>'+
            '<td>' + MiItems[i].NumeroTelefonico +'</td>'+
            '<td>' + MiItems[i].Email +'</td>'+
            '<td>' +
            '<button class= "btn btn-info" onclick="CargarPasajero('+MiItems[i].CodigoPasajero+')">Editar</button>'+
            '</td>'+
            '<td>' +
            '<button class= "btn btn-danger" onclick="EliminarPasajero('+MiItems[i].CodigoPasajero+')">Eliminar</button>'+
            '</td>'+
            '</tr>' 

            $('#DataPasajeros').html(Valores);
        }
    }
    });
}

function CargarPasajero(CodigoPasajero){
    var datospasajero={
        CodigoPasajero: CodigoPasajero
    };

    var datospasajeroJson = JSON.stringify(datospasajero)
    $.ajax({
        url: urlGetPasajero,
        type: 'POST',
        data: datospasajeroJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(reponse){
            var MiItems = reponse;
            
            $('#CodigoPasajero').val(MiItems[0].CodigoPasajero);
            $('#Nombres').val(MiItems[0].Nombres);
            $('#Apellidos').val(MiItems[0].Apellidos);
            $('#FechaDeRegistro').val(MiItems[0].FechaDeRegistro);
            $('#Nacionalidad').val(MiItems[0].Nacionalidad); 
            $('#NumeroTelefonico').val(MiItems[0].NumeroTelefonico);
            $('#Email').val(MiItems[0].Email);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarPasajero(' + MiItems[0].CodigoPasajero+')"'+
            'value="Actualizar Pasajero" class= "btn btn-primary"></input>';
            $('#btnagregarpasajero').html(btnactualizar);
        }
    }
 )};

 function EliminarPasajero(CodigoPasajero){
    var datospasajero={
        CodigoPasajero: CodigoPasajero
    };

    var datospasajeroJson = JSON.stringify(datospasajero)
    $.ajax({
        url: urlDeletePasajero,
        type: 'DELETE',
        data: datospasajeroJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(reponse){
            console.log(reponse);
        }
    });
    alert("Pasajero Eliminado");
    CargarPasajeros();
 };


function AgregarPasajero(){
    var datospasajero = {
        CodigoPasajero: $('#CodigoPasajero').val(),
        Nombres: $('#Nombres').val(),
        Apellidos: $('#Apellidos').val(),
        FechaDeRegistro: $('#FechaDeRegistro').val(),
        Nacionalidad: $('#Nacionalidad').val(),
        NumeroTelefonico: $('#NumeroTelefonico').val(),
        Email: $('#Email').val()
    };

    var datospasajeroJson = JSON.stringify(datospasajero)
    alert(datospasajeroJson);
    $.ajax({
        url: urlInsertPasajero,
        type:'POST',
        data: datospasajeroJson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (reponse) {
            console.log(reponse);
            alert('Pasajero agregado con exito');
        },
        error: function(textStatus, errorThrown){
            alert('Error al agregar el pasajero'+textStatus+errorThrown);
        }
    });
alert('Mmmm');
}

function ActualizarPasajero(CodigoPasajero){
   var datospasajero ={
    CodigoPasajero: CodigoPasajero,
    Nombres: $('#Nombres').val(),
    Apellidos: $('#Apellidos').val(),
    FechaDeRegistro: $('#FechaDeRegistro').val(),
    Nacionalidad: $('#Nacionalidad').val(),
    NumeroTelefonico: $('#NumeroTelefonico').val(),
    Email: $('#Email').val(),
   };

   var datospasajeroJson = JSON.stringify(datospasajero);
   alert(datospasajeroJson);
   $.ajax({
    url: urlUpdatePasajero,
    type:'PUT',
    data: datospasajeroJson,
    datatype: 'JSON',
    contentType: 'application/json',
    success: function (reponse) {
        console.log(reponse);
        alert('Pasajero Actualizado con exito');
    },
    error: function(textStatus, errorThrown){
        alert('Error al Actualizar el pasajero'+ textStatus + errorThrown);
    }
   });
alert('Mmmm');
}
