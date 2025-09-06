let map;
let routeControl;
let markers = [];

function initMap() {
  map = L.map("map").setView([49.8397, 24.0297], 6);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);
}

function getCurrentLocation(inputId) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        )
          .then((response) => response.json())
          .then((data) => {
            document.getElementById(inputId).value = data.display_name;
          })
          .catch((error) => {
            console.error("Помилка геокодування:", error);
            document.getElementById(inputId).value = `${lat}, ${lon}`;
          });
      },
      function (error) {
        alert("Не вдалося отримати геолокацію: " + error.message);
      }
    );
  } else {
    alert("Геолокація не підтримується вашим браузером");
  }
}

const carDatabase = {
  "toyota corolla 1.6": {
    consumption: 6.8,
    engine: "Бензиновий 1.6L (122 к.с.)",
    year: "2019-2024",
  },
  "toyota corolla 1.8": {
    consumption: 7.2,
    engine: "Бензиновий 1.8L (140 к.с.)",
    year: "2019-2024",
  },
  "toyota corolla 2.0": {
    consumption: 7.8,
    engine: "Бензиновий 2.0L (169 к.с.)",
    year: "2019-2024",
  },
  "toyota corolla hybrid": {
    consumption: 4.5,
    engine: "Гібридний 1.8L (122 к.с.)",
    year: "2019-2024",
  },

  "toyota camry 2.0": {
    consumption: 8.1,
    engine: "Бензиновий 2.0L (150 к.с.)",
    year: "2018-2024",
  },
  "toyota camry 2.5": {
    consumption: 8.7,
    engine: "Бензиновий 2.5L (181 к.с.)",
    year: "2018-2024",
  },
  "toyota camry 3.5 v6": {
    consumption: 10.2,
    engine: "Бензиновий 3.5L V6 (301 к.с.)",
    year: "2018-2024",
  },

  "toyota rav4 2.0": {
    consumption: 8.9,
    engine: "Бензиновий 2.0L (146 к.с.)",
    year: "2019-2024",
  },
  "toyota rav4 2.5": {
    consumption: 9.4,
    engine: "Бензиновий 2.5L (199 к.с.)",
    year: "2019-2024",
  },
  "toyota rav4 hybrid": {
    consumption: 5.8,
    engine: "Гібридний 2.5L (218 к.с.)",
    year: "2019-2024",
  },

  "bmw 318i": {
    consumption: 7.1,
    engine: "Бензиновий 1.5L TwinPower (136 к.с.)",
    year: "2019-2024",
  },
  "bmw 320i": {
    consumption: 7.9,
    engine: "Бензиновий 2.0L TwinPower (184 к.с.)",
    year: "2019-2024",
  },
  "bmw 330i": {
    consumption: 8.6,
    engine: "Бензиновий 2.0L TwinPower (258 к.с.)",
    year: "2019-2024",
  },
  "bmw 340i": {
    consumption: 9.8,
    engine: "Бензиновий 3.0L TwinPower (374 к.с.)",
    year: "2019-2024",
  },

  "bmw 520i": {
    consumption: 8.2,
    engine: "Бензиновий 2.0L TwinPower (184 к.с.)",
    year: "2019-2024",
  },
  "bmw 530i": {
    consumption: 8.9,
    engine: "Бензиновий 2.0L TwinPower (252 к.с.)",
    year: "2019-2024",
  },
  "bmw 540i": {
    consumption: 10.1,
    engine: "Бензиновий 3.0L TwinPower (333 к.с.)",
    year: "2019-2024",
  },

  "mercedes c180": {
    consumption: 7.3,
    engine: "Бензиновий 1.6L Turbo (156 к.с.)",
    year: "2019-2024",
  },
  "mercedes c200": {
    consumption: 8.1,
    engine: "Бензиновий 2.0L Turbo (184 к.с.)",
    year: "2019-2024",
  },
  "mercedes c250": {
    consumption: 8.7,
    engine: "Бензиновий 2.0L Turbo (211 к.с.)",
    year: "2019-2024",
  },
  "mercedes c300": {
    consumption: 9.2,
    engine: "Бензиновий 2.0L Turbo (255 к.с.)",
    year: "2019-2024",
  },

  "mercedes e200": {
    consumption: 8.4,
    engine: "Бензиновий 2.0L Turbo (184 к.с.)",
    year: "2019-2024",
  },
  "mercedes e250": {
    consumption: 8.9,
    engine: "Бензиновий 2.0L Turbo (211 к.с.)",
    year: "2019-2024",
  },
  "mercedes e300": {
    consumption: 9.5,
    engine: "Бензиновий 2.0L Turbo (255 к.с.)",
    year: "2019-2024",
  },

  "audi a3 1.0 tfsi": {
    consumption: 6.1,
    engine: "Бензиновий 1.0L TFSI (110 к.с.)",
    year: "2019-2024",
  },
  "audi a3 1.4 tfsi": {
    consumption: 6.9,
    engine: "Бензиновий 1.4L TFSI (150 к.с.)",
    year: "2019-2024",
  },
  "audi a3 2.0 tfsi": {
    consumption: 8.1,
    engine: "Бензиновий 2.0L TFSI (190 к.с.)",
    year: "2019-2024",
  },

  "audi a4 1.4 tfsi": {
    consumption: 7.2,
    engine: "Бензиновий 1.4L TFSI (150 к.с.)",
    year: "2019-2024",
  },
  "audi a4 2.0 tfsi": {
    consumption: 7.8,
    engine: "Бензиновий 2.0L TFSI (190 к.с.)",
    year: "2019-2024",
  },
  "audi a4 2.0 tfsi quattro": {
    consumption: 8.6,
    engine: "Бензиновий 2.0L TFSI Quattro (252 к.с.)",
    year: "2019-2024",
  },

  "volkswagen golf 1.0 tsi": {
    consumption: 6.2,
    engine: "Бензиновий 1.0L TSI (110 к.с.)",
    year: "2019-2024",
  },
  "volkswagen golf 1.4 tsi": {
    consumption: 7.1,
    engine: "Бензиновий 1.4L TSI (150 к.с.)",
    year: "2019-2024",
  },
  "volkswagen golf 1.5 tsi": {
    consumption: 7.4,
    engine: "Бензиновий 1.5L TSI (150 к.с.)",
    year: "2019-2024",
  },
  "volkswagen golf 2.0 tsi": {
    consumption: 8.3,
    engine: "Бензиновий 2.0L TSI (245 к.с.)",
    year: "2019-2024",
  },

  "honda civic 1.0 vtec turbo": {
    consumption: 6.4,
    engine: "Бензиновий 1.0L VTEC Turbo (129 к.с.)",
    year: "2019-2024",
  },
  "honda civic 1.5 vtec turbo": {
    consumption: 6.9,
    engine: "Бензиновий 1.5L VTEC Turbo (182 к.с.)",
    year: "2019-2024",
  },
  "honda civic 2.0 vtec": {
    consumption: 8.1,
    engine: "Бензиновий 2.0L VTEC (158 к.с.)",
    year: "2019-2024",
  },

  "ford focus 1.0 ecoboost": {
    consumption: 6.5,
    engine: "Бензиновий 1.0L EcoBoost (125 к.с.)",
    year: "2018-2024",
  },
  "ford focus 1.5 ecoboost": {
    consumption: 7.2,
    engine: "Бензиновий 1.5L EcoBoost (150 к.с.)",
    year: "2018-2024",
  },
  "ford focus 2.0 ecoboost": {
    consumption: 8.9,
    engine: "Бензиновий 2.0L EcoBoost (252 к.с.)",
    year: "2018-2024",
  },

  "hyundai elantra 1.6": {
    consumption: 6.8,
    engine: "Бензиновий 1.6L MPI (123 к.с.)",
    year: "2019-2024",
  },
  "hyundai elantra 1.6 turbo": {
    consumption: 7.4,
    engine: "Бензиновий 1.6L Turbo (201 к.с.)",
    year: "2019-2024",
  },
  "hyundai elantra 2.0": {
    consumption: 8.1,
    engine: "Бензиновий 2.0L MPI (149 к.с.)",
    year: "2019-2024",
  },

  "kia rio 1.25": {
    consumption: 5.9,
    engine: "Бензиновий 1.25L MPI (84 к.с.)",
    year: "2017-2024",
  },
  "kia rio 1.4": {
    consumption: 6.4,
    engine: "Бензиновий 1.4L MPI (100 к.с.)",
    year: "2017-2024",
  },
  "kia rio 1.6": {
    consumption: 7.1,
    engine: "Бензиновий 1.6L MPI (123 к.с.)",
    year: "2017-2024",
  },

  "skoda octavia 1.0 tsi": {
    consumption: 6.2,
    engine: "Бензиновий 1.0L TSI (110 к.с.)",
    year: "2019-2024",
  },
  "skoda octavia 1.4 tsi": {
    consumption: 6.9,
    engine: "Бензиновий 1.4L TSI (150 к.с.)",
    year: "2019-2024",
  },
  "skoda octavia 1.5 tsi": {
    consumption: 7.3,
    engine: "Бензиновий 1.5L TSI (150 к.с.)",
    year: "2019-2024",
  },
  "skoda octavia 2.0 tsi": {
    consumption: 8.1,
    engine: "Бензиновий 2.0L TSI (190 к.с.)",
    year: "2019-2024",
  },

  "mazda 3 1.5 skyactiv": {
    consumption: 6.4,
    engine: "Бензиновий 1.5L SKYACTIV (120 к.с.)",
    year: "2019-2024",
  },
  "mazda 3 2.0 skyactiv": {
    consumption: 7.1,
    engine: "Бензиновий 2.0L SKYACTIV (165 к.с.)",
    year: "2019-2024",
  },
  "mazda 3 2.5 skyactiv": {
    consumption: 8.2,
    engine: "Бензиновий 2.5L SKYACTIV (194 к.с.)",
    year: "2019-2024",
  },

  "nissan sentra 1.6": {
    consumption: 6.9,
    engine: "Бензиновий 1.6L (124 к.с.)",
    year: "2019-2024",
  },
  "nissan sentra 1.8": {
    consumption: 7.6,
    engine: "Бензиновий 1.8L (130 к.с.)",
    year: "2019-2024",
  },

  "bmw x3 2.0": {
    consumption: 9.4,
    engine: "Бензиновий 2.0L TwinPower (184 к.с.)",
    year: "2019-2024",
  },
  "bmw x3 3.0": {
    consumption: 11.2,
    engine: "Бензиновий 3.0L TwinPower (382 к.с.)",
    year: "2019-2024",
  },

  "mercedes glc 200": {
    consumption: 8.8,
    engine: "Бензиновий 2.0L Turbo (184 к.с.)",
    year: "2019-2024",
  },
  "mercedes glc 300": {
    consumption: 9.8,
    engine: "Бензиновий 2.0L Turbo (255 к.с.)",
    year: "2019-2024",
  },

  "audi q5 2.0 tfsi": {
    consumption: 9.1,
    engine: "Бензиновий 2.0L TFSI (252 к.с.)",
    year: "2019-2024",
  },
  "audi q5 3.0 tfsi": {
    consumption: 10.8,
    engine: "Бензиновий 3.0L TFSI (354 к.с.)",
    year: "2019-2024",
  },

  "bmw 320d": {
    consumption: 5.8,
    engine: "Дизельний 2.0L (190 к.с.)",
    year: "2019-2024",
  },
  "mercedes c220d": {
    consumption: 5.9,
    engine: "Дизельний 2.0L (194 к.с.)",
    year: "2019-2024",
  },
  "audi a4 2.0 tdi": {
    consumption: 5.6,
    engine: "Дизельний 2.0L TDI (190 к.с.)",
    year: "2019-2024",
  },
  "volkswagen golf 2.0 tdi": {
    consumption: 5.2,
    engine: "Дизельний 2.0L TDI (150 к.с.)",
    year: "2019-2024",
  },
};

async function searchCarData() {
  const carModel = document.getElementById("carModel").value.trim();
  if (!carModel) {
    document.getElementById("results").innerHTML = "";
    return;
  }

  const loading = document.createElement("div");
  loading.className = "loading";
  loading.innerHTML =
    '<div class="spinner"></div>Шукаємо дані про автомобіль...';
  document.getElementById("results").innerHTML = "";
  document.getElementById("results").appendChild(loading);

  try {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const fuelData = findCarInDatabase(carModel);

    if (fuelData) {
      document.getElementById("fuelConsumption").value = fuelData.consumption;
      document.getElementById("results").innerHTML = `
                        <div class="results show">
                            <h3>✅ Знайдено в базі даних</h3>
                            <div class="result-item">
                                <span>Середня витрата:</span>
                                <span><strong>${fuelData.consumption} л/100км</strong></span>
                            </div>
                            <div class="result-item">
                                <span>Тип двигуна:</span>
                                <span>${fuelData.engine}</span>
                            </div>
                            <div class="result-item">
                                <span>Роки випуску:</span>
                                <span>${fuelData.year}</span>
                            </div>
                        </div>
                    `;
    } else {
      const suggestions = findSimilarCars(carModel);
      let suggestionText = "";

      if (suggestions.length > 0) {
        suggestionText = `<div style="margin-top: 15px; font-size: 0.9rem;">
                            <strong>Можливо, ви мали на увазі:</strong><br>
                            ${suggestions
                              .slice(0, 3)
                              .map(
                                (s) => `• ${s.name} (${s.consumption} л/100км)`
                              )
                              .join("<br>")}
                        </div>`;
      }

      document.getElementById("results").innerHTML = `
                        <div class="error">
                            ❌ Не знайдено точних даних для "${carModel}". 
                            <br>Введіть витрату палива вручну або спробуйте інший запит.
                            ${suggestionText}
                        </div>
                    `;
    }
  } catch (error) {
    document.getElementById("results").innerHTML = `
                    <div class="error">
                        ❌ Помилка пошуку: ${error.message}
                    </div>
                `;
  }
}

function findCarInDatabase(searchQuery) {
  const query = searchQuery.toLowerCase().trim();

  if (carDatabase[query]) {
    return carDatabase[query];
  }

  for (const key in carDatabase) {
    const keyWords = key.split(" ");
    const queryWords = query.split(" ");

    let matches = 0;
    for (const keyWord of keyWords) {
      for (const queryWord of queryWords) {
        if (queryWord.includes(keyWord) || keyWord.includes(queryWord)) {
          matches++;
          break;
        }
      }
    }

    if (matches >= keyWords.length) {
      return carDatabase[key];
    }
  }

  return null;
}

function findSimilarCars(searchQuery) {
  const query = searchQuery.toLowerCase().trim();
  const suggestions = [];

  for (const key in carDatabase) {
    const keyWords = key.split(" ");
    const queryWords = query.split(" ");

    let partialMatches = 0;
    for (const keyWord of keyWords) {
      for (const queryWord of queryWords) {
        if (keyWord.includes(queryWord) || queryWord.includes(keyWord)) {
          partialMatches++;
          break;
        }
      }
    }

    if (partialMatches > 0) {
      suggestions.push({
        name: key
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        consumption: carDatabase[key].consumption,
        matches: partialMatches,
      });
    }
  }

  return suggestions.sort((a, b) => b.matches - a.matches);
}

async function geocodeAddress(address) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}&limit=1`
  );
  const data = await response.json();
  if (data.length === 0) {
    throw new Error(`Не знайдено адресу: ${address}`);
  }
  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon),
    display_name: data[0].display_name,
  };
}

async function calculateRoute() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const fuelConsumption = parseFloat(
    document.getElementById("fuelConsumption").value
  );
  const fuelPrice = parseFloat(document.getElementById("fuelPrice").value);
  const cityDriving = document.getElementById("cityDriving").checked;

  if (!from || !to) {
    alert("Введіть початкову та кінцеву точки");
    return;
  }

  if (!fuelConsumption || !fuelPrice) {
    alert("Введіть витрату палива та ціну");
    return;
  }

  const loading = document.createElement("div");
  loading.className = "loading";
  loading.innerHTML =
    '<div class="spinner"></div>Розраховуємо реальний автомобільний маршрут...';
  document.getElementById("results").innerHTML = "";
  document.getElementById("results").appendChild(loading);

  try {
    const fromCoords = await geocodeAddress(from);
    const toCoords = await geocodeAddress(to);

    markers.forEach((marker) => map.removeLayer(marker));
    markers = [];

    if (routeControl) {
      map.removeControl(routeControl);
    }

    const routePromise = new Promise((resolve, reject) => {
      routeControl = L.Routing.control({
        waypoints: [
          L.latLng(fromCoords.lat, fromCoords.lon),
          L.latLng(toCoords.lat, toCoords.lon),
        ],
        routeWhileDragging: false,
        addWaypoints: false,
        createMarker: function () {
          return null;
        },
        lineOptions: {
          styles: [{ color: "#27ae60", weight: 5, opacity: 0.8 }],
        },
      })
        .on("routesfound", function (e) {
          const routes = e.routes;
          const route = routes[0];
          const distance = route.summary.totalDistance / 1000;
          resolve(distance);
        })
        .on("routingerror", function (e) {
          reject(new Error("Не вдалося побудувати маршрут"));
        })
        .addTo(map);
    });

    const startMarker = L.marker([fromCoords.lat, fromCoords.lon])
      .addTo(map)
      .bindPopup(`🚀 Початок: ${fromCoords.display_name}`);

    const endMarker = L.marker([toCoords.lat, toCoords.lon])
      .addTo(map)
      .bindPopup(`🏁 Кінець: ${toCoords.display_name}`);

    markers.push(startMarker, endMarker);

    const realDistance = await routePromise;

    let adjustedConsumption = fuelConsumption;
    if (cityDriving) {
      adjustedConsumption *= 1.15;
    }

    const fuelNeeded = (realDistance * adjustedConsumption) / 100;
    const totalCost = fuelNeeded * fuelPrice;
    const estimatedTime = Math.round((realDistance / 80) * 60);
    document.getElementById("results").innerHTML = `
                    <div class="results show">
                        <h3>🎯 Результати розрахунку</h3>
                        <div class="result-item">
                            <span>Реальна відстань маршруту:</span>
                            <span><strong>${realDistance.toFixed(
                              1
                            )} км</strong></span>
                        </div>
                        <div class="result-item">
                            <span>Орієнтовний час в дорозі:</span>
                            <span>${Math.floor(estimatedTime / 60)} год ${
      estimatedTime % 60
    } хв</span>
                        </div>
                        <div class="result-item">
                            <span>Витрата палива:</span>
                            <span><strong>${fuelNeeded.toFixed(
                              1
                            )} л</strong></span>
                        </div>
                        <div class="result-item">
                            <span>Загальна вартість палива:</span>
                            <span><strong>${totalCost.toFixed(
                              0
                            )} грн</strong></span>
                        </div>
                        ${
                          cityDriving
                            ? '<div style="font-size: 0.9rem; opacity: 0.9; margin-top: 10px;">* Враховано +15% для міського водіння</div>'
                            : ""
                        }
                    </div>
                `;

    setTimeout(() => {
      const group = new L.featureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.1));
    }, 1000);
  } catch (error) {
    document.getElementById("results").innerHTML = `
                    <div class="error">
                        ❌ Помилка: ${error.message}
                    </div>
                `;
  }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

document.addEventListener("DOMContentLoaded", function () {
  initMap();

  setupAddressAutocomplete("from");
  setupAddressAutocomplete("to");

  setupCarAutocomplete();
});

function setupCarAutocomplete() {
  const input = document.getElementById("carModel");
  const suggestionsDiv = document.getElementById("carSuggestions");
  const searchBtn = document.getElementById("searchBtn");
  let timeout;

  function updateSearchButtonVisibility() {
    if (input.value.trim().length > 0) {
      searchBtn.style.display = "block";
    } else {
      searchBtn.style.display = "none";
      suggestionsDiv.style.display = "none";
    }
  }

  updateSearchButtonVisibility();

  input.addEventListener("input", function () {
    clearTimeout(timeout);
    const query = this.value.trim();

    updateSearchButtonVisibility();

    if (query.length < 2) {
      suggestionsDiv.style.display = "none";
      return;
    }

    timeout = setTimeout(() => {
      const suggestions = getCarSuggestions(query);
      displayCarSuggestions(suggestions, suggestionsDiv);
    }, 300);
  });

  document.addEventListener("click", function (e) {
    if (
      !e.target.closest("#carModel") &&
      !e.target.closest("#carSuggestions")
    ) {
      suggestionsDiv.style.display = "none";
    }
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      suggestionsDiv.style.display = "none";
    }
  });
}

function getCarSuggestions(query) {
  const suggestions = [];
  const queryLower = query.toLowerCase();

  for (const key in carDatabase) {
    const carName = key
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    if (key.toLowerCase().includes(queryLower)) {
      suggestions.push({
        key: key,
        name: carName,
        ...carDatabase[key],
      });
    }

    if (suggestions.length >= 8) break;
  }

  return suggestions;
}

function displayCarSuggestions(suggestions, container) {
  if (suggestions.length === 0) {
    container.style.display = "none";
    return;
  }

  container.innerHTML = suggestions
    .map(
      (suggestion) => `
                <div class="suggestion-item" onclick="selectCarSuggestion('${suggestion.key}', '${suggestion.name}', ${suggestion.consumption})">
                    <div class="suggestion-main">${suggestion.name}</div>
                    <div class="suggestion-details">${suggestion.consumption} л/100км • ${suggestion.engine}</div>
                </div>
            `
    )
    .join("");

  container.style.display = "block";
}

function selectCarSuggestion(key, name, consumption) {
  document.getElementById("carModel").value = name;
  document.getElementById("fuelConsumption").value = consumption;
  document.getElementById("carSuggestions").style.display = "none";

  const carData = carDatabase[key];
  document.getElementById("results").innerHTML = `
                <div class="results show">
                    <h3>✅ Автомобіль вибрано</h3>
                    <div class="result-item">
                        <span>Модель:</span>
                        <span><strong>${name}</strong></span>
                    </div>
                    <div class="result-item">
                        <span>Витрата палива:</span>
                        <span><strong>${consumption} л/100км</strong></span>
                    </div>
                    <div class="result-item">
                        <span>Двигун:</span>
                        <span>${carData.engine}</span>
                    </div>
                    <div class="result-item">
                        <span>Роки:</span>
                        <span>${carData.year}</span>
                    </div>
                </div>
            `;
}

function setupAddressAutocomplete(inputId) {
  const input = document.getElementById(inputId);
  let timeout;

  input.addEventListener("input", function () {
    clearTimeout(timeout);
    const query = this.value.trim();

    if (query.length < 3) return;

    timeout = setTimeout(async () => {
      try {
        await showLocationOnMap(query, inputId);
      } catch (error) {
        console.log("Помилка пошуку локації:", error);
      }
    }, 1000);
  });
}

async function showLocationOnMap(address, inputId) {
  try {
    const coords = await geocodeAddress(address);

    markers = markers.filter((marker) => {
      if (marker.options.inputId === inputId) {
        map.removeLayer(marker);
        return false;
      }
      return true;
    });

    const icon = inputId === "from" ? "🚀" : "🏁";
    const popup = inputId === "from" ? "Початок маршруту" : "Кінець маршруту";

    const marker = L.marker([coords.lat, coords.lon], {
      inputId: inputId,
    })
      .addTo(map)
      .bindPopup(`${icon} ${popup}<br><small>${coords.display_name}</small>`);

    markers.push(marker);

    map.setView([coords.lat, coords.lon], 12);

    const fromMarker = markers.find((m) => m.options.inputId === "from");
    const toMarker = markers.find((m) => m.options.inputId === "to");

    if (
      fromMarker &&
      toMarker &&
      document.getElementById("from").value &&
      document.getElementById("to").value
    ) {
      showPreviewRoute(fromMarker.getLatLng(), toMarker.getLatLng());
    }
  } catch (error) {
    console.log("Не вдалося знайти локацію:", address);
  }
}

function showPreviewRoute(fromLatLng, toLatLng) {
  if (routeControl) {
    map.removeControl(routeControl);
  }

  routeControl = L.Routing.control({
    waypoints: [fromLatLng, toLatLng],
    routeWhileDragging: false,
    addWaypoints: false,
    createMarker: function () {
      return null;
    },
    lineOptions: {
      styles: [{ color: "#667eea", weight: 4, opacity: 0.7 }],
    },
  }).addTo(map);

  setTimeout(() => {
    const group = new L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.1));
  }, 500);
}
