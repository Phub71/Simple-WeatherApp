/*eslint-env jquery*/
/* global document */     
$(document).ready(function(){
		$("#forecastButton").click(function(){
    
       return getForecast(); 
    });
});


function getForecast(){
	var forecastCT = $("#city").val();
	var forecastURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + forecastCT + '&units=metric&APPID=2de5cf124002e09e131b94da9bdbeb71';

	if(forecastCT != ''){
		
		$.ajax({
			url: forecastURL,
			type: "GET",
			dataType: "jsonp",
			success: function(data){
				var table = '';    // initially setting our table to empty
				
				var tableHeader = '<h2><strong>Weather forecast of ' + data.city.name  + ', ' + data.city.country + '</strong></h2>';
				
				for(var i = 0; i <data.list.length; i++){     // looping through the result to get all the requried values
					table += "<tr>"; 
					
					table += "<td>" + data.list[i].dt_txt+ "</td>";   // date and time column
					table += "<td><img src= 'http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png'></td>";    // icon column  							
					table += "<td>" + data.list[i].weather[0].description + "</td>";    // descritpino
					table += "<td>" + data.list[i].main.temp_min + " &deg;C</td>";
					table += "<td>" + data.list[i].main.temp_max + " &deg;C</td>";
					table += "<td>" + data.list[i].main.pressure + " hPa</td>";
					table += "<td>" + data.list[i].clouds.all + "%</td>";
					table += "<td>" + data.list[i].wind.speed + " m/s</td>";
					
		
					table += "/tr";
				}
				
				$("#header").html(tableHeader);
				$("#forecastTable").html(table);
				$("#city").val('');
			}
				
		});
		
		
	}else{
        $('#error').html("<div class='alert alert-danger' id='errorCT'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Please don't leave the field empty! </div>"); 
		// when the search boxy is empty, alert-danger is a bootsrap class
    }
    
}