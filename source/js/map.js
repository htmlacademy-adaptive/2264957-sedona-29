ymaps.ready(init);
const geoObjects = [];
const marks = [
  {
    latitude: 34.869497,
    longitude: -111.760186,
    hintContent: '<div class="map__hint">SEDONA</div>'
  }
]

let imageSource;

let mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (mobile) {
  imageSource = {
    src: '../img/icons/map-marker.png',
    size: [27, 27],
    offset: [-13, -27]
  }
}else {
  imageSource = {
    src: '../img/icons/map-marker.png',
    size: [27, 27],
    offset: [-13, -27]
  }
};

function init(){
    // Создание карты.
    const myMap = new ymaps.Map("map", {
        center: [34.869497, -111.760186],
        zoom: 8
    });

    marks.forEach(function(mark, i){
      geoObjects.push(new ymaps.Placemark([mark.latitude, mark.longitude], {
        hintContent: mark.hintContent
      },
      {
        iconLayout: 'default#image',
        iconImageHref: imageSource.src,
        iconImageSize: imageSource.size,
        iconImageOffset: imageSource.offset
      }))
    })

    myMap.geoObjects.add(geoObjects[0])
  }
