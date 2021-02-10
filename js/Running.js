'use strict';

class Running extends Workout {
  constructor(distance, duration, coords, cadence) {
    super(distance, duration, coords);
    this.name = 'running';
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    //toFixed is to deal with the numbers after the comma
    this.pace = Math.ceil(this.distance / this.duration).toFixed(1);
    return this.pace;
  }
}
