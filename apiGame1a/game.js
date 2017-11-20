
var id;

function newGame(){

	$.ajax({
				url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
				dataType : "json",
				data: { 
				a: "deck_id"
				},
				success: function(data) {
					console.log('success', data)
					var id = data.deck_id
					console.log(id)
					alert("Deck Shuffled")},
				error: function(xhr) {
					console.log('error', xhr);
				}
	})
}

function p1Draw(){
	/*url: "https://deckofcardsapi.com/api/deck/deck_id/draw/?count=2",
				dataType : "json",
				data: { 
				a: "value","suit"
				},
				success: function(data) {
					console.log('success', data)					
					console.log(id)
					alert("Deck Shuffled")},
				error: function(xhr) {
					console.log('error', xhr);
				}*/	
}

function p2Draw(){
	
}