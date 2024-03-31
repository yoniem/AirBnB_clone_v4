$(document).ready(function() {
    // Populate filters with states and cities data
    $.ajax({
        type: 'GET',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        success: function(data) {
            populateFilters(data);
        },
        error: function(xhr, status, error) {
            console.error('Error fetching places:', error);
        }
    });

    // Handle filter button click
    $('#filterButton').click(function() {
        var amenities = [];

        // Collect the IDs of checked amenities
        $('input[type="checkbox"]:checked').each(function() {
            amenities.push($(this).data('id'));
        });

        // Collect the IDs of checked states
        var states = [];
        $('#states input[type="checkbox"]:checked').each(function() {
            states.push($(this).data('id'));
        });

        // Collect the IDs of checked cities
        var cities = [];
        $('#cities input[type="checkbox"]:checked').each(function() {
            cities.push($(this).data('id'));
        });

        // Send the list of amenities, states, and cities as JSON to the server
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5000/api/v1/places_search/',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: amenities, states: states, cities: cities }),
            success: function(data) {
                displayPlaces(data);
            },
            error: function(xhr, status, error) {
                console.error('Error fetching places:', error);
            }
        });
    });
});

function populateFilters(data) {
    var states = data['states'];
    var cities = data['cities'];

    states.forEach(function(state) {
        $('#states').append('<li><input type="checkbox" data-id="' + state.id + '"> ' + state.name + '</li>');
    });

    cities.forEach(function(city) {
        $('#cities').append('<li><input type="checkbox" data-id="' + city.id + '"> ' + city.name + '</li>');
    });
}

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
