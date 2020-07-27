import React from 'react';
import './App.css';
import Weather from './component/Weather.component'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'weather-icons/css/weather-icons.css'
import Form from './component/form.component'

// api.openweathermap.org/data/2.5/weather?q=London,uk
const API_KEY = '4d5e209ca8dad317a12c064bb3b5fb2b';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celcius: undefined,
      temp_min: undefined,
      temp_max: undefined,
      description: undefined,
      error: false,
      unavailable: false
    };

    this.weatherIcon ={
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }




  calCelsius(temp){
    let cel = Math.floor(temp - 273.15)
    return cel;
  }


  get_WeatherIcon(icons, rangeId){
    switch(true){
      case rangeId >= 200 && rangeId <= 232: this.setState({icon:this.weatherIcon.Thunderstorm})
      break;

      case rangeId >= 300 && rangeId <= 321: this.setState({icon:this.weatherIcon.Drizzle})
      break;

      case rangeId >= 500 && rangeId <= 531: this.setState({icon:this.weatherIcon.Rain})
      break;

      case rangeId >= 600 && rangeId <= 622: this.setState({icon:this.weatherIcon.Snow})
      break;

      case rangeId === 800: this.setState({icon:this.weatherIcon.Clear})
      break;

      case rangeId >= 801 && rangeId <= 804: this.setState({icon:this.weatherIcon.Clouds})
      break;

      default:
        this.state({icons: this.weatherIcon.clear});
    }
  }



  getWeather = async(e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    
    
    if(city && country){

      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`);

      const response = await api_call.json(); 

      console.log(response)
      
      if(response.cod === '404'){
        this.setState({
          city: undefined,
          country: undefined,
          icon: undefined,
          main: undefined,
          celcius: undefined,
          temp_min: undefined,
          temp_max: undefined,
          description: undefined,
          error: false,
          unavailable:true
        })

      }else{
        this.setState({
          city: `${response.name} , ${response.sys.country}`,
          country: response.sys.country,
          celcius: this.calCelsius(response.main.temp),
          temp_min: this.calCelsius(response.main.temp_min),
          temp_max: this.calCelsius(response.main.temp_max),
          description: response.weather[0].description,
          error: false,
          unavailable:false
        })
    
        this.get_WeatherIcon(this.weatherIcon, response.weather[0].id )
      }
      
    }else{
      this.setState({
        city: undefined,
        country: undefined,
        icon: undefined,
        main: undefined,
        celcius: undefined,
        temp_min: undefined,
        temp_max: undefined,
        description: undefined,
        error:true,
        unavailable:false
      });
    }
    
    
  }


  render(){
    return (
      <div className="App">
        <Form loadWeather={this.getWeather} error={this.state.error} unavailable={this.state.unavailable}/>
        <Weather
          style={this.textStyle} 
          city={this.state.city} 
          country={this.state.country} 
          temp_celcius={this.state.celcius}
          temp_min = {this.state.temp_min}
          temp_max = {this.state.temp_max}
          description = {this.state.description} 
          weatherIcon = {this.state.icon}
        />
      </div>
    ); 
  }
  
}


export default App;
