'use strict';
/**
 * Running class that extend Workout class.
 * Is used to create new workouts specific to Running.
 */
class Running extends Workout {
  /**
   * Build a new Running Object
   * @param {String|Number} distance
   * @param {String|Number} duration
   * @param {[Number,Number]} coords
   * @param {String|Number} cadence
   */
  constructor(distance, duration, coords, cadence) {
    super(distance, duration, coords);
    this.name = 'running';
    this.cadence = cadence;
    this.calcPace();
  }
  /**
   * Caclculate the pace
   */
  calcPace() {
    //toFixed is to deal with the numbers after the comma
    this.pace = Math.ceil(this.distance / this.duration).toFixed(1);
    return this.pace;
  }
}
