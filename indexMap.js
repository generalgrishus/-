async function getGETJsonAsync() {
  const response = await getGETResponseAsync()
  if (response.status != 200)
    window.location.href = "registerPage.html"
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
    const marker = L.marker(coordinates, { icon: customIcon }).addTo(layer7);
    marker._leaflet_id = obj.id;
    marker.bindPopup(createPlaceForm(marker, obj.name, obj.description, obj.is_visited, isPersonalMarker = true), {className: 'user-popup'});

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
      marker.setIcon(userIcon);
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
    .append("<h1>Название:</h1>")
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
var userPopup = L.popup({
  closeButton: true,
  autoClose: true,
  className: "user-popup"
})
var customIcon1 = L.icon({
  iconUrl: 'img/pinkIcon.png',
  iconSize: [25, 39],
  popupAnchor: [-340, 450]
});
var customIcon2 = L.icon({
  iconUrl: 'img/blueIcon.png',
  iconSize: [25, 39],
  popupAnchor: [-340, 450]
});
var customIcon3 = L.icon({
  iconUrl: 'img/orangeIcon.png',
  iconSize: [25, 39],
  popupAnchor: [-340, 450]
});
var customIcon4 = L.icon({
  iconUrl: 'img/greenIcon.png',
  iconSize: [25, 39],
  popupAnchor: [-340, 450]
});
var customIcon5 = L.icon({
  iconUrl: 'img/yellowIcon.png',
  iconSize: [25, 39],
  popupAnchor: [-340, 450]
});
var customIcon6 = L.icon({
  iconUrl: 'img/purpleIcon.png',
  iconSize: [25, 39],
  popupAnchor: [-340, 450]
});

var userIcon = L.icon({
  iconUrl: 'img/userIcon.png',
  iconSize: [25, 39],
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
var interestingPlace = L.marker([56.83845, 60.60332], { icon: customIcon1 }).addTo(layer1);
interestingPlace.bindPopup('Мост "Плотинка"',  {className: 'custom-popup'});
marker = L.marker([56.8146, 60.6432], { icon: customIcon1 }).addTo(layer1);
marker.bindPopup('Парк Маяковского', {className: 'custom-popup'});
interestingPlace = L.marker([56.83598, 60.61456], { icon: customIcon1 }, {
  title: "Бизнес-центр Высоцкий",
}).addTo(layer1);
interestingPlace.bindPopup(
  '<div class = "sightWindow"><img class = "vysotskyWindow" src="img/смотрПлощ.jpg">' +
  '<div><a class = "sightLink" href="VysotskyPage.html"><i><h2 class = "sightName">Смотровая площадка бизнес центра "Высоцкий"</h2></i></a></div><br>' +
  "<div><span class = 'sightInf'><p>Открытая смотровая площадка расположена в Бизнес Центре «Высоцкий» на 52 этаже — на высоте 186 метров. Отсюда взору открывается поистине фантастический вид: панорама Екатеринбурга простирается вдаль на 25 километров.</p></span></div>" +
  "</div>", {className: 'custom-popup'});
var layer2 = L.geoJSON(null, { layerName: 'layer2' }).addTo(map);
var marker = L.marker([56.84387, 60.65367], { icon: customIcon2 }).addTo(layer2);
marker.bindPopup(popup, {className: 'custom-popup'});
var layer3 = L.geoJSON(null, { layerName: 'layer3' }).addTo(map);
marker = L.marker([56.83242, 60.60744], { icon: customIcon3 }).addTo(layer3);
marker.bindPopup('Памятник "Клавиатуре"', {className: 'custom-popup'});
var layer4 = L.geoJSON(null, { layerName: 'layer4' }).addTo(map);
var park = L.marker([56.82910,60.60362], { icon: customIcon4 }).addTo(layer4);
park.bindPopup(
  '<div class = "sightWindow"><img class = "popupWindow" src="img/дендроПарк.jpg">' +
'<div><a class = "sightLink" href="dendroPark.html"><i><h2 class = "sightName1">Дендропарк</h2></i></a></div><br>' +
"<div><span class = 'sightInf'><p>Екатеринбургский дендропарк включает в себя два парка в Екатеринбурге, один из которых находится на пересечении улиц Мира и Первомайской в Кировском районе (Дендрологический парк), второй — на пересечении улиц 8 Марта и Куйбышева в Ленинском районе (Дендропарк).</p></span></div>" +
"</div>", {className: 'custom-popup'})
park = L.marker([56.84638, 60.67985], { icon: customIcon4 }).addTo(layer4);
park.bindPopup(
  '<div class = "sightWindow"><img class = "popupWindow" src="img/shartash.jpg" width = "400px" height = "250px">' +
'<div><a class = "nameSight" href="shartash.html"><i><h2 class = "sightName">Каменные палатки</h2></i></a></div><br>' +
"<div><span class = 'sightInf'><p>Шарташские каменные палатки — уникальный памятник природы, что в 2 км от самого центра Екатеринбурга. За забавным именем скрываются огромные скалистые образования, возникшие много лет назад. Название происходит от редких матрацевидных форм скал, которую они приобрели благодаря выветриванию гранитных пород. Шарташскими же они называются из-за близости к озеру Шарташ, расположенному всего в километре. </p></span></div>" +
"</div>", {className: 'custom-popup'})
var layer5 = L.geoJSON(null, { layerName: 'layer5' }).addTo(map);
marker = L.marker([56.82878, 60.59911], { icon: customIcon5 }).addTo(layer5);
marker.bindPopup('Торговый центр "Гринвич"', {className: 'custom-popup'});
var layer6 = L.geoJSON(null, { layerName: 'layer6' }).addTo(map);
marker = L.marker([56.84638, 60.99985], { icon: customIcon6 }).addTo(layer6);
marker.bindPopup('Шарташские каменные палатки', {className: 'custom-popup'});
var layer7 = L.geoJSON(null, { layerName: 'layer7' }).addTo(map);
(async() => {await setPersonalMarkers(map, userIcon)})();

// marker = L.marker([56.83242, 60.60744], {icon : customIcon1 }).addTo(map);
// marker.bindPopup('Памятник "Клавиатуре"');
// marker = L.marker([56.83242, 60.60744], {icon : customIcon1 }).addTo(map);
// marker.bindPopup('Памятник "Клавиатуре"');
// marker = L.marker([56.83242, 60.60744], {icon : customIcon1 }).addTo(map);
// marker.bindPopup('Памятник "Клавиатуре"');


