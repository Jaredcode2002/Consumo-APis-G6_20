var urlVuelos = 'http://20.216.41.245:90/G6_20/Vuelos/controller/vuelo.php?op=Vuelos';

$(document).ready(function(){
   CargarVuelos();
});

function CargarVuelos(){
    $.ajax({
        url: urlVuelos,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores = "";
            
            for(i=0; i< MiItems.length; i++){
            Valores+=  '<tr>' + 
            '<td>' + MiItems[i].cod_vuelo +'</td>'+
            '<td>' + MiItems[i].ciudad_origen +'</td>'+
            '<td>' + MiItems[i].ciudad_destino +'</td>'+
            '<td>' + MiItems[i].fecha_vuelo +'</td>'+
            '<td>' + MiItems[i].cantidad_pasajeros +'</td>'+
            '<td>' + MiItems[i].tipo_avion +'</td>'+
            '<td>' + MiItems[i].distancia +'</td>'+
            '</tr>' 

            $('#DataVuelos').html(Valores);
        }
       }
    });
}