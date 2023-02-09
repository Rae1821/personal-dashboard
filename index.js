
const author = document.getElementById('author')

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=fashion") 
    .then(res => res.json())    
    .then(data => {
        console.log(data.urls.regular)
        document.body.style.backgroundImage = `url(${data.urls.regular})`  
        author.textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        document.body.style.backgroundImage = url('https://images.unsplash.com/photo-1608228088998-57828365d486?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzU3OTQwMjA&ixlib=rb-4.0.3&q=80&w=1080')
        document.body.textContent = 'Uh oh! Something went wrong!'
    })  

fetch('https://api.coingecko.com/api/v3/coins/dogecoin')
    .then(res => {
        if(!res.ok) {
            throw Error('Something went wrong')
        }
        console.log(res.status)
        return res.json()
    } )
    .then(data => {
        document.getElementById('crypto-top').innerHTML = `
            <img class="crypto-img" src=${data.image.small}  />
            <span class="crypto-name">${data.name}</span>
        `
        document.getElementById('crypto-currency').innerHTML += `
            <p class="current-price">📌 : $${data.market_data.current_price.usd}</p>
            <p class="high-price">⬆️ : $${data.market_data.high_24h.usd}</p>
            <p class="low-price">⬇️ : $${data.market_data.low_24h.usd}</p>
        `
        console.log(data)
    })

    .catch(err => console.log(err))

//quote of the day
fetch('https://api.goprogram.ai/inspiration')
    .then(res => {
        if(!res.ok) {
            throw Error('Something went wrong')
        }
        console.log(res.status)
        return res.json()
    })
    .then(data => {
        document.getElementById('quote').innerHTML = `
        <p class="quote-body">${data.quote}</p>
        <p class="quote-author">${data.author}</p>
        `
        console.log(data)
    })








//Set time
function getCurrentTime() {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
    document.getElementById('time').textContent = time
}

setInterval(getCurrentTime, 1000)

//Get the users coordinates
navigator.geolocation.getCurrentPosition((position) => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if(!res.ok) {
                throw Error("Weather data not available")
            }
             return res.json()   
            })
        .then(data => {
            console.log(data)
            const iconUrl =  `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById('weather-top').innerHTML = `
                <img class="icon" src=${iconUrl} />
                <span class="temp">${Math.round(data.main.temp)}°</span>
            `
            document.getElementById('weather-city').innerHTML = `
                <p class="city">${data.name}</p>
            `
        })
        .catch(err => console.log(err))

       
})



