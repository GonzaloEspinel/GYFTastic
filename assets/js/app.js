//// apikey: xcDxm0G6TTmYIwdkNVf9pTNRqFYAj9E4


// pets
var pets = ["DOGS", "CATS", "BIRDS", "REPTILES"];

// creates buttons for each of these
function makeButtons(){ 
	
	$('#buttonsView').empty();
	// loops through the pets array
	for (var i = 0; i < pets.length; i++){
		
		var a = $('<button>') 
		a.addClass('pet'); 
		a.attr('data-name', pets[i]); 
		a.text(pets[i]);
		$('#buttonsView').append(a);
	}
}

// handles addpet button event
$("#addPets").on("click", function(){

	
	var pet = $("#pet-input").val().trim();
	
	pets.push(pet);
	
	makeButtons();
	
	return false; 
})

// function to display gifs
function displayGifs(){
	var pet = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + pet + "&limit=9&api_key=xcDxm0G6TTmYIwdkNVf9pTNRqFYAj9E4";

		// creates ajax call
		$.ajax({url: queryURL, method: "GET"}).done(function (response) {
			console.log(response.data);
// save results as a variable
			var results = response.data;
// for loop goes through each gif and adds these variables
			for (var i = 0; i < results.length; i++) {
// creates a generic div to hold the results
				var gifDiv = $('<div class=gifs>');
				var petGif = $('<img>');
					petGif.attr('src', results[i].images.fixed_height_still.url);
// pets the rating on hover
					petGif.attr('title', "Rating: " + results[i].rating);
					petGif.attr('data-still', results[i].images.fixed_height_still.url);
					petGif.attr('data-state', 'still');
					petGif.addClass('gif');
					petGif.attr('data-animate', results[i].images.fixed_height.url);
				
				gifDiv.append(petGif)
				// gifDiv.append(p)

				$("#gifsView").prepend(gifDiv);
			}
			
		});
}


// display gifs
$(document).on("click", ".pet", displayGifs);

// makeButtons function
makeButtons();