async function getGETJsonAsync() {
  const response = await getGETResponseAsync()
  if (response.status != 200)
    window.location.href = "authorizationPage.html"
  const jsonData = await response.json()
  return jsonData
}

async function getGETResponseAsync() {
  const response = await fetch(
    "http://127.0.0.1:8000/places/",
    {
      method: "GET",
      credentials: 'include'
    }
  )
  return response
}

async function postAsync(data) {
  var cookie = Cookies.get('csrftoken');
  console.log(data)
  const config = {
    method: "POST",
    headers: {
      "X-CSRFToken": cookie,
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: data
  };
  const response = await fetch("http://127.0.0.1:8000/places/", config)

  return response
}

async function putAsync(data, markerId) {
  var cookie = Cookies.get('csrftoken');
  console.log(data)
  const config = {
    method: "PUT",
    headers: {
      "X-CSRFToken": cookie,
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: data
  };
  const response = await fetch(`http://127.0.0.1:8000/places/${markerId}/`, config)

  return response
}

async function setPersonalMarkers(map, customIcon) {
  const jsonData = await getGETJsonAsync()
  for (let i = 0; i < jsonData.length; i++) {
    let obj = jsonData[i];
    const coordinates = [obj.lat, obj.lon]
    const marker = L.marker(coordinates, { icon: customIcon }).addTo(layer2);
    marker._leaflet_id = obj.id;
    marker.bindPopup(createPlaceForm(marker, obj.name, obj.description, obj.is_visited, isPersonalMarker = true));
  }
}

async function sendPersonalMarkerInfo(marker, data) {
  if (marker._leaflet_id == null) {
    const response = await postAsync(data);
    const json = await response.json();
    console.log(json);
    if (response.status == 201) {
      marker._leaflet_id = json.id;
      map.closePopup();
      marker.setIcon(customIcon1);
    }
  }
  else {
    const response = await putAsync(data, marker._leaflet_id);
    const json = await response.json();
    console.log(json);
    if (response.status == 200) {
      map.closePopup();
    }
  }
}

function createPlaceForm(marker, name, description, isVisited = false, isPersonalMarker = false) {
  var form = document.createElement("form");
  var NAME = document.createElement("input");
  $(NAME).attr("type", "text")
    .attr("name", "placeName")
    .attr("value", name);

  var DESCRIPTION = document.createElement("textarea");
  $(DESCRIPTION).attr("name", "placeDescription")
    .append(description);

  var CHECKBOX = document.createElement("input");
  $(CHECKBOX).attr("type", "checkbox")
    .attr("name", "placeIsVisited")
    .prop("checked", isVisited);

  $(form).attr("class", "placeForm")
    .append("<h1>Название: </h1>")
    .append(NAME)
    .append("<br>")
    .append("<h1>Описание: </h1>")
    .append(DESCRIPTION)
    .append("<br>")
    .append("<h1>Посещено?</h1>")
    .append(CHECKBOX);

  if (isPersonalMarker) {
    var SUBMIT = document.createElement("input");
    $(SUBMIT).attr("type", "submit")
      .attr("name", "submitButton");
    $(form).append("<br>")
      .append(SUBMIT);
  }

  $(form).submit(function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (marker._leaflet_id == null) {
      var formJson = {
        name: formData.get('placeName'),
        lat: marker.getLatLng().lat.toFixed(6),
        lon: marker.getLatLng().lng.toFixed(6),
        description: formData.get('placeDescription'),
        is_visited: CHECKBOX.checked
      };
      (async () => { await sendPersonalMarkerInfo(marker, JSON.stringify(formJson)) })();

    }
    else {
      var formJson = {
        name: formData.get('placeName'),
        description: formData.get('placeDescription'),
        is_visited: CHECKBOX.checked
      };
      (async () => { await sendPersonalMarkerInfo(marker, JSON.stringify(formJson)) })();
    }
  });

  return form
}

var map, newMarker, markerLocation;
var popup = L.popup({
  closeButton: true,
  autoClose: true,
  className: "custom-popup"
})
var customIcon1 = L.icon({
  iconUrl: 'img/icon1.png',
  iconSize: [37, 51],
  popupAnchor: [-340, 450]
});
var userIcon = L.icon({
  iconUrl: 'img/userIcon.png',
  iconSize: [37, 51],
  popupAnchor: [-340, 390]
});

map = L.map('map', {
  center: [56.8309, 60.5946],
  zoom: 12.5
});
L.tileLayer('https://api.mapbox.com/styles/v1/generalgrishus/clhmfa98c01qx01p6ci5d99ww/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ2VuZXJhbGdyaXNodXMiLCJhIjoiY2xnejFrMTJlMGY4YjNwcG54MDloaXQ3ZSJ9.N0i1jCyysnamgv6lbrJYMg', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery  <a href="http://mapbox.com">Mapbox</a>',
  maxZoom: 19,
}).addTo(map);
map.zoomControl.setPosition('bottomleft');
var layer1 = L.geoJSON(null, { layerName: 'layer1' }).addTo(map);
var touristPoint = L.marker([56.83845, 60.60332], { icon: customIcon1 }).addTo(layer1);
touristPoint.bindPopup('Мост "Плотинка"');
var layer2 = L.geoJSON(null, { layerName: 'layer2' }).addTo(map);
(async() => {await setPersonalMarkers(map, customIcon1)})();
var marker = L.marker([56.84387, 60.65367], { icon: customIcon1 }).addTo(layer2);
marker.bindPopup(popup);
marker = L.marker([56.83242, 60.60744], { icon: customIcon1 }).addTo(layer2);
marker.bindPopup('Памятник "Клавиатуре"');
marker = L.marker([56.85878, 60.59911], { icon: customIcon1 }).addTo(layer2);
marker.bindPopup(

)
marker = L.marker([56.82878, 60.59911], { icon: customIcon1 }).addTo(layer2);
marker.bindPopup('Торговый центр "Гринвич"');
marker = L.marker([56.84638, 60.67985], { icon: customIcon1 }).addTo(layer2);
marker.bindPopup('Шарташские каменные палатки');
// marker = L.marker([56.83242, 60.60744], {icon : customIcon1 }).addTo(map);
// marker.bindPopup('Памятник "Клавиатуре"');
// marker = L.marker([56.83242, 60.60744], {icon : customIcon1 }).addTo(map);
// marker.bindPopup('Памятник "Клавиатуре"');
// marker = L.marker([56.83242, 60.60744], {icon : customIcon1 }).addTo(map);
// marker.bindPopup('Памятник "Клавиатуре"');
marker = L.marker([56.8146, 60.6432], { icon: customIcon1 }).addTo(layer2);
marker.bindPopup("Парк имени Маяковского");
touristPoint = L.marker([56.83598, 60.61456], { icon: customIcon1 }, {
  title: "Бизнес-центр Высоцкий",
}).addTo(layer2);
touristPoint.bindPopup(
  '<div class = "sightWindow"><img class = "vysotskyWindow" src="img/высоцкий.jpg">' +
  "<div class = 'sightName'><h2>Смотровая площадка бизнес-центра Высоцкого</h2></div>" +
  "<p></p>" +
  "<i><b><a href='VysotskyPage.html'></a></b></i>" +
  "</div>");

