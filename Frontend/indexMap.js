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
      zoom: 12.5});
    L.tileLayer('https://api.mapbox.com/styles/v1/generalgrishus/clhmfa98c01qx01p6ci5d99ww/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZ2VuZXJhbGdyaXNodXMiLCJhIjoiY2xnejFrMTJlMGY4YjNwcG54MDloaXQ3ZSJ9.N0i1jCyysnamgv6lbrJYMg', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery  <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 19,    
    }).addTo(map);
    map.zoomControl.setPosition('bottomleft');
    var layer1 = L.geoJSON(null, {layerName: 'layer1'}).addTo(map);
    var touristPoint = L.marker([56.83845, 60.60332], {icon : customIcon1 }).addTo(layer1);
    touristPoint.bindPopup('Мост "Плотинка"');
    var layer2 = L.geoJSON(null, {layerName: 'layer2'}).addTo(map);
    var marker = L.marker([56.84387, 60.65367], {icon : customIcon1 }).addTo(layer2);
    marker.bindPopup(popup);
    marker = L.marker([56.83242, 60.60744], {icon : customIcon1 }).addTo(layer2);
    marker.bindPopup('Памятник "Клавиатуре"');
    marker = L.marker([56.85878, 60.59911], {icon : customIcon1 }).addTo(layer2);
    marker.bindPopup(
        
    )
    marker = L.marker([56.82878, 60.59911], {icon : customIcon1 }).addTo(layer2);
    marker.bindPopup('Торговый центр "Гринвич"');
    marker = L.marker([56.84638, 60.67985], {icon : customIcon1 }).addTo(layer2);
    marker.bindPopup('Шарташские каменные палатки');
    // marker = L.marker([56.83242, 60.60744], {icon : customIcon1 }).addTo(map);
    // marker.bindPopup('Памятник "Клавиатуре"');
    // marker = L.marker([56.83242, 60.60744], {icon : customIcon1 }).addTo(map);
    // marker.bindPopup('Памятник "Клавиатуре"');
    // marker = L.marker([56.83242, 60.60744], {icon : customIcon1 }).addTo(map);
    // marker.bindPopup('Памятник "Клавиатуре"');
    marker = L.marker([56.8146, 60.6432], {icon : customIcon1 }).addTo(layer2);
    marker.bindPopup("Парк имени Маяковского");
    touristPoint = L.marker([56.83598, 60.61456], {icon : customIcon1 }, {
      title: "Бизнес-центр Высоцкий",
    }).addTo(layer2);
    touristPoint.bindPopup(
      '<div class = "sightWindow"><img class = "vysotskyWindow" src="img/высоцкий.jpg">' +
      "<div class = 'sightName'><h2>Смотровая площадка бизнес-центра Высоцкого</h2></div>" +
      "<p></p>" +
      "<i><b><a href='VysotskyPage.html'></a></b></i>"+
      "</div>");
    
    