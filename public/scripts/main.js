
const weatherForm = document.querySelector('form')
const searchedTerm = document.querySelector('input')

const displayLocation = document.querySelector('#location')
const displayIcon = document.querySelector('#icon')
const displayForecast = document.querySelector('#forecast')


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    displayLocation.textContent = "Loading..."
    displayForecast.innerHTML = ""
    displayIcon.innerHTML =  ""

    fetch(`/weather?address=${encodeURIComponent(searchedTerm.value.replace(/[;/]/g, ""))}`).then((respone)=>{
        respone.json().then((data)=>{
            if(data.error){
               return displayLocation.textContent = data.error, displayIcon.innerHTML = "", displayForecast.innerHTML =""
            }
            const iconurl = `https://darksky.net/images/weather-icons/${data.icon}.png`
                displayLocation.textContent = data.location
                displayForecast.innerHTML = data.forecast
                displayIcon.innerHTML = `<img src="${iconurl}" width="150px" alt="Weather Icon">`
        })
    })
})

