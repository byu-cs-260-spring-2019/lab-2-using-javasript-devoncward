window.onload = function() {
  document.getElementById("currentWeatherSubmit").addEventListener("click", async function(event) {
    event.preventDefault();
    const value = document.getElementById("currentWeatherInput").value;
    if (value === "")
      return;
    console.log(value);

    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=cf3be95cf53b4267405bcea8c73696ee";
    try {
      const response = await fetch(url);
      console.log("response: ", response);  //This gets the entire response
      const json = await response.json();
      console.log("json: ", json);  //This gets it in json file, readable

      //This part below displays the data we have gotten
      let results = ""; //let=creates variable, similar to var keyword
      results += '<h1 style="float:left;">Weather in ' + json.name + "</h1>"; //json.name looks for attribute of name in json file, this could be statically declared then changed

      //Go through weather array, and make a new image for each weather pattern
      //This cannot be statically declared, it must be declared dynamically, because it is an array and we don't know how many will come in from the database
      for (let i=0; i < json.weather.length; i++) {
	       results += '<img style="position:relative" src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }

      //Adds the description of the weather
      results += "<p>";
      //Adds the main temperature tag into the h2 file
      results += '<h2> Av. Temp: ' + json.main.temp + " &deg;F";
      results += '<ul>';
        results += '<li>';
          results += '<h3> High. Temp: ' + json.main.temp_max + " &deg;F</h3>";
        results += '</li>';
        results += '<li>';
          results += '<h3> Low. Temp: ' + json.main.temp_min + " &deg;F</h3>";
        results += '</li>';
      results += '</ul>';
      results += "</h2>";
      results += '<h2> Humidity: ' + json.main.humidity + " %</h2>";
      results += '<h2> Wind Speed: ' + json.wind.speed + " mph</h2>";
      for (let i=0; i < json.weather.length; i++) {
	       results += '<h2>' + json.weather[i].description;
	        if (i !== json.weather.length - 1) {
	         results += ", ";
         }
      }
      results += "<h2> Cloud Cover: " + json.clouds.all + " %</h2>";
      results += "</p>";
      results += '<br>';
      results += "<h1> Recommendation: Perfect weather for a run </h1>";
      document.getElementById("currentWeatherResults").innerHTML = results;
    } catch(err) {
      console.log(err);
    }
  });
  document.getElementById("futureWeatherSubmit").addEventListener("click", async function(event) {
    event.preventDefault();
    const value = document.getElementById("futureWeatherInput").value;
    if (value === "")
      return;
    console.log(value);

    const url = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=cf3be95cf53b4267405bcea8c73696ee";
    try {
      const response = await fetch(url);
      console.log("response: ", response);  //This gets the entire response
      const json = await response.json();
      console.log("json: ", json);  //This gets it in json file, readable

      let forecast = "";
      var currentDate = "";
      for (let i=0; i < json.list.length; i++) {

        var date = moment(json.list[i].dt_txt).format('MMMM Do YYYY');
        if(currentDate != date) {
            forecast += '<h2>' + moment(json.list[i].dt_txt).format('MMMM Do YYYY') + "</h2>";
            forecast += "<br>";
            currentDate = date;
        }
        forecast += '<div style="display: inline-block;">';
        forecast += '<h3 style="float:left;">' + moment(json.list[i].dt_txt).format('h:mm:ss') + "</h3>";
        forecast += '<img style="position: relative" src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>';
        forecast += "<p>";
        forecast += '<ul>';
          forecast += '<li>';
            forecast += '<h4> Av. Temp: ' + json.list[i].main.temp + " &deg;F</h4>";
            forecast += '<ul>';
              forecast += '<li>';
                forecast += '<h5> High. Temp: ' + json.list[i].main.temp_max + " &deg;F</h5>";
              forecast += '</li>';
              forecast += '<li>';
                forecast += '<h5> Low. Temp: ' + json.list[i].main.temp_min + " &deg;F</h5>";
              forecast += '</li>';
            forecast += '</ul>';
          forecast += '</li>';
          forecast += '<li>';
            forecast += '<h4> Humidity: ' + json.list[i].main.humidity + " %</h4>";
          forecast += '</li>';
          forecast += '<li>';
            forecast += '<h4> Wind Speed: ' + json.list[i].wind.speed + " mph</h4>";
          forecast += '</li>';
          forecast += '<li>';
            forecast += '<h4> Cloud Cover: ' + json.list[i].clouds.all + " %</h4>";
          forecast += '</li>';
        forecast += '</ul>';
        forecast += "</p>";
        forecast += "<br>";
        forecast += '</div>';
      }
      document.getElementById("futureWeatherResults").innerHTML = forecast;
    } catch(err) {
      console.log(err);
    }
  });
}
