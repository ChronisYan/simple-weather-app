const request = require('request')

const forecast = (lat, log, callback)=>{
    const url = 'https://api.darksky.net/forecast/ab92b94519655668db299c7168072759/'+encodeURIComponent(lat)+','+encodeURIComponent(log)+'?units=si'
    request({url, json:true},(error, response)=>{
            if(error){
                    callback('Oops! Unable to connect to service, try again later')
            }else if(response.body.error){
                    callback('Oops! Unable to find location, try another search')
            }else{
                    callback(undefined,{
                            daily: response.body.daily.data[0].summary,
                            icon: response.body.daily.data[0].icon,
                            currentTemperature: response.body.currently.temperature,
                            currentPrecipProbability: response.body.currently.precipProbability
                    })
            }
    })
}

module.exports = forecast