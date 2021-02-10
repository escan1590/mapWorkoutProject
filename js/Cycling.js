'use strict';
/**
 * Cycling class that extend Workout class.
 * Is used to create new workouts specific to cycling.
 */
class Cycling extends Workout {
  /**
   * Build a new cycling object
   * @param {String|Number} distance in KM
   * @param {String|Number} duration in min
   * @param {[Number,Number]} coords [lat,lng]
   * @param {String|Number} elevationGain
   */
  constructor(distance, duration, coords, elevationGain) {
    super(distance, duration, coords);
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this.name = 'cycling';
  }

  /**
   * Caclculate the speed
   */
  calcSpeed() {
    this.speed = Math.ceil(this.distance / (this.duration / 60)).toFixed(1);
    return this.speed;
  }
}
