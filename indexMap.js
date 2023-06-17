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
    .attr("placeholder", "Название места")
    .attr("class", "namePlace")
    .attr("value", name);

  var DESCRIPTION = document.createElement("textarea");
  $(DESCRIPTION).attr("type", "text")
  .attr("name", "placeDescription")
  .attr("placeholder", "Опишите ваши впечатления или ожидания")
  .attr("class", "wordPlace")
  .append(description);

    var CHECKBOX = document.createElement("input");
    $(CHECKBOX).attr("type", "checkbox")
      .attr("name", "placeIsVisited")
      .attr("id", "checkPlace")
      .attr("class", "userPlace")
      .attr("onclick", "k()")
      .prop("checked", isVisited);

  $(form).attr("class", "placeForm")
    .append('<img class = "noVisitPlace" id = "notActive" src = "img/placeNotVisited.png">')
    .append('<img class = "visitPlace" id = "active" src = "img/placeVisited.png">')
    .append(CHECKBOX)
    .append(NAME)
    .append(DESCRIPTION);
  
  if (isPersonalMarker) {
    var SUBMIT = document.createElement("input");
    $(SUBMIT).attr("type", "submit")
      .attr("name", "submitButton")
      .attr("class", "sendButton");
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
function k() {
  document.getElementById('notActive').src=(document.getElementById('checkPlace').checked)? 
     'img/placeVisited.png': 'img/placeNotVisited.png'
  
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
  popupAnchor: [-400, 390]
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
var symbolPlace = L.marker([56.83845, 60.60332], { icon: customIcon1 }).addTo(layer1);
symbolPlace.bindPopup(
  '<div class = "sightWindow"><img class = "vysotskyWindow" src="img/плотинка.jpg">' +
  '<div><a class = "sightLink" href="plotinka.html"><i><h2 class = "sightName">Плотина Городского пруда на реке Исеть</h2></i></a></div><br>' +
  "<div><span class = 'sightInf'><p>Плотина Городского пруда на реке Исеть — плотина, расположенная на реке Исеть в Историческом сквере Екатеринбурга. Построена в 1723 году, впоследствии многократно перестраивалась. Жители города называют её «Плотинка». Традиционное место массовых народных гуляний и праздников.</p></span></div>" +
  "</div>",  {className: 'custom-popup'});

symbolPlace = L.marker([56.83598, 60.61456], { icon: customIcon1 }).addTo(layer1);
symbolPlace.bindPopup(
  '<div class = "sightWindow"><img class = "vysotskyWindow" src="img/смотрПлощ.jpg">' +
  '<div><a class = "sightLink" href="VysotskyPage.html"><i><h2 class = "sightName">Смотровая площадка бизнес центра "Высоцкий"</h2></i></a></div><br>' +
  "<div><span class = 'sightInf'><p>Открытая смотровая площадка расположена в Бизнес Центре «Высоцкий» на 52 этаже — на высоте 186 метров. Отсюда взору открывается поистине фантастический вид: панорама Екатеринбурга простирается вдаль на 25 километров.</p></span></div>" +
  "</div>", {className: 'custom-popup'});

symbolPlace = L.marker([56.84473, 60.59069], { icon: customIcon1 }).addTo(layer1);
symbolPlace.bindPopup("Ельцин-центр", {className: 'custom-popup'});

symbolPlace = L.marker([56.83923, 60.60609], { icon: customIcon1 }).addTo(layer1);
symbolPlace.bindPopup("Дом Севастьянова", {className: 'custom-popup'});

symbolPlace = L.marker([56.82878, 60.59911], { icon: customIcon1 }).addTo(layer1);
symbolPlace.bindPopup('Торговый центр "Гринвич"', {className: 'custom-popup'});

symbolPlace = L.marker([56.83536, 60.59539], { icon: customIcon1 }).addTo(layer1);
symbolPlace.bindPopup('Улица Вайнера', {className: 'custom-popup'});

var layer2 = L.geoJSON(null, { layerName: 'layer2' }).addTo(map);
var museumMark = L.marker([56.83508, 60.60310], { icon: customIcon2 }).addTo(layer2);
museumMark.bindPopup(
  '<div class = "sightWindow"><img class = "vysotskyWindow" src="img/музейИсскуств.jpg">' +
  '<div><a class = "sightLink" href="museumIzobr.html"><i><h2 class = "sightName">Екатеринбургский Музей Изобразительных Искусств</h2></i></a></div><br>' +
  "<div><span class = 'sightInf'><p>Екатеринбургский музей изобразительных искусств является крупнейшим художественным музеем Урала. Датой его основания считается 1936 год, хотя история коллекций восходит к последней четверти XIX века и связана с деятельностью Уральского общества любителей естествознания (УОЛЕ).</p></span></div>" +
  "</div>", {className: 'custom-popup'});

museumMark = L.marker([56.83346, 60.61508], { icon: customIcon2 }).addTo(layer2);
museumMark.bindPopup("Музей Невьянской иконы", {className: 'custom-popup'});

museumMark = L.marker([56.84273, 60.60700], { icon: customIcon2 }).addTo(layer2);
museumMark.bindPopup(
  '<div class = "sightWindow"><img class = "vysotskyWindow" src="img/литКварт.png">' +
  '<div><a class = "sightLink" href="literatureKvartal.html"><i><h2 class = "sightName">Литературный квартал</h2></i></a></div><br>' +
  "<div><span class = 'sightInf'><p>Вряд ли какой-то другой город, помимо Екатеринбурга, может похвастаться тем, что у него есть целый литературный квартал, воссоздающий город конца XIX века. У Литературного квартала есть и другое название — Музей писателей Урала. На территории квартала расположены музеи П. П. Бажова, Д. Н. Мамина-Сибиряка, музей «Литературная жизнь Урала XX века» и др. В центре квартала часто проводятся концерты и литературные чтения.</p></span></div>" +
  "</div>", {className: 'custom-popup'});

museumMark = L.marker([56.84058, 60.61139], { icon: customIcon2 }).addTo(layer2);
museumMark.bindPopup("Музей Истории Екатеринбурга", {className: 'custom-popup'});


var layer3 = L.geoJSON(null, { layerName: 'layer3' }).addTo(map);
var churchMark = L.marker([56.84434,60.60889], { icon: customIcon3 }).addTo(layer3);
churchMark.bindPopup(
  '<div class = "sightWindow"><img class = "vysotskyWindow" src="img/храмНаКрови.jpg">' +
  '<div><a class = "sightLink" href="hramNaKrovi.html"><i><h2 class = "sightName">Храм на Крови</h2></i></a></div><br>' +
  "<div><span class = 'sightInf'><p>Самый крупный православный храм Екатеринбурга, насчитывающий 5 золотистых куполов и 14 колоколов. Храм-на-Крови интересен тем, что был возведен на месте расстрела царской семьи. Узнать подробнее об этом историческом событии можно в небольшом музее, расположенном на его территории.</p></span></div>" +
  "</div>", {className: 'custom-popup'});

churchMark = L.marker([56.94298, 60.47462], { icon: customIcon3 }).addTo(layer3);
churchMark.bindPopup(
    '<div class = "sightWindow"><img class = "vysotskyWindow" src="img/ганино.jpg">' +
    '<div><a class = "sightLink" href="VysotskyPage.html"><i><h2 class = "sightName">Ганина яма</h2></i></a></div><br>' +
    "<div><span class = 'sightInf'><p>Ганина Яма — заброшенный железный рудник, получивший название от хозяина, который был известен по прозвищу Ганя. Также это место было известно, как урочище Четыре Брата. Месторождение оказалось бедным и к началу XX века рудник забросили.</p></span></div>" +
    "</div>", {className: 'custom-popup'});

churchMark = L.marker([56.84480, 60.61272], { icon: customIcon3 }).addTo(layer3);
churchMark.bindPopup("Храм Вознесения Господня", {className: 'custom-popup'});

var layer4 = L.geoJSON(null, { layerName: 'layer4' }).addTo(map);
var parkMark = L.marker([56.82910,60.60362], { icon: customIcon4 }).addTo(layer4);
parkMark.bindPopup(
  '<div class = "sightWindow"><img class = "popupWindow" src="img/дендроПарк.jpg">' +
'<div><a class = "sightLink" href="dendroPark.html"><i><h2 class = "sightName1">Дендропарк</h2></i></a></div><br>' +
"<div><span class = 'sightInf'><p>Екатеринбургский дендропарк включает в себя два парка в Екатеринбурге, один из которых находится на пересечении улиц Мира и Первомайской в Кировском районе (Дендрологический парк), второй — на пересечении улиц 8 Марта и Куйбышева в Ленинском районе (Дендропарк).</p></span></div>" +
"</div>", {className: 'custom-popup'})
parkMark = L.marker([56.84638, 60.67985], { icon: customIcon4 }).addTo(layer4);
parkMark.bindPopup(
  '<div class = "sightWindow"><img class = "popupWindow" src="img/shartash.jpg" width = "400px" height = "250px">' +
'<div><a class = "nameSight" href="shartash.html"><i><h2 class = "sightName">Каменные палатки</h2></i></a></div><br>' +
"<div><span class = 'sightInf'><p>Шарташские каменные палатки — уникальный памятник природы, что в 2 км от самого центра Екатеринбурга. За забавным именем скрываются огромные скалистые образования, возникшие много лет назад. Название происходит от редких матрацевидных форм скал, которую они приобрели благодаря выветриванию гранитных пород. Шарташскими же они называются из-за близости к озеру Шарташ, расположенному всего в километре. </p></span></div>" +
"</div>", {className: 'custom-popup'})
parkMark = L.marker([56.8146, 60.6432], { icon: customIcon4 }).addTo(layer4);
parkMark.bindPopup('Парк Маяковского', {className: 'custom-popup'});

parkMark = L.marker([56.84627, 60.61336], { icon: customIcon4 }).addTo(layer4);
parkMark.bindPopup('Харитоновский сад', {className: 'custom-popup'});

var layer5 = L.geoJSON(null, { layerName: 'layer5' }).addTo(map);

var monumentMark = L.marker([56.83242, 60.60744], { icon: customIcon5 }).addTo(layer5);
monumentMark.bindPopup(
  '<div class = "sightWindow"><img class = "popupWindow" src="img/клава.jpg" width = "400px" height = "250px">' +
'<div><a class = "nameSight" href="pamyatnikKlaviature.html"><i><h2 class = "sightName">Памятник клавиатуре</h2></i></a></div><br>' +
"<div><span class = 'sightInf'><p>Памятник представляет собой копию клавиатуры из бетона в масштабе 30:1. Состоит из 104 клавиш весом от 100 до 500 кг, расположенных в раскладке QWERTY/ЙЦУКЕН по стандарту ANSI. Клавиши расположены в углублениях с интервалом 15 см. Общая площадь проекта — 16 × 4 м.</p></span></div>" +
"</div>", {className: 'custom-popup'});

monumentMark = L.marker([56.84302,60.61738], { icon: customIcon5 }).addTo(layer5);
monumentMark.bindPopup('Черный тюльпан');

monumentMark = L.marker([56.83206, 60.35120], { icon: customIcon5 }).addTo(layer5);
monumentMark.bindPopup('Обелиск "Европа-Азия"');

monumentMark = L.marker([56.84084, 60.62243], { icon: customIcon5 }).addTo(layer5);
monumentMark.bindPopup(
  '<div class = "sightWindow"><img class = "popupWindow" src="img/идол.jpg" width = "400px" height = "250px">' +
'<div><a class = "nameSight" href="idol.html"><i><h2 class = "sightName1">Шигирский идол</h2></i></a></div><br>' +
"<div><span class = 'sightInf'><p>Самая древняя деревянная скульптура в мире — официальный возраст более 11 000 лет — известная как «Шигирский идол», хранится в Шигирской кладовой в Музее истории и археологии Урала, который входит в состав Свердловского краеведческого музея.</p></span></div>" +
"</div>", {className: 'custom-popup'});

var layer6 = L.geoJSON(null, { layerName: 'layer6' }).addTo(map);
var theatherMark = L.marker([56.83879,60.61669], { icon: customIcon6 }).addTo(layer6);
theatherMark.bindPopup(
  '<div class = "sightWindow"><img class = "popupWindow" src="img/главтеатр.jpg" width = "400px" height = "300px">' +
'<div><a class = "nameSight" href="theathreEkb.html"><i><h2 class = "sightName">Екатеринбургский государственный академический театр оперы и балета</h2></i></a></div><br>' +
"<div><span class = 'sightInf'><p>Екатеринбургский государственный академический театр оперы и балета (также Урал Опера Балет) — стационарный театр оперы и балета в Екатеринбурге открыл свои двери для зрителей 12 октября 1912 года. Здание было построено по проекту инженера В. Н. Семёнова. Именно здесь 8 ноября (26 октября) 1917 года на экстренном заседании Екатеринбургского Совета рабочих и солдатских депутатов было объявлено об установлении советской власти в городе и на Урале.Екатеринбургский театр оперы и балета получил четыре премии на фестивале «Золотая маска-2020» в Москве, в том числе — главную «Золотую маску» за 'Лучший оперный спектакль'</p></span></div>" +
"</div>", {className: 'custom-popup'});

theatherMark = L.marker([56.84355, 60.59316], { icon: customIcon6 }).addTo(layer6);
theatherMark.bindPopup('Свердловский государственный академический театр драмы');

theatherMark = L.marker([56.84717, 60.61102], { icon: customIcon6 }).addTo(layer6);
theatherMark.bindPopup('Екатеринбургский театр юного зрителя');

var layer7 = L.geoJSON(null, { layerName: 'layer7' }).addTo(map);
(async() => {await setPersonalMarkers(map, userIcon)})();


