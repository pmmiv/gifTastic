var btns = ['saturday night live', 'the office', 'looney toons', 'breaking bad', 'mad men', 'scrubs', 'seinfeld', 'friends', 'dragon ball z', 'jeopardy'];

function searchGiphy (show) {
	// var queryURL = "http://api.giphy.com/v1/gifs/search?q="+show+"&api_key=oGxiCi75V8lJIYCKLIoXGgRp6fG5Audl&limit=20"
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?q="+show+"&rating=pg&api_key=oGxiCi75V8lJIYCKLIoXGgRp6fG5Audl&limit=10",
		method: "GET"
	}).then(function(response) {
		console.log(response);
		for (g=0;g<response.data.length;g++) {
			// I'll need to make a div, so that I can include the rating text.
			var gif = $('<div>');
			var img = $('<img>');
			var rating = $('<br><span></span>');
			gif.addClass('gif')
			img.addClass('gifBox');
			img.attr('src', response.data[g].images.fixed_height_still.url);
			img.attr('alt', '#');
			img.attr('state', 'still');
			img.data('anim', response.data[g].images.fixed_height.url);
			img.data('still', response.data[g].images.fixed_height_still.url);
			rating.text('Rating: '+response.data[g].rating);
			gif.append(img);
			gif.append(rating);
			// if (response.data[g].rating === "g" || response.data[g].rating === "pg" ) {
			$("#gifBox").append(gif);
			// }
		}
	})
}

// destroys and recreates all the buttons in the btns array
function genGifBtn (userInput) {
	if (!btns.includes(userInput)) {
		btns.push(userInput)	
	}
	$("#btnBox").empty();
	for (i=0;i<btns.length;i++) {	
		var gifBtn = $("<button>");
		gifBtn.addClass("gifBtn btn");
		gifBtn.attr("value", btns[i])
		gifBtn.text(btns[i]);
		$("#btnBox").append(gifBtn);
	}
}

$(document).ready(function () {
	// when a gifBtn is clicked it requests a giphy search and generates the gifs
	$(document).on('click', '.gifBtn', function () {
		$('#gifBox').empty();
		searchGiphy(this.value);
	})

	$(document).on('click', '.gifBox', function () {
		if ($(this).attr("state") === "still"){
			$(this).attr('src', $(this).data("anim"));
			$(this).attr("state", "anim");
		}
		else if ($(this).attr("state") === "anim") {
			$(this).attr('src', $(this).data("still"));
			$(this).attr("state", "still");
		}
	})


	// $(".gifBtn").click(function () {
	// })

	// when the add button is pressed it generates a new button for the user input
	$("#add").click(function(event) {
		event.preventDefault();
		genGifBtn($("#userInput").val().trim());
	})

	// generates the initial list of buttons by passing a value that already exists in the array through the button generator function 
	genGifBtn("friends");

	// onclick .gif
		// if not playing loop
		// else if playing stop and reset
})
