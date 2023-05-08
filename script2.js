function getHoliday() {
    var city = document.getElementById("City").value;
    const weatherapiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e5eb20914f993f76ee41d0eabe52ab75`;
    fetch(weatherapiurl)
        .then((data) => data.json())
        .then((weather) => generateHTML(weather))

    const generateHTML = (data) => {
        const html = `
            <div class="weather">Current Weather: ${data.weather[0].description}</div>
            <div class="temperature">Current Temperature ${Math.round((data.main.temp - 273.15) * 100) / 100}</div><br>
        `
        const weatherdiv = document.querySelector(".weather")
        weatherdiv.innerHTML = html

        const holidayapiurl = `https://calendarific.com/api/v2/holidays?&api_key=64931719ef8200ea2c7013311cbf0a7717f422ab&country=${data.sys.country}&year=2023`;
        fetch(holidayapiurl)
            .then((data2) => data2.json())
            .then((holiday) => generateHTML2(holiday))

        const generateHTML2 = (data2) => {
            var html2 = `<div>Choose a Holiday</div><select name="holiday" id="holiday">`
            var i = 0;
            for (i = 0; i < data2.response.holidays.length; i++) {
                html2 += `<option value=${data2.response.holidays[i].date.iso}>${data2.response.holidays[i].name}</option>`;
            }
            html2 += `</select><br><button onclick="getHolidayWeather()" id="submit">Submit</button>`
            const holidaydiv = document.querySelector(".holiday")
            holidaydiv.innerHTML = html2
        }
    }
}
function getHolidayWeather() {
        const apiKey = 'a1b4fe61681615d304f2548f0e419f82';
        const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
        const location = document.getElementById('City').value;
        const holiday = document.getElementById('holiday').value;

        const url = `${baseUrl}?q=${location}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const dayData = data.list.find(day => day.dt_txt.startsWith(holiday));

                if (dayData) {
                    const condition = dayData.weather[0].description;
                    const icon = `https://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`;
                    const temp = dayData.main.temp;

                    const holidayWeather = document.getElementById('holidayWeather');
                    holidayWeather.innerHTML = `Weather in ${location} on ${holiday}: ${condition} <img src="${icon}">, Temperature: ${temp.toFixed(1)}¡ãC`;
                } else {
                    alert('No weather data available for the selected holiday.');
                }
            })
        .catch(error => console.error(error));
}


async function getRentalInfo() {
    const bookingApiKey = '9146fd99f9mshc8ebabbeebbd4f8p1a4ebejsn15a4427c6ca3';
    const location = document.getElementById('City').value;
    const checkIn = document.getElementById('checkin').value;
    const checkOut = document.getElementById('checkout').value;

    const url = 'https://booking-com.p.rapidapi.com/v1/hotels/locations?name=${City}&locale=en-gb';
    const option = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9146fd99f9mshc8ebabbeebbd4f8p1a4ebejsn15a4427c6ca3',
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, option);
        const result = await response.json();
        document.getElementById("response").innerHTML = response;
        const destId = result[0]?.dest_id;

        if (destId) {
            console.log(`Destination ID: ${destId}`);
        } else {
            console.error('No destination ID found');
        }
    } catch (error) {
        console.error('Failed to fetch data', error);
    }



    if (!location || !checkIn || !checkOut) {
        alert('Please enter location and date information.');
        return;
    }

    const bookingUrl = 'https://booking-com.p.rapidapi.com/v1/hotels/search?checkin_date=${checkIn}&dest_type=city&units=metric&checkout_date=${checkOut}&adults_number=2&order_by=popularity&dest_id=-553173&filter_by_currency=AED&locale=en-gb&room_number=1&children_number=2&children_ages=5%2C0&categories_filter_ids=class%3A%3A2%2Cclass%3A%3A4%2Cfree_cancellation%3A%3A1&page_number=0&include_adjacency=true';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9146fd99f9mshc8ebabbeebbd4f8p1a4ebejsn15a4427c6ca3',
            'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
        }
    };

    try {
        const bookingResponse = await fetch(bookingUrl, options);
        const bookingData = await bookingResponse.json();
        displayRentalList(bookingData.listings);
    } catch (error) {
        console.error(error);
        alert('Failed to fetch data. Please try again.');
    }
}

function displayRentalList(rentals) {
    const rentalList = document.getElementById('rentalList');
    rentalList.innerHTML = '';

    rentals.forEach(rental => {
        const rentalItem = document.createElement('div');
        rentalItem.innerHTML = `
      <h3>${rental.name}</h3>
      <p>Address: ${rental.address}</p>
      <p>Price: ${rental.price} per night</p>
    `;
        rentalList.appendChild(rentalItem);
    });
}



