import React from 'react';
import './form.style.css';

const Form = props =>{
    return (
        <div className="container-fluid pt-sm-4">
            <h1 className="text-warning">Weather Watcher</h1>
            <div>{props.error ? error() : null} {props.unavailable ? unavailable() : null}</div>
            <form onSubmit={props.loadWeather}>
            <div className="row">
                <div className="col-md-3 mt-5 offset-md-2">
                    <input type="text" className="form-control" name="city" autoComplete="off" placeholder="City"/>
                </div>

                <div className="col-md-3 mt-5">
                    <input type="text" className="form-control" name="country" autoComplete="off" placeholder="Country"/>
                </div>

                <div className="col-md-3 mt-5 text-md-left">
                    <button className="btn btn-warning">Get Weather</button>
                </div>

            </div>
            </form>
        </div>
    )
}

function error (){
    return (
        <p className="text-light my-1" role="alert">
            Please enter a valid city and country
        </p>  
    )
}

function unavailable (){
    return (
        <p className="text-light my-1" role="alert">
           Oops! City not found
        </p>  
    )
}

export default Form