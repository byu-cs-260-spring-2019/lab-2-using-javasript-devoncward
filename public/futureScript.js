window.onload = function() {
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
            forecast += '<h6> Av. Temp: ' + json.list[i].main.temp + " &deg;F</h6>";
            forecast += '<ul>';
              forecast += '<li>';
                forecast += '<h6> High. Temp: ' + json.list[i].main.temp_max + " &deg;F</h6>";
              forecast += '</li>';
              forecast += '<li>';
                forecast += '<h6> Low. Temp: ' + json.list[i].main.temp_min + " &deg;F</h6>";
              forecast += '</li>';
            forecast += '</ul>';
          forecast += '</li>';
          forecast += '<li>';
            forecast += '<h6> Humidity: ' + json.list[i].main.humidity + " %</h6>";
          forecast += '</li>';
          forecast += '<li>';
            forecast += '<h6> Wind Speed: ' + json.list[i].wind.speed + " mph</h6>";
          forecast += '</li>';
          forecast += '<li>';
            forecast += '<h6> Cloud Cover: ' + json.list[i].clouds.all + " %</h6>";
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
