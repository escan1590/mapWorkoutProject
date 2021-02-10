'use strict';

class App {
  #map; // private
  #mapEvent;
  #addTriggered = false;
  #workouts = [];
  //#markergroup;

  constructor() {
    //get user position
    this._getPosition();

    //get data from local storage
    this._getLocalStorage();

    //attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField.bind(this));
    containerWorkouts.addEventListener('click', this._moveToMarker.bind(this));
    // this.#markergroup.on('dragend', function (event) {
    //   const draggedMarker = event.layer;
    //   console.log(draggedMarker);
    // });
  }
  /**
   *  this method will get our current position.
   *  then use the _loadMap as a callBack to load the map
   */
  _moveToMarker(e) {
    const clicked = e.target.closest('.workout');
    if (clicked) {
      const id = clicked.dataset.id;
      const workout = this.#workouts.find(el => el.id === id);
      this.#map.panTo(new L.LatLng(...workout.coords));
    }
  }
  _getPosition() {
    if (navigator.geolocation)
      // to execute only on browsers where the api is supported
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('could not get your position');
        }
      );
  }
  /**
   * This method will load the map
   * @param {*} position object where we can retrieve lat and lng
   */
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, 14);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //Handling  clicks on map
    this.#map.on('click', this._showForm.bind(this));
    this.#workouts.forEach(workout => {
      this._renderWorkoutMarker(workout);
    });
  }

  /**
   * This method is the call back for map event listener.
   * It will show the form each time we click on the map.
   * @param {*} e
   */
  _showForm(e) {
    this.#mapEvent = e;
    form.classList.remove('hidden');
    inputDistance.focus(); // immediately focus the cursor on the km input type box
    this.#addTriggered = true;
  }

  /**
   * this.method is the callback of type input field.
   * is is triggered on change .
   * and it is used to make the elevation gain input appear.
   * @param {*} e
   */
  _toggleElevationField(e) {
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputDistance.focus();
  }

  /**
   * This method is used to add a pin on the map for the workout
   * @param {*} e
   */
  _newWorkout(e) {
    //display the marker
    e.preventDefault();

    if (
      this.#addTriggered &&
      this._checkInputNotEmpty() &&
      this._inputValidation()
    ) {
      const { lat, lng } = this.#mapEvent.latlng;
      const distance = inputDistance.value;
      const duration = inputDuration.value;
      const cadence = inputCadence.value;
      const elevation = inputElevation.value;
      const type = inputType.value;
      let workout;
      let classN;
      if (inputType.value === 'running') {
        workout = new Running(distance, duration, [lat, lng], cadence);
        classN = 'running-popup';
        this.#workouts.push(workout);
        this._addRunningUi(
          distance,
          duration,
          workout.calcPace(),
          cadence,
          workout.getActivityDate(),
          workout.getId()
        );
      } else if (inputType.value === 'cycling') {
        classN = 'cycling-popup';
        workout = new Cycling(distance, duration, [lat, lng], elevation);
        this.#workouts.push(workout);
        this._addCyclingUi(
          distance,
          duration,
          workout.calcSpeed(),
          elevation,
          workout.getActivityDate(),
          workout.getId()
        );
      }

      console.log(this.#workouts);
      //Clear input fields
      inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =
        '';

      //Display marker
      L.marker([lat, lng], {
        riseOnHover: true,
      })
        .addTo(this.#map)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: classN,
          })
        )
        .setPopupContent(
          `${
            type === 'running' ? `🏃‍♂️ Running on` : `🚴‍♀️ cycling on`
          } ${workout.getActivityDate()}` //HERE
        )
        .openPopup();
      this.#addTriggered = false;
      this._hideForm();
      this._setLocalStorage();
    }
  }

  /**
   * Add workouts from storage
   */
  _renderWorkoutList(workout) {
    let classN;
    if (workout.name === 'running') {
      this._addRunningUi(
        workout.distance,
        workout.duration,
        workout.pace,
        workout.cadence,
        this._formatDataDate(new Date(workout.date)),
        workout.id
      );
    } else if (workout.name === 'cycling') {
      this._addCyclingUi(
        workout.distance,
        workout.duration,
        workout.speed,
        workout.elevationGain,
        this._formatDataDate(new Date(workout.date)),
        workout.id
      );
    }
  }
  _renderWorkoutMarker(workout) {
    let classN;
    let type;

    if (workout.name === 'running') {
      type = 'running';
      classN = 'running-popup';
    } else if (workout.name === 'cycling') {
      type = 'cycling';
      classN = 'cycling-popup';
    }
    //Display marker
    L.marker(workout.coords, {
      riseOnHover: true,
    })
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: classN,
        })
      )
      .setPopupContent(
        `${
          type === 'running' ? `🏃‍♂️ Running on` : `🚴‍♀️ cycling on`
        } ${this._formatDataDate(new Date(workout.date))}` //HERE
      )
      .openPopup();
  }

  _formatDataDate(date) {
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${month} ${day}`;
  }
  /**
   * Check if all the input are not empty depending on the type of activity.
   */
  _checkInputNotEmpty() {
    let check = false;
    if (inputDistance.value !== '' && inputDuration.value !== '') {
      if (
        (inputType.value === 'running' && inputCadence.value !== '') ||
        (inputType.value === 'cycling' && inputElevation.value !== '')
      ) {
        check = true;
      }
    }
    return check;
  }

  _inputValidation() {
    if (inputDistance.value <= 0 || inputDuration.value <= 0) {
      alert(
        'You are going on a run or What?\nEnter valid values\n(not null and positive)'
      );
      return false;
    } else if (
      isNaN(inputDistance.value) ||
      isNaN(inputDuration.value) ||
      isNaN(inputCadence.value) ||
      isNaN(inputElevation.value)
    ) {
      alert('Enter numbers please');
      return false;
    } else {
      if (inputType.value === 'running' && inputCadence.value <= 0) {
        alert('Enter valid cadence\n(not null and positive)');
        return false;
      } else if (inputType.value === 'cycling' && inputElevation.value <= '') {
        alert('Enter valid elevation\n(not null and positive)');
        return false;
      }
    }
    return true;
  }

  _hideForm() {
    form.classList.add('hidden');
  }

  _activityDate() {
    const date = new Date();
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${month} ${day}`;
  }

  _addRunningUi(distance, time, pace, cadence, date, id) {
    const html = `<li class="workout workout--running" data-id="${id}">
    <h2 class="workout__title">Running on ${date}</h2>
    <div class="workout__details">
      <span class="workout__icon">🏃‍♂️</span>
      <span class="workout__value">${distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${time}</span>
      <span class="workout__unit">min</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${pace}</span>
      <span class="workout__unit">min/km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <span class="workout__value">${cadence}</span>
      <span class="workout__unit">spm</span>
    </div>
  </li>`;

    form.insertAdjacentHTML('afterend', html);
  }

  _addCyclingUi(distance, time, speed, elevation, date, id) {
    const html = `<li class="workout workout--cycling" data-id="${id}">
    <h2 class="workout__title">Cycling on ${date}</h2>
    <div class="workout__details">
      <span class="workout__icon">🚴‍♀️</span>
      <span class="workout__value">${distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${time}</span>
      <span class="workout__unit">min</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${speed}</span>
      <span class="workout__unit">km/h</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⛰</span>
      <span class="workout__value">${elevation}</span>
      <span class="workout__unit">m</span>
    </div>
  </li>`;

    form.insertAdjacentHTML('afterend', html);
  }

  _setLocalStorage() {
    //we pass a string as the key, then the data to store
    //JSON.stringify convert object to string
    //JSON.parse convert string to object
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    this.#workouts = data;
    this.#workouts.forEach(workout => {
      this._renderWorkoutList(workout);
    });
  }
  /**
   * To remove all workouts from the storage
   */
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}
