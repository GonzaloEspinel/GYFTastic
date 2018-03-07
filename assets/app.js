// shows
var shows = ["Starky and Hutch", "Bonanza", "The Saint", "Mission Impossible", "Happy Days", "MASH"];

// creates buttons for each of these
function makeButtons(){ 
	
	$('#buttonsView').empty();
	// loops through the shows array
	for (var i = 0; i < shows.length; i++){
		
		var a = $('<button>') 
		a.addClass('show'); 
		a.attr('data-name', shows[i]); 
		a.text(shows[i]);
		$('#buttonsView').append(a);
	}
}

// handles addShow button event
$("#addShow").on("click", function(){

	
	var show = $("#show-input").val().trim();
	
	shows.push(show);
	
	makeButtons();
	
	return false; 
})

// function to display gifs
function displayGifs(){
	var show = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&limit=9&api_key=xcDxm0G6TTmYIwdkNVf9pTNRqFYAj9E4";

		// creates ajax call
		$.ajax({url: queryURL, method: "GET"}).done(function (response) {
			console.log(response.data);
			// save results as a variable
			var results = response.data;
			// for loop goes through each gif and adds these variables
			for (var i = 0; i < results.length; i++) {
				// creates a generic div to hold the results
				var gifDiv = $('<div class=gifs>');
				var showGif = $('<img>');
					showGif.attr('src', results[i].images.fixed_height_still.url);
					// shows the rating on hover
					showGif.attr('title', "Rating: " + results[i].rating);
					showGif.attr('data-still', results[i].images.fixed_height_still.url);
					showGif.attr('data-state', 'still');
					showGif.addClass('gif');
					showGif.attr('data-animate', results[i].images.fixed_height.url);
				// var rating = results[i].rating;
				// var p = $('<p>').text('Rating: ' + rating);
				gifDiv.append(showGif)
				// gifDiv.append(p)

				$("#gifsView").prepend(gifDiv);
			}
			
		});
}


// display gifs
$(document).on("click", ".show", displayGifs);

// makeButtons function
makeButtons();