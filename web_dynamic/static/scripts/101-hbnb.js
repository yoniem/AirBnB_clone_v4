$(document).ready(function() {
    var reviewsVisible = false;

    $('#toggleReviews').click(function() {
        if (reviewsVisible) {
            hideReviews();
        } else {
            fetchReviews();
        }
    });

    function fetchReviews() {
        $.ajax({
            type: 'POST',
            url: 'http://0.0.0.0:5000/api/v1/places_search/',
            contentType: 'application/json',
            success: function(data) {
                displayReviews(data);
                $('#toggleReviews').text('Hide');
                reviewsVisible = true;
            },
            error: function(xhr, status, error) {
                console.error('Error fetching reviews:', error);
            }
        });
    }

    function displayReviews(reviews) {
        var reviewsDiv = $('#reviews');
        reviewsDiv.empty(); // Clear previous reviews data

        reviews.forEach(function(review) {
            var reviewDiv = $('<div>').addClass('review');
            reviewDiv.append($('<p>').text('User: ' + review.user_id));
            reviewDiv.append($('<p>').text('Review: ' + review.text));

            reviewsDiv.append(reviewDiv);
        });
    }

    function hideReviews() {
        $('#reviews').empty();
        $('#toggleReviews').text('Show');
        reviewsVisible = false;
    }
});
