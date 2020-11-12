const request = require('postman-request')

const geocode = (address, callback) =>{
    mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiY2FyYm9qZXQiLCJhIjoiY2toMGE2MHg0MDJpYTJ5cWZ4ajdicGRrcSJ9.CNDTSkGRBeHFNRQ_KEcNpw&limit=1'
    request({url:mapboxUrl, json:true} , (error,{body}) => {
        if(error){
            callback('Unable to Connect to location service!',undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location !',undefined)
        }else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode