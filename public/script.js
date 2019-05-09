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
      results += '<h2>Weather in ' + json.name + "</h2>"; //json.name looks for attribute of name in json file, this could be statically declared then changed

      //Go through weather array, and make a new image for each weather pattern
      //This cannot be statically declared, it must be declared dynamically, because it is an array and we don't know how many will come in from the database
      for (let i=0; i < json.weather.length; i++) {
	       results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }

      //Adds the main temperature tag into the h2 file
      results += '<h2>' + json.main.temp + " &deg;F</h2>"

      //Adds the description of the weather
      results += "<p>"
      for (let i=0; i < json.weather.length; i++) {
	       results += json.weather[i].description
	        if (i !== json.weather.length - 1)
	         results += ", "
         }
      results += "</p>";
      document.getElementById("currentWeatherResults").innerHTML = results;
    } catch(err) {
      console.log(err);
    }
    //Above code does the same as below, but it is prettier
    /*
    fetch (url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
    });
    */
  });
  document.getElementById("futureWeatherSubmit").addEventListener("click", async function(event) {
    event.preventDefault();
    const value = document.getElementById("futureWeatherInput").value;
    if (value === "")
      return;
    console.log(value);

    //const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=cf3be95cf53b4267405bcea8c73696ee";
    const url = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=cf3be95cf53b4267405bcea8c73696ee";
    try {
      const response = await fetch(url);
      console.log("response: ", response);  //This gets the entire response
      const json = await response.json();
      console.log("json: ", json);  //This gets it in json file, readable

      let forecast = "";
      for (let i=0; i < json.list.length; i++) {
	       forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
	       forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
	       forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
      }
      document.getElementById("futureWeatherResults").innerHTML = forecast;
    } catch(err) {
      console.log(err);
    }
  });
}
