function objetoCategoria() {
	var x = document.getElementById("verObjetosCategoria");
    x.style.display = "block";
	var x = document.getElementById("verObjetosClient");
    x.style.display = "none";
	var x = document.getElementById("verObjetosMotos");
    x.style.display = "none";
	var x = document.getElementById("verObjetosMensajes");
    x.style.display = "none";
	var x = document.getElementById("verObjetosReservas");
    x.style.display = "none";
	traerInfoCategoria();
	

}

function objetoMotos() {
    var x = document.getElementById("verObjetosMotos");
    x.style.display = "block";
	var x = document.getElementById("verObjetosClient");
    x.style.display = "none";
	var x = document.getElementById("verObjetosCategoria");
    x.style.display = "none";
	var x = document.getElementById("verObjetosMensajes");
    x.style.display = "none";
	var x = document.getElementById("verObjetosReservas");
    x.style.display = "none";
	traerInformacionMoto();
}

function objetoClientes() {
	var x = document.getElementById("verObjetosClient");
    x.style.display = "block";
	var x = document.getElementById("verObjetosMotos");
    x.style.display = "none";
	var x = document.getElementById("verObjetosCategoria");
    x.style.display = "none";
	var x = document.getElementById("verObjetosMensajes");
    x.style.display = "none";
	var x = document.getElementById("verObjetosReservas");
    x.style.display = "none";
	traerInformacionClient();

}

function objetoMensajes() {
	var x = document.getElementById("verObjetosMensajes");
    x.style.display = "block";
	var x = document.getElementById("verObjetosMotos");
    x.style.display = "none";
	var x = document.getElementById("verObjetosCategoria");
    x.style.display = "none";
	var x = document.getElementById("verObjetosClient");
    x.style.display = "none";
	var x = document.getElementById("verObjetosReservas");
    x.style.display = "none";
	traerInfoMensjaes();

}

function objetoReservas() {
	var x = document.getElementById("verObjetosReservas");
    x.style.display = "block";
	var x = document.getElementById("verObjetosMotos");
    x.style.display = "none";
	var x = document.getElementById("verObjetosCategoria");
    x.style.display = "none";
	var x = document.getElementById("verObjetosClient");
    x.style.display = "none";
	var x = document.getElementById("verObjetosMensajes");
    x.style.display = "none";
	traerInfoReservas();

}


//MOTORBIKE FUCTION ---------------------

function traerInformacionMoto(){
	$.ajax({    
    url : 'http://168.138.151.224/api/Motorbike/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#resultadoMoto").empty();
        let miTabla ="<table style='border:1px solid black'><tr><td style='width: 200px; color: red; text-align: center;'>NAME</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>BRAND</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>YEAR</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>DESCRIPCION</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>CATEGORY</td></tr>";
			miTabla +="<tr><td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td></tr>"; 
		for (i=0; i<respuesta.length; i++){
			miTabla += '<tr>';
	        miTabla += "<td style='text-align: center;'>"+ respuesta[i].name+ '</td>'; 		
	        miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].brand+ '</td>'; 		
	        miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].year+ '</td>'; 		
	        miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].description+ '</td>'; 		
	        miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].category.name+ '</td>'; 				
			miTabla += '</tr>';
		}
        miTabla += '</table>';
	    $("#resultadoMoto").append(miTabla);
		$("#nameMoto").val("");
		$("#brandMoto").val("");
		$("#yearMoto").val("");
		$("#descripMoto").val("");
		pintarSelectMotoCat();
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
});
}

function pintarSelectMotoCat(){
	$.ajax({    
    url : 'http://168.138.151.224/api/Category/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#categoriaMoto").empty();
		miSelect = '<option value="">Elige una opción</option>';
		//miSelect += '<option id="" ></option>';
		for (i=0; i<respuesta.length; i++){
	        miSelect += '<option value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>'; 		
		}
	    $("#categoriaMoto").append(miSelect);    

	},
    error : function(xhr, status) {
        alert('ha sucedido un problema en cargar las categorias:'+ status);
    }
});
	
}

function guardarInfoMoto(){
	let selected = $("#categoriaMoto").children(":selected").attr("value");
	if (selected.length > 0) {
	
	let misDatos = {

        brand: $("#brandMoto").val(),
        model: $("#model").val(),
        year: $("#yearMoto").val(),
        name: $("#nameMoto").val(),
		category:{id:selected},
		description: $("#descripMoto").val()
		
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://168.138.151.224/api/Motorbike/save',
	{data: datosJson,
    type : 'POST',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Guardado!");
        	traerInformacionMoto();	
			}
		}
	});
	}
	else
	{
		alert('Debe escoger categoria');
    }
}

function editarInfoMoto(){
	let selected = $("#categoriaMoto").children(":selected").attr("value");
	if (selected.length > 0) {
	
	let misDatos = {

        brand: $("#brandMoto").val(),
        model: $("#model").val(),
        year: $("#yearMoto").val(),
        name: $("#nameMoto").val(),
		category:{id:selected},
		description: $("#descripMoto").val()
		
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://168.138.151.224/api/Motorbike/update',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Modificado!");
        	traerInformacionMoto();	
			}
		}
	});
	}
	else
	{
		alert('Debe escoger categoria');
    }
}

function EliminarInfoMoto(){
	let selected = $("#categoriaMoto").children(":selected").attr("value");
	if (selected.length > 0) {
	
	let misDatos = {

        brand: $("#brandMoto").val(),
        model: $("#model").val(),
        year: $("#yearMoto").val(),
        name: $("#nameMoto").val(),
		category:{id:selected},
		description: $("#descripMoto").val()
		
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://168.138.151.224/api/Motorbike/1',
	{data: datosJson,
    type : 'DELETE',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Eliminado!");
        	traerInformacionMoto();	
			}
		}
	});
	}
	else
	{
		alert('Debe escoger categoria');
    }
}

//CATEGORY FUCTION ---------------------

function traerInfoCategoria(){
	$.ajax({    
    url : 'http://168.138.151.224/api/Category/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#resultadoCategoria").empty();
        let miTabla = "<table style='border:1px solid black'><tr><td style='width: 200px; color: red; text-align: center;'>NAME</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>DESCRIPCION</td></tr>";
			miTabla +="<tr><td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td></tr>";    
		for (i=0; i<respuesta.length; i++){
			miTabla += '<tr>';
	        miTabla += "<td style='text-align: center;'>"+ respuesta[i].name+ '</td>'; 				
	        miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].description+ '</td>'; 				
			miTabla += '</tr>';
		}
        miTabla += '</table>';
	    $("#resultadoCategoria").append(miTabla);
		$("#nameCategory").val("");
		$("#descripCategory").val("");
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
});
}

function guardarInfoCategoria(){
	let misDatos = {
		name: $("#nameCategory").val(),
        description: $("#descripCategory").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://168.138.151.224/api/Category/save',
	{data: datosJson,
    type : 'POST',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Guardado!");
        	traerInfoCategoria();	
			}
		}
	});
}

function editarInfoCategoria(){
	let misDatos = {
		name: $("#nameCategory").val(),
        description: $("#descripCategory").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://168.138.151.224/api/Category/update',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Modificado!");
        	traerInfoCategoria();	
			}
		}
	});
}

function eliminarInfoCategoria(){
	let misDatos = {
		name: $("#nameCategory").val(),
        description: $("#descripCategory").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://168.138.151.224/api/Category/1',
	{data: datosJson,
    type : 'DELETE',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Eliminado!");
        	traerInfoCategoria();	
			}
		}
	});
}

//CLIENT FUCTION ---------------------

function traerInformacionClient(){
	$.ajax({    
    url : 'http://168.138.151.224/api/Client/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#resultadoClient").empty();
        let miTabla = "<table style='border:1px solid black'><tr><td style='width: 200px; color: red; text-align: center;'>NAME</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>EMAIL</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>AGE</td></tr>";
			miTabla +="<tr><td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td></tr>";    
		for (i=0; i<respuesta.length; i++){
			miTabla += '<tr>';
	        miTabla += "<td style='text-align: center;'>"+ respuesta[i].name+ '</td>'; 				
	        miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].email+ '</td>';
			miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].age+ '</td>';			
			miTabla += '</tr>';
		}
        miTabla += '</table>';
	    $("#resultadoClient").append(miTabla);
		$("#nameClient").val("");
		$("#emailClient").val("");
		$("#passwordClient").val("");
		$("#ageClient").val("");
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
});
}

function guardarInfoClient(){
	let misDatos = {
		name: $("#nameClient").val(),
        email: $("#emailClient").val(),
		password: $("#passwordClient").val(),
        age: $("#ageClient").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://168.138.151.224/api/Client/save',
	{data: datosJson,
    type : 'POST',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Guardado!");
        	traerInformacionClient();	
			}
		}
	});
}

function editarInfoClient(){
	let misDatos = {
		name: $("#nameClient").val(),
        email: $("#emailClient").val(),
		password: $("#passwordClient").val(),
        age: $("#ageClient").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://168.138.151.224/api/Client/update',
	{data: datosJson,
    type : 'PUT',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Modificado!");
        	traerInformacionClient();	
			}
		}
	});
}

function EliminarInfoClient(){
	let misDatos = {
		name: $("#nameClient").val(),
        email: $("#emailClient").val(),
		password: $("#passwordClient").val(),
        age: $("#ageClient").val()
	};
	let datosJson = JSON.stringify(misDatos); 
	$.ajax(    
    'http://168.138.151.224/api/Client/1',
	{data: datosJson,
    type : 'DELETE',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    statusCode : {
		201 :  function() {
			alert("Registro Eliminado!");
        	traerInformacionClient();	
			}
		}
	});
}

//MESSAGES FUCTION ---------------------

function traerInfoMensjaes(){
	$.ajax({    
    url : 'http://168.138.151.224/api/Message/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#resultadoMensajes").empty();
        let miTabla ="<table style='border:1px solid black'><tr><td style='width: 200px; color: red; text-align: center;'>CLIENTE</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>MOTORBIKE</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>MESSAGE</td></tr>";
			miTabla +="<tr><td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td>";

			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td></tr>"; 
		for (i=0; i<respuesta.length; i++){
			miTabla += '<tr>';
			miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].client.name+ '</td>'; 
	        miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].motorbike.name+ '</td>'; 	
			miTabla += "<td style='text-align: center;'>"+ respuesta[i].messageText+ '</td>'; 		
			miTabla += '</tr>';
		}
        miTabla += '</table>';
	    $("#resultadoMensajes").append(miTabla);
		$("#messageTextMes").val("");
		pintarSelectMesMoto();
		pintarSelectMesClient();
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
});
}

function pintarSelectMesMoto(){
	$.ajax({    
    url : 'http://168.138.151.224/api/Motorbike/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#mensajeMoto").empty();
		miSelect = '<option value="">Elige Moto</option>';
		for (i=0; i<respuesta.length; i++){
	        miSelect += '<option value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>'; 		
		}
	    $("#mensajeMoto").append(miSelect);    

	},
    error : function(xhr, status) {
        alert('ha sucedido un problema en cargar las Motos:'+ status);
    }
});
	
}

function pintarSelectMesClient(){
	$.ajax({    
    url : 'http://168.138.151.224/api/Client/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#mensajeClient").empty();
		miSelect = '<option value="">Elige Cliente</option>';
		for (i=0; i<respuesta.length; i++){
	        miSelect += '<option value='+ respuesta[i].idClient+ '>'+respuesta[i].name+'</option>'; 		
		}
	    $("#mensajeClient").append(miSelect);    

	},
    error : function(xhr, status) {
        alert('ha sucedido un problema en cargar las Motos:'+ status);
    }
});
	
}

function guardarInfoMensaje(){

	let selectedMoto = $("#mensajeMoto").children(":selected").attr("value");
	let selectedClient = $("#mensajeClient").children(":selected").attr("value");

	if (selectedClient.length > 0) {
		if (selectedMoto.length > 0) {
			let misDatos = {

				messageText: $("#messageTextMes").val(),
				client:{idClient:selectedClient},
				motorbike:{id:selectedMoto}

			};
			let datosJson = JSON.stringify(misDatos); 
			$.ajax(    
			'http://168.138.151.224/api/Message/save',
			{data: datosJson,
			type : 'POST',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
  
			statusCode : {
				201 :  function() {
					alert("Registro Guardado!");
					traerInfoMensjaes();	
					}
				}
			});
		}
		else
		{
			alert('Debe escoger una Moto');
		}
	}
	else
		{
			alert('Debe escoger un Cliente');
		}
}


//RESERVATIONS FUCTION ---------------------

function traerInfoReservas(){
	$.ajax({    
    url : 'http://168.138.151.224/api/Reservation/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#resultadoReservas").empty();
        let miTabla ="<table style='border:1px solid black'><tr><td style='width: 200px; color: red; text-align: center;'>idReservation</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>startDate</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>devolutionDate</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>MOTOBIKE</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>idClient</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>NAME</td>";
			miTabla +="<td style='width: 200px; color: red; text-align: center;'>EMAIL</td></tr>";
			miTabla +="<tr><td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td>";
			miTabla +="<td style='width: 200px; text-align: center;'>---------------</td></tr>"; 
		for (i=0; i<respuesta.length; i++){
			miTabla += '<tr>';
			miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].idReservation+ '</td>';
			miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].startDate+ '</td>'; 
			miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].devolutionDate+ '</td>';
			miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].motorbike.name+ '</td>'; 
	        miTabla +=  "<td style='text-align: center;'>"+ respuesta[i].client.idClient+ '</td>'; 	
			miTabla += "<td style='text-align: center;'>"+ respuesta[i].client.name+ '</td>'; 
			miTabla += "<td style='text-align: center;'>"+ respuesta[i].client.email+ '</td>'; 				
			miTabla += '</tr>';
		}
        miTabla += '</table>';
	    $("#resultadoReservas").append(miTabla);
		$("#startDateRes").val("");
		$("#devolutionDateRes").val("");
		pintarSelectResMoto();
		pintarSelectResClient();
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status + json);
    }
});
}

function pintarSelectResMoto(){
	$.ajax({    
    url : 'http://168.138.151.224/api/Motorbike/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#reservaMoto").empty();
		miSelect = '<option value="">Elige Moto</option>';
		for (i=0; i<respuesta.length; i++){
	        miSelect += '<option value='+ respuesta[i].id+ '>'+respuesta[i].name+'</option>'; 		
		}
	    $("#reservaMoto").append(miSelect);    

	},
    error : function(xhr, status) {
        alert('ha sucedido un problema en cargar las Motos:'+ status);
    }
});
	
}

function pintarSelectResClient(){
	$.ajax({    
    url : 'http://168.138.151.224/api/Client/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#reservaClient").empty();
		miSelect = '<option value="">Elige Cliente</option>';
		for (i=0; i<respuesta.length; i++){
	        miSelect += '<option value='+ respuesta[i].idClient+ '>'+respuesta[i].name+'</option>'; 		
		}
	    $("#reservaClient").append(miSelect);    

	},
    error : function(xhr, status) {
        alert('ha sucedido un problema en cargar las Motos:'+ status);
    }
});
	
}

function guardarInfoReservas(){

	let selectedMoto = $("#reservaMoto").children(":selected").attr("value");
	let selectedClient = $("#reservaClient").children(":selected").attr("value");

	if (selectedClient.length > 0) {
		if (selectedMoto.length > 0) {
			let misDatos = {

				startDate: $("#startDateRes").val(),
				devolutionDate: $("#devolutionDateRes").val(),
				client:{idClient:selectedClient},
				motorbike:{id:selectedMoto}

			};
			let datosJson = JSON.stringify(misDatos); 
			$.ajax(    
			'http://168.138.151.224/api/Reservation/save',
			{data: datosJson,
			type : 'POST',
			dataType : 'json',
			contentType: "application/json; charset=utf-8",
  
			statusCode : {
				201 :  function() {
					alert("Registro Guardado!");
					traerInfoReservas();	
					}
				}
			});
		}
		else
		{
			alert('Debe escoger una Moto');
		}
	}
	else
		{
			alert('Debe escoger un Cliente');
		}
}



