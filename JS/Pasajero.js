var urlPasajeros = 'http://20.216.41.245:90/G6_20/Pasajero/controller/pasajero_vuelo.php?opc=GetPasajeros';

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
            var Valores = "";
            
            for(i=0; i< MiItems.length; i++){
            Valores+=  '<tr>' + 
            '<td>' + MiItems[i].CodigoPasajero +'</td>'+
            '<td>' + MiItems[i].Nombres +'</td>'+
            '<td>' + MiItems[i].Apellidos +'</td>'+
            '<td>' + MiItems[i].FechaDeRegistro +'</td>'+
            '<td>' + MiItems[i].Nacionalidad +'</td>'+
            '<td>' + MiItems[i].NumeroTelefonico +'</td>'+
            '<td>' + MiItems[i].Email +'</td>'+
            '</tr>' 

            $('#DataPasajeros').html(Valores);
        }
    }
    });
}