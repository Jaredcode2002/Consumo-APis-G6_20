var UrlAviones = 'http://20.216.41.245:90/G6_20/Avion/controller/avion.php?op=Aviones';
var UrlInsertAvion= 'http://20.216.41.245:90/G6_20/Avion/controller/avion.php?op=InsertAvion';
var Urlavion= 'http://20.216.41.245:90/G6_20/Avion/controller/avion.php?op=avion';
var UrlGetAvion='http://20.216.41.245:90/G6_20/Avion/controller/avion.php?op=UpdateAvion';
var UrlDeleteAvion='http://20.216.41.245:90/G6_20/Avion/controller/avion.php?op=DeleteAvion';

$(document).ready(function(){
   Cargaraviones();
});

function Cargaraviones(){
    $.ajax({
        url:UrlAviones,
        type:'GET',
        datatype:'JSON',
        success:function(reponse){
           var MiItems = reponse;
           var Valores= "";

           for(i=0; i < MiItems.length; i ++){
               Valores += '<tr>'+
               '<td>'+ MiItems[i].Numero_avion+'</td>'+
               '<td>'+ MiItems[i].Tipo_avion+'</td>'+
               '<td>'+ MiItems[i].Horas_de_vuelo+'</td>'+
               '<td>'+ MiItems[i].Capacidad_pasajeros+'</td>'+
               '<td>'+ MiItems[i].Fecha_primer_vuelo+'</td>'+
               '<td>'+ MiItems[i].Pais_construcción+'</td>'+
               '<td>'+ MiItems[i].Cantidad_de_Vuelos+'</td>'+
               '<td>'+
               '<button class="btn btn-info" onclick="Cargaravion('+ MiItems[i].Numero_avion+')">Editar</button'+
               '<td>'+
               '<td>'+
               '<button class="btn btn-danger" onclick="Eliminaraviones('+ MiItems[i].Numero_avion+')">Eliminar</button'+
               '<td>'+
           '</tr>';
           $('#DataAviones').html(Valores);
           }
        }

    });
}

function AgregarAvion(){
  var datosavion = {
 id:$('#Numero_avion').val(),
 Tipo_avion:$('#Tipo_avion').val(),
 Horas_de_vuelo:$('#Horas_de_vuelo').val(),
 Capacidad_pasajeros:$('#Capacidad_pasajeros').val(),
 Fecha_primer_vuelo:$('#Fecha_primer_vuelo').val(),
 Pais_construcción:$('#Pais_construcción').val(),
 Cantidad_de_Vuelos:$('#Cantidad_de_Vuelos').val()
  };
  var datosavionjson = JSON.stringify(datosavion)

  $.ajax({
    url:UrlInsertAvion,
    type:'POST',
    data: datosavionjson,
    datatype:'JSON',
    contenttype:'aplication/json',
    success:function(reponse){
        console.log(reponse);
        alert('Avion Agregado con Exito');
    },
    error:function(textStatus, errorThrown){
        alert('Error al agregar Avion'+ textStatus+errorThrown)
    }

  });
  alert('Aviso');
}

function Cargaravion(Numero_avion){
    var datosavion={
        id:Numero_avion
    };
    var datosavionjson = JSON.stringify(datosavion);

    alert(datosavionjson);
    $.ajax({
        url:Urlavion,
        type:'POST',
        data: datosavionjson,
        datatype:'JSON',
        contenttype: 'application/json',
        success:function(reponse){
           var MiItems = reponse;
           $('#Numero_avion').val(MiItems[0].Numero_avion);
           $('#Tipo_avion').val(MiItems[0].Tipo_avion);
           $('#Horas_de_vuelo').val(MiItems[0].Horas_de_vuelo);
           $('#Capacidad_pasajeros').val(MiItems[0].Capacidad_pasajeros);
           $('#Fecha_primer_vuelo').val(MiItems[0].Fecha_primer_vuelo);
           $('#Pais_construcción').val(MiItems[0].Pais_construcción);
           $('#Cantidad_de_Vuelos').val(MiItems[0].Cantidad_de_Vuelos)
           var btnactualizar='<input type="submit" id="btnactualizar" onclick="ActualizarAvion('+ MiItems[0].Numero_avion+')"'+
           'value= "ActualizarAvion" class="btn btn-primary"></input>';
           $('#btnagregaravion').html(btnactualizar);
        }
    });
           
}

function ActualizarAvion(Numero_avion){
    var datosavion={
    id:Numero_avion,
 
 Tipo_avion:$('#Tipo_avion').val(),
 Horas_de_vuelo:$('#Horas_de_vuelo').val(),
 Capacidad_pasajeros:$('#Capacidad_pasajeros').val(),
 Fecha_primer_vuelo:$('#Fecha_primer_vuelo').val(),
 Pais_construcción:$('#Pais_construcción').val(),
 Cantidad_de_Vuelos:$('#Cantidad_de_Vuelos').val() 
    };
    var datosavionjson= JSON.stringify(datosavion)
    alert(datosavionjson)
    $.ajax({
        url:UrlGetAvion,
        type:'PUT',
        data:datosavionjson,
        datatype:'JSON',
        contenttype:'aplication/json',
        success:function(reponse){
            console.log(reponse);
            alert("Avion Actualizado");
        },
        error:function(textStatus, errorThrown){
            alert('Error al Actualizar Avion'+ textStatus + errorThrown)
        }
    });
    alert('Aviso');
}

function Eliminaraviones(Numero_avion){
    var datosavion={
        
        id:Numero_avion
    };
    var datosavionjson = JSON.stringify(datosavion);
alert(datosavionjson);
    $.ajax({
        url:UrlDeleteAvion,
        type:'DELETE',
        data:datosavionjson,
        datatype:'JSON',
        contenttype:'aplication/json',
        success:function(reponse){
            console.log(reponse);
        }
    });
    alert("Avion Eliminado");
    Cargaraviones();
}