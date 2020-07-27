import React from 'react';
import protoTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';
import { faCloudSunRain } from '@fortawesome/free-solid-svg-icons';



const Weather = (props) =>{
    return (
        <div className="App">
            <div className="cards pt-5 text-white text-center" >
                <h3>{props.city}</h3>
                <h5 className="py-4">
                    <i className={`wi ${props.weatherIcon} display-4`}></i>
                </h5>
                
                {/* <h1 className="py-3">{props.temp_celcius}&deg;</h1> */}

                {props.temp_celcius ? (
                
                <h2 className="py-3" ><FontAwesomeIcon icon={faTemperatureHigh}/> <span className="pt-2"> {props.temp_celcius}&deg;</span></h2>
                
                ) : null}
                
                {/* show max and min temperature */}
                {minmaxTemp(props.temp_min, props.temp_max)}

                {props.description ? (<h5 className="py-3"><FontAwesomeIcon icon={faCloudSunRain} /> <span> {props.description}</span></h5>) : null}
            </div>
        </div>
    )

    
}



function minmaxTemp(min,max){
   if(min && max){
    return (
        <h4>
            <span className="px-4"><FontAwesomeIcon icon={faTemperatureHigh}/> {min}&deg;</span>
            <span className="px-4"><FontAwesomeIcon icon={faTemperatureLow}/> {max}&deg;</span>
        </h4>
    )
   }    
}


Weather.protoTypes = {
    city: protoTypes.string.isRequired,
    country: protoTypes.string.isRequired,
    temp_celcius: protoTypes.string.isRequired,
    temp_min: protoTypes.string.isRequired,
    temp_max: protoTypes.string.isRequired ,
    description: protoTypes.string.isRequired
}

export default Weather;