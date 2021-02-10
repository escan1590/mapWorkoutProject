'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const formInputs = document.querySelectorAll('.form__input');
//GEOLOCATION API GLANCE
// if (navigator.geolocation)
//   // to execute only on browsers where the api is supported
//   navigator.geolocation.getCurrentPosition(
//     function (position) {
//       const { latitude } = position.coords;
//       const { longitude } = position.coords;
//       const coords = [latitude, longitude];
//       map = L.map('map').setView(coords, 14);

//       L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(map);

//       //Handling  clicks on map
//       map.on('click', function (e) {
//         mapEvent = e;
//         form.classList.remove('hidden');
//         inputDistance.focus(); // immediately focus the cursor on the km input type box
//         addTriggered = true;
//       });
//     },
//     function () {
//       alert('could not get your position');
//     }
//   );

// form.addEventListener('submit', function (e) {
//   //display the marker
//   e.preventDefault();
//   if (addTriggered) {
//     //Clear input fields
//     inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =
//       '';

//     //Display marker
//     const { lat, lng } = mapEvent.latlng;
//     L.marker([lat, lng], {
//       riseOnHover: true,
//       draggable: true,
//     })
//       .addTo(map)
//       .bindPopup(
//         L.popup({
//           maxWidth: 250,
//           minWidth: 100,
//           autoClose: false,
//           closeOnClick: false,
//           className: 'running-popup',
//         })
//       )
//       .setPopupContent('Workout')
//       .openPopup();
//     inputType.closest('.form__row').classList.toggle('form__row--hidden');
//     inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
//     this.classList.add('hidden');
//   }
//   addTriggered = false;
// });

// inputType.addEventListener('change', function (e) {
//   inputType.closest('.form__row').classList.toggle('form__row--hidden');
//   inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
//   inputDistance.focus();
// });
