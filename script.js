"use-strict";
// Data Elements
const dataIP = document.querySelector(".data-ip");
const dataLocation = document.querySelector(".data-location");
const dataTimezone = document.querySelector(".data-timezone");
const dataISP = document.querySelector(".data-isp");
// Form elements
const btn = document.querySelector(".form_btn");
const form = document.querySelector(".form");
const formInput = document.querySelector(".input");

// const initializeApp = function () {};

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const inputIP = formInput.value;
//   getLocationFromIP(inputIP);
// });

// const updateData = function (ip, location, timezone, isp) {
//   dataLocation.textContent = location;
//   dataIP.textContent = ip;
//   dataTimezone.textContent = timezone;
//   dataISP.textContent = isp;
// };

// const updateMap = function (lat, lng) {
//   const map = L.map("map", {
//     center: [lat, lng],
//     zoom: 15,
//   });

//   L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     attribution:
//       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//   }).addTo(map);

//   L.marker([lat, lng]).addTo(map).bindPopup("Location.").openPopup();
// };
// updateMap();

// const getLocationFromIP = function (IP) {
//   fetch(
//     `https://geo.ipify.org/api/v2/country,city?apiKey=at_j3hYb6FvDMYSqitQpkKC0e4ZQutdl&ipAddress=${IP}`
//   )
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       let { lat, lng } = data.location;
//       let isp = data.isp;
//       let ip = data.ip;
//       let location = data.location.region;
//       let timezone = data.location.timezone;
//       // updating function here
//       updateMap(lat, lng);
//       updateData(ip, location, timezone, isp);
//       // return [lat, lng];
//       // console.log(data.location);
//     });
// };

// const getClientIP = function () {
//   fetch("https://api.ipify.org?format=json")
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       getLocationFromIP(data.ip);

//       return data.ip;
//     });
// };
// getClientIP();

// using leaflet to update the map using the latitudes and longitudes given by the getLocationFromIP function
// after geting the IP we get the location using ipify geolocation API and then call the update map function here
// getting client public IP address using ipify API
// want to introduce the past searches here using local storage
// localStorage

class App {
  #map;
  #mapEvent;

  constructor() {
    this._getClientIP();
    form.addEventListener("submit", this._formSubmitHandler.bind(this));
  }

  _getClientIP() {
    fetch("https://api.ipify.org?format=json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this._getLocationFromIP(data.ip);
      });
  }

  _getLocationFromIP(IP) {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_j3hYb6FvDMYSqitQpkKC0e4ZQutdl&ipAddress=${IP}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let { lat, lng } = data.location;
        console.log(data);
        let isp = data.isp;
        let ip = data.ip;
        let location = data.location.region;
        let timezone = data.location.timezone;
        console.log(ip, location, timezone, isp);

        this._loadMap(lat, lng);
        this._updateData(ip, location, timezone, isp);
      });
  }

  _loadMap(lat, lng) {
    this.#map = L.map("map", {
      center: [lat, lng],
      zoom: 15,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker([lat, lng]).addTo(this.#map).bindPopup("Location.").openPopup();
  }

  _updateMap(lat, lng) {}

  _updateData(ip, location, timezone, isp) {
    dataLocation.textContent = location;
    dataIP.textContent = ip;
    dataTimezone.textContent = timezone;
    dataISP.textContent = isp;
  }

  _formSubmitHandler(e) {
    e.preventDefault();
    const clientIP = formInput.value;
    this._getLocationFromIP(clientIP);
  }
}

// const app = new App();
