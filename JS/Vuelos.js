var urlVuelos = 'http://20.216.41.245:90/G6_20/Vuelos/controller/vuelo.php?op=Vuelos';
var urlInsrtVuelos = 'http://20.216.41.245:90/G6_20/Vuelos/controller/vuelo.php?op=InsertVuelo'
var urlVuelo = 'http://20.216.41.245:90/G6_20/Vuelos/controller/vuelo.php?op=Vuelo'
var urlDelVuelo = 'http://20.216.41.245:90/G6_20/Vuelos/controller/vuelo.php?op=DELVuelo'
var urlUpdVuelo =  'http://20.216.41.245:90/G6_20/Vuelos/controller/vuelo.php?op=UPVuelo' 

$(document).ready(function(){
   CargarVuelos()
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
            '<td>' +
            '<button class= "btn btn-info" onclick="CargarVuelo('+MiItems[i].cod_vuelo+')">Editar</button>'+
            '</td>'+
            '<td>' +
            '<button class= "btn btn-danger" onclick="EliminarVuelo('+MiItems[i].cod_vuelo+')">Eliminar</button>'+
            '</td>'+
            '</tr>' 
            

            $('#DataVuelos').html(Valores);
        }
       }
    });
}

function CargarVuelo(cod_vuelo){
    let datosvuelo={
        cod_vuelo: cod_vuelo
    };

    let datosvueloJson = JSON.stringify(datosvuelo)
    $.ajax({
        url: urlVuelo,
        type: 'POST',
        data: datosvueloJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            let MiItems = response;
            
            $('#codVuelo').val(MiItems[0].cod_vuelo);
            $('#c_Origen').val(MiItems[0].ciudad_origen);
            $('#c_Destino').val(MiItems[0].ciudad_destino);
            $('#fecha').val(MiItems[0].fecha_vuelo);
            $('#c_Pasajeros').val(MiItems[0].cantidad_pasajeros); 
            $('#t_Avion').val(MiItems[0].tipo_avion);
            $('#distancia').val(MiItems[0].distancia);
            let btnactualizar = '<br><br><input type="submit" id="btn_actualizar" onclick="ActualizarVuelo(' + MiItems[0].cod_vuelo+')"'+
            'value="Actualizar Vuelo" class="btn btn-primary">';
            $('#btnAgregar').html(btnactualizar)
        }
    }
 )};

function aggVuelo() {
    let datosvuelo = {
        id: $('#codVuelo').val(),
        origen: $('#c_Origen').val(),
        destino: $('#c_Destino').val(),
        fechaVuelo: $('#fecha').val(),
        cantidadPasajeros: $('#c_Pasajeros').val(),
        tipoAvion: $('#t_Avion').val(),
        distancia: $('#distancia').val()
    }

    let datosvueloJson = JSON.stringify(datosvuelo)
    $.ajax({
        url: urlInsrtVuelos,
        type:'POST',
        data: datosvueloJson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (reponse) {
            console.log(reponse)
            alert("Vuelo agregado con exito")
        },
        error: function(textStatus, errorThrown){
            alert("Error al agregar el vuelo "+textStatus+errorThrown)
        }
    })
alert("Aviso: ")
}

function ActualizarVuelo(id){
    let datosvuelo ={
        id: id,
        origen: $('#c_Origen').val(),
        destino: $('#c_Destino').val(),
        fechaVuelo: $('#fecha').val(),
        cantidadPasajeros: $('#c_Pasajeros').val(),
        tipoAvion: $('#t_Avion').val(),
        distancia: $('#distancia').val()
    };
 
    let datosvueloJson = JSON.stringify(datosvuelo);
    $.ajax({
     url: urlUpdVuelo,
     type:'PUT',
     data: datosvueloJson,
     datatype: 'JSON',
     contentType: 'application/json',
     success: function (reponse) {
         console.log(reponse);
         alert('Vuelo Actualizado con exito');
     },
     error: function(textStatus, errorThrown){
         alert('Error al Actualizar el vuelo'+ textStatus + errorThrown);
     }
    });
    alert("Aviso")
 }

 function EliminarVuelo(codigo){
    let datosvuelo={
        cod_vuelo: codigo
    };

    let datosvueloJson = JSON.stringify(datosvuelo)
    $.ajax({
        url: urlDelVuelo,
        type: 'DELETE',
        data: datosvueloJson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(reponse){
            console.log(reponse);
        }
    });
    alert("Vuelo Eliminado");
    CargarVuelos();
 };