$(document).ready(function() {
    $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5000/api/v1/places_search/',
        contentType: 'application/json',
        data: JSON.stringify({}),
        success: function(data) {
            displayPlaces(data);
        },
        error: function(xhr, status, error) {
            console.error('Error fetching places:', error);
        }
    });
});

function displayPlaces(places) {
    var placesDiv = $('#places');
    placesDiv.empty(); // Clear previous places data

    places.forEach(function(place) {
        var placeDiv = $('<div>').addClass('place');
        placeDiv.append($('<h2>').text(place.name));
        placeDiv.append($('<p>').text('Price: ' + place.price));
        // Add more information as needed

        placesDiv.append(placeDiv);
    });
}
