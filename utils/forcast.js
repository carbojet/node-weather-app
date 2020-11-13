const request = require('postman-request')

const forcast = (latitude, longitude, callback) =>{
    const weatherstackUrl = 'http://api.weatherstack.com/current?access_key=2e54585f4e120640fe00ecdd5bad5d55&query='+latitude+','+longitude+'&unites=f'
    request({url : weatherstackUrl,json:true}, (error,{body}) => {
        if(error){
            callback('Unable to Connect to weather service!',undefined)
        }else if(body.error){
            callback('Unable to Connect to weather service!',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0]+" It is currently "+ body.current.temperature + " degress out .It feels like " + body.current.feelslike + " degress out. The humidityis " + body.current.humidity + "%")
        }
    })
}
module.exports = forcast