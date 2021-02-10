'use strict';
/**
 * Workout class that is used to create general workouts object
 */
class Workout {
  /**
   * build a new workout object
   * @param {String|Number} distance in km
   * @param {String|Number} duration in min
   * @param {[Number,Number]} coords [lat,lng]
   */
  constructor(distance, duration, coords) {
    this.date = new Date();
    this.id = this.setId();
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
  }
  /**
   * Set the id of the created workout
   */
  setId() {
    const date = new Date();
    const idProd = `${date.getFullYear()}${date.getDate()}${date.getMonth()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
    console.log(idProd);
    return idProd;
  }

  /**
   * return the Id of the workout
   */
  getId() {
    return this.id;
  }

  /**
   * Return the distance
   */
  getDistance() {
    return this.distance;
  }

  /**
   * Return the duration
   */
  getDuration() {
    return this.duration;
  }

  /**
   * Return a formated date for the workout
   */
  getActivityDate() {
    const day = this.date.getDate();
    const month = months[this.date.getMonth()];
    return `${month} ${day}`;
  }
}
