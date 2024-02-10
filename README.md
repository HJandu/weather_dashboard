![image](https://github.com/HJandu/weather_dashboard/assets/116304118/a4c30b59-faa8-4c45-826f-bb6523fd6e08)

## Deployment
To access the weather dashboard, please click [here](https://hjandu.github.io/weather_dashboard/).

## Description 

Server APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Here I have built a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

### About
  * The weather dashboard has a form input.

<img width="90%" height="300" src="https://github.com/HJandu/weather_dashboard/blob/main/assets/images/homescreen.jpg">
   
  * When a user searches for a city they are presented with current and future conditions for that city for the next 5 days.
  * The city is added to the search history, so that the user does not need to type out the city name again. It is there as a button for them to click and the weather information is displayed. LocalStorage is used to store searched cities.
    
  <img width="70%" height="300" src="https://github.com/HJandu/weather_dashboard/blob/main/assets/images/search_button.jpg">
  
  * When a user views the current weather conditions for that city they are presented with:
    * The city name
    * The date
    * An icon representation of weather conditions
    * The temperature
    * The humidity
    * The wind speed
    * The Pressure
  * When a user views future weather conditions for that city they are presented with a 5-day forecast that displays:
    * The date
    * An icon representation of weather conditions
    * The temperature
    * The humidity
    * The pressure
 
<img width="90%" height="500" src="https://github.com/HJandu/weather_dashboard/blob/main/assets/images/weather_output.jpg">

  * The user does not need to type the name of the city using a capital letter, as it changes the first character to capital, as seen in the following code.
  User inputs a city with lowercase.

  <img width="70%" height="200" src="https://github.com/HJandu/weather_dashboard/blob/main/assets/images/lowercase_input.jpg">

The name is stored as a lowercase. 

  <img width="70%" height="200" src="https://github.com/HJandu/weather_dashboard/blob/main/assets/images/local_storage.jpg">

The city is displayed in the search history as a capital letter.

  <img width="70%" height="200" src="https://github.com/HJandu/weather_dashboard/blob/main/assets/images/uppercase_code.jpg">

* The code will check if duplicate cities are stored in the localStorage. 
 <img width="70%" height="200" src="https://github.com/HJandu/weather_dashboard/blob/main/assets/images/duplicate.jpg">




## Credits
Api key created at `https://openweathermap.org/api`. Refer to the [Full-Stack Blog on how to use API keys](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys) to help create an API key. <br>
The base URL for the API calls `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`


## License
Licensed by MIT License. &copy;Hardip Jandu
