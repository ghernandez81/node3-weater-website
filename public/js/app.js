

const getWeather = (location, p1, p2) => {
  p1.textContent = 'loading ...';
  p2.textContent = '';
  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      p1.textContent = '';
      if (data.error) {
        p2.textContent = data.error
      } else {
        const { forecast, location } = data;
        p1.textContent = `Location: ${location}`;
        p2.textContent = `Forecast: ${forecast}`;
      }

    }).catch((error) => {
      console.log(error);
    })
  });

};


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = 'From Javascript';

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = search.value;
  getWeather(location, messageOne, messageTwo);
});