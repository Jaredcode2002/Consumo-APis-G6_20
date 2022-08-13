var urlReserva = 'http://20.216.41.245:90/G6_20/Reservas/controller/Servicio_Reserva.php?opc=GetReservas';
var urlInsertReserva = 'http://20.216.41.245:90/G6_20/Reservas/controller/Servicio_Reserva.php?opc=InsertReserva';
var urlGetReserva = 'http://20.216.41.245:90/G6_20/Reservas/controller/Servicio_Reserva.php?opc=GetReserva';
var urlUpdateReserva = 'http://20.216.41.245:90/G6_20/Reservas/controller/Servicio_Reserva.php?opc=UpdateReserva';
var urlEliminarReserva = 'http://20.216.41.245:90/G6_20/Reservas/controller/Servicio_Reserva.php?opc=DeleteReserva';

$(document).ready(function(){
    CargarReserva();
 });
 
 function CargarReserva(){
     $.ajax({
         url: urlReserva,
         type: 'GET',
         datatype: 'JSON',
         success: function(reponse){
             var MiItems = reponse;
             var Valores = '';
             
             for(i=0; i< MiItems.length; i++){
             Valores+=  '<tr>' + 
             '<td>' + MiItems[i].NumerodeReservacion +'</td>'+
             '<td>' + MiItems[i].CodigodeVuelo +'</td>'+
             '<td>' + MiItems[i].CodigodePasajero +'</td>'+
             '<td>' + MiItems[i].NombrePasajero +'</td>'+
             '<td>' + MiItems[i].NombreDestino +'</td>'+
             '<td>' + MiItems[i].FechadeVuelo +'</td>'+
             '<td>' + MiItems[i].PrecioVuelo +'</td>'+
             '<td>' +
             '<button class= "btn btn-info" onclick="CargarReservas('+MiItems[i].NumerodeReservacion+')">Editar</button>'+
             '</td>'+
             '<td>' +
             '<button class= "btn btn-danger" onclick="EliminarReserva('+MiItems[i].NumerodeReservacion+')">Eliminar</button>'+
             '</td>'+
             '</tr>'; 
 
             $('#DataReserva').html(Valores);
         }
     }
     });
 }

 function AgregarReserva(){
    var datosreserva = {
        NumerodeReservacion: $('#NumerodeReservacion').val(),
        CodigodeVuelo: $('#CodigodeVuelo').val(),
        CodigodePasajero: $('#CodigodePasajero').val(),
        NombrePasajero: $('#NombrePasajero').val(),
        NombreDestino: $('#NombreDestino').val(),
        FechadeVuelo: $('#FechadeVuelo').val(),
        PrecioVuelo: $('#PrecioVuelo').val()
    };
    var datosreservajson = JSON.stringify(datosreserva);

    $.ajax({
        url: urlInsertReserva,
        type: 'POST',
        data: datosreservajson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse);
            alert('Reserva Agregada Correctamente');
        },
        error: function(textStatus, errorThrown){
            alert('Error al agregar Reserva'+ textStatus + errorThrown);
        }
    });
    alert('Aviso');
 }

 function CargarReservas(NumerodeReservacion){
    var datosreserva={
        NumerodeReservacion: NumerodeReservacion
    };
    var datosreservajson = JSON.stringify(datosreserva);

    $.ajax({
        url: urlGetReserva,
        type: 'POST',
        data: datosreservajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(reponse){
            var MiItems = reponse;
            $('#NumerodeReservacion').val(MiItems[0].NumerodeReservacion);
            $('#CodigodeVuelo').val(MiItems[0].CodigodeVuelo);
            $('#CodigodePasajero').val(MiItems[0].CodigodePasajero);
            $('#NombrePasajero').val(MiItems[0].NombrePasajero);
            $('#NombreDestino').val(MiItems[0].NombreDestino); 
            $('#FechadeVuelo').val(MiItems[0].FechadeVuelo);
            $('#PrecioVuelo').val(MiItems[0].PrecioVuelo);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarReserva(' + MiItems[0].NumerodeReservacion+')"'+
            'value="Actualizar Reserva" class= "btn btn-primary"></input>';
            $('#btnagregarreserva').html(btnactualizar);
        }
    }
 )};

 function ActualizarReserva(NumerodeReservacion){
    var datosreserva ={
     NumerodeReservacion: NumerodeReservacion,
     CodigodeVuelo: $('#CodigodeVuelo').val(),
     CodigodePasajero: $('#CodigodePasajero').val(),
     NombrePasajero: $('#NombrePasajero').val(),
     NombreDestino: $('#NombreDestino').val(),
     FechadeVuelo: $('#FechadeVuelo').val(),
     PrecioVuelo: $('#PrecioVuelo').val(),
    };
    var datosreservajson = JSON.stringify(datosreserva);

    $.ajax({
     url: urlUpdateReserva,
     type:'PUT',
     data: datosreservajson,
     datatype: 'JSON',
     contentType: 'application/json',
     success: function (reponse) {
         console.log(reponse);
         alert('Reserva Actualizada');
     },
     error: function(textStatus, errorThrown){
         alert('Error al Actualizar la Reserva'+ textStatus + errorThrown);
     }
    });
 alert('Aviso');
 }

 function EliminarReserva(NumerodeReservacion){
    var datosreserva={
        NumerodeReservacion: NumerodeReservacion
    };

    var datosreservajson = JSON.stringify(datosreserva)
    $.ajax({
        url: urlEliminarReserva,
        type: 'DELETE',
        data: datosreservajson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(reponse){
            console.log(reponse);
        }
    });
    alert("Reserva Eliminada");
    CargarReserva();
 };