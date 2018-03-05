/*eslint-env jquery*/
/* global document */     

$(document).ready(function(){
	$("#enterCity").click(function(){
    
       return getWeather(); 
    });
    
});

function getWeather(){
    var ct = $("#city").val();  // the input value from by its ID called city    
	var myCity = 'http://api.openweathermap.org/data/2.5/weather?q=' + ct + '&units=metric&APPID=2de5cf124002e09e131b94da9bdbeb71';
    
    
    if(ct != '' ){    // checking if the input box is empty 
		
        $.ajax({
           	url: myCity,
			type: "GET",
			dataType: "jsonp",
			success:function(data){
				
				var widget = displayResult(data);   // giving the input the be displayed
					$("#showWeather").html(widget);  // show the result
						$("#city").val(''); 		// emptying the input bar after a search
		}
        });
        
    }else{
        $('#error').html("<div class='alert alert-danger' id='errorCT'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Please don't leave the field empty! </div>"); 
		// when the search boxy is empty, alert-danger is a bootsrap class
    }
    
}



function displayResult(data){
	return	"<h2 style='font-weight:bold; font-size:35px; padding-top:20px;' class='text-center'> Current weather for " + data.name + ", " + data.sys.country + "</h2>"+         
			"<h3 style='padding-left:15px;' ><strong>General description: </strong> <img src= 'http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'>" + data.weather[0].description + " </h3>" +
			"<h3 style='padding-left:15px;'><strong>Temprature: </strong>" + data.main.temp + " &deg;C</h3>" +
			"<h3 style='padding-left:15px;'><strong>Wind Speed: </strong>" + data.wind.speed + " meter/sec</h3>" +
			"<h3 style='padding-left:15px;'><strong>Clouds: </strong>" + data.clouds.all + "% cloudliness</h3>" +
			"<h3 style='padding-left:15px;'><strong>Humidity: </strong>" + data.main.humidity +  "%</h3>"+
			"<h3 style='padding-left:15px; padding-bottom: 20px;'><strong>Pressure: </strong>" + data.main.pressure + " hPa</h3>" ;
}