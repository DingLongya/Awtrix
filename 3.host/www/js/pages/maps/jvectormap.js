$(function() {
    $('#world-map-markers').vectorMap({
        map: 'world_mill_en',
        normalizeFunction: 'polynomial',
        hoverOpacity: 0.7,
        hoverColor: false,
        backgroundColor: 'transparent',
        regionStyle: {
            initial: {
                fill: 'rgba(210, 214, 222, 1)',
                "fill-opacity": 1,
                stroke: 'none',
                "stroke-width": 0,
                "stroke-opacity": 1
            },

        },
        markerStyle: {
            initial: {
                fill: "#188a9a",
                stroke: "#383f47"
            }
        },

    });

});


function addMarker(index, lat, lon) {
    var mapObject = $('#world-map-markers').vectorMap('get', 'mapObject');
    mapObject.addMarker(index, { latLng: [lat, lon], image: 'http://jvectormap.com/img/icon-np-2.png' });
};