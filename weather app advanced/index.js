
const container = document.querySelector('.container');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
//const searchForm = document.getElementById('searchForm');
const searchButton = document.querySelector('.bx-search');
const cityInput = document.querySelector('.search-box input');
const temperatureElement = document.querySelector('.weather-box .temperature');
const descriptionElement = document.querySelector('.weather-box .description');
const humidityElement = document.querySelector('.weather-details .humidity span');
const windElement = document.querySelector('.weather-details .wind span');
const image = document.querySelector('.weather img');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');


// Function to handle weather search
const searchWeather = () => {
    const APIkey = '50a57d11617ba4b958c4564634e0b852';
    const city = cityInput.value;

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod == '404'){
                cityHide.textContent=city;
                container.style.height ='400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }
           


            const image = document.querySelector('.weather img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            // if (json.weather && json.weather.length > 0) {
                if (cityHide.textContent == city ){
                    return;
                }
                else{
                    cityHide.textContent=city;
                    container.classList.add('active');
                    container.style.height ='555px';
                    weatherBox.classList.add('active');
                    weatherDetails.classList.add('active');
                    error404.classList.remove('active');

                    setTimeout(()=>{
                        container.classList.remove('active');
                    }, 2500);


                    switch (json.weather[0].main) {
                        case 'Clear':
                            image.src = 'images/clear.png';
                            break;
                        case 'Rain':
                            image.src = 'images/rain.png';
                            break;
                        case 'Snow':
                            image.src = 'images/snow.png';
                            break;
                        case 'Clouds':
                            image.src = 'images/cloud.png';
                            break;
                        case 'Mist':
                            image.src = 'images/mist.png';
                            break;
                        case 'Haze':
                            image.src = 'images/fog.png';
                            break;
                        default:
                            image.src = 'images/cloud.png';
                    }
    
                    // Update UI elements with weather data using innerHTML
                    temperatureElement.innerHTML = `${json.main.temp} <span>&#8451;</span>`;
                    descriptionElement.innerHTML = json.weather[0].description;
                    humidityElement.innerHTML = ` ${json.main.humidity}%`;
                    windElement.innerHTML = ` ${json.wind.speed} m/s`;
                }
                
        // }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
};
// Click event for the search button
if (searchButton) searchButton.addEventListener('click', searchWeather);

// Keydown event for the input field
if (cityInput) {
    cityInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            searchWeather();
        }
    });
}