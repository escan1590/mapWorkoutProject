'use strict';

class Cycling extends Workout {
  /**
   *
   * @param {*} distance in KM
   * @param {*} duration in min
   * @param {*} coords [lat,lng]
   * @param {*} elevationGain
   */
  constructor(distance, duration, coords, elevationGain) {
    super(distance, duration, coords);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this.name = 'cycling';
  }

  calcSpeed() {
    this.speed = Math.ceil(this.distance / (this.duration / 60)).toFixed(1);
    return this.speed;
  }
}
