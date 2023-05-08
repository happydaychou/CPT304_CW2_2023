function countryHoliday()  {
    const year = document.getElementById('year').value;
    const countrycode = document.getElementById('Countrycode').value;
    const holidayapiurl = `https://calendarific.com/api/v2/holidays?&api_key=64931719ef8200ea2c7013311cbf0a7717f422ab&country=${countrycode}&year=${year}`;
    fetch(holidayapiurl)
        .then((data2) => data2.json())
        .then((holiday) => generateHTML2(holiday))

    const generateHTML2 = (data2) => {
        var html2 = `<div>Choose a Holiday</div><select name="holiday" id="holiday">`
        var i = 0;
        for (i = 0; i < data2.response.holidays.length; i++) {
            html2 += `<option value=${data2.response.holidays[i].date.iso}>${data2.response.holidays[i].name}</option>`;
        }
        
        const holidaydiv = document.querySelector(".holidays")
        holidaydiv.innerHTML = html2
    }

}



