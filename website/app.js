/* Global Variables */
const API_Key = '&appid=795bee30dbfe0aaa496267ae02ac795a&units=imperial';
const BaseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//cleintside code related to server code
const City = document.getElementById('generate').addEventListener('click', () => {
    const newzip = document.getElementById('zip').value;
    const feels = document.getElementById('feelings').value;

    getWeatherData(BaseURL, newzip, API_Key).then(function(data) {
        postData('/add', { date: newDate, Temp: data.main.temp, Feel: feels })
            .then(getData());
    })

})

//API Fetching and Requests

const getWeatherData = async(BaseURL, newzip, API_Key) => {
    const res = await fetch(BaseURL + newzip + API_Key)
    try {
        const data = await res.json();
        console.log(data.main);
        return data
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}





//POST Request handling 



const postData = async(url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });


}



//GET and Updating the UI 

const getData = async() => {
    const req = await fetch('/all')
    try {
        const data = await req.json();
        let i = data.length - 1;
        document.getElementById('date').innerHTML = data[i].date;
        document.getElementById('temp').innerHTML = data[i].Temp;
        document.getElementById('content').innerHTML = data[i].Feel;
    } catch (error) {
        console.log("error", error);

    }
}