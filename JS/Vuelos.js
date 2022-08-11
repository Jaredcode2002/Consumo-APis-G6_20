var urlVuelos = 'http://20.216.41.245:90/G6_20/Vuelos/controller/vuelo.php?op=Vuelos';
var urlInsrtVuelos = 'http://20.216.41.245:90/G6_20/Vuelos/controller/vuelo.php?op=InsertVuelo'

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
            '</tr>' 

            $('#DataVuelos').html(Valores);
        }
       }
    });
}

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
    alert(datosvueloJson);
    $.ajax({
        url: urlInsrtVuelos,
        type:'POST',
      data: datosvueloJson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function (response) {
            console.log(response)
            alert("Vuelo agregado con exito")
        },
        error: function(textStatus, errorThrown){
            alert("Error al agregar el vuelo "+textStatus+errorThrown)
        }
    })
alert("Aviso: ")
}

//Mostrar o no el formulario de insertar
var mostrarI = false
const mostrarInsert = document.getElementById("insert").addEventListener("click",() => {
    if (mostrarI ==false) {
        document.getElementById("insertZone").style.visibility = "visible"
        mostrarI=true
    } else {
        document.getElementById("insertZone").style.visibility = "hidden"
        mostrarI=false
    }
})