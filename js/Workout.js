'use strict';

class Workout {
  /**
   *
   * @param {*} distance in km
   * @param {*} duration in min
   * @param {*} coords [lat,lng]
   */
  constructor(distance, duration, coords) {
    this.date = new Date();
    this.id = this.setId();
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
  }

  setId() {
    const date = new Date();
    const idProd = `${date.getFullYear()}${date.getDate()}${date.getMonth()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
    console.log(idProd);
    return idProd;
  }

  getId() {
    return this.id;
  }

  getDistance() {
    return this.distance;
  }

  getDuration() {
    return this.duration;
  }

  getActivityDate() {
    const day = this.date.getDate();
    const month = months[this.date.getMonth()];
    return `${month} ${day}`;
  }
}
