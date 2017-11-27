
var id;
var Card1;
var Card2;
var score1 = 0;
var score2 = 0;

function newGame(){

	$.ajax({
				//url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1", If a new Deck ID is needed
				url: "https://deckofcardsapi.com/api/deck/b2fp2k3q5jrf/shuffle/",
				dataType : "json",
				data: { 
				a: "deck_id"
					},
						success: function(data) {
							console.log('success', data)
							var id = data.deck_id
							console.log(id)
							document.getElementById('CiD').value= data.remaining + " Cards in Deck";
							document.getElementById('C1').value= "";
							document.getElementById('pic1').src = "";
							document.getElementById('C2').value= "";
							document.getElementById('pic2').src = "";
							alert("Deck Shuffled")},
							
						error: function(xhr) {
							console.log('error', xhr);
					}
	})
}

function p1Draw(){
	
	$.ajax({
				url: "https://deckofcardsapi.com/api/deck/b2fp2k3q5jrf/draw/?count=1",
				dataType : "json",
				data: { 
				a: "value"
					},
						success: function(data) {
							console.log('success', data)
							Card1 = (data.cards["0"].value)
								switch(Card1) {
								case "KING":
									Card1 = 13;
									break;
								case "QUEEN":
									Card1 = 12;
									break;
								case "JACK":
									Card1 = 11;
									break;
								case "ACE":
									Card1 = 14;
									break;
								default:
									Card1 = Number(data.cards["0"].value)
												}
							console.log(data.cards["0"])
							console.log(Card1)							
							document.getElementById('C1').value= data.cards["0"].value + " of " + data.cards["0"].suit;
							document.getElementById('pic1').src = data.cards["0"].image;
							document.getElementById('CiD').value= data.remaining + " Cards in Deck";
							/*alert("Player 1 drew a card")*/},
						error: function(xhr) {
							console.log('error', xhr);
					}	
	})
	

}
function p2Draw(){
	
	$.ajax({
				url: "https://deckofcardsapi.com/api/deck/b2fp2k3q5jrf/draw/?count=1",
				dataType : "json",
				data: { 
				a: "value"
					},
						success: function(data) {
							console.log('success', data)
							Card2 = (data.cards["0"].value)
								switch(Card2) {
								case "KING":
									Card2 = 13;
									break;
								case "QUEEN":
									Card2 = 12;
									break;
								case "JACK":
									Card2 = 11;
									break;
								case "ACE":
									Card2 = 14;
									break;
								default:
									Card2 = Number(data.cards["0"].value)
												}	
							console.log(data.cards["0"])
							console.log(Card2)							
							document.getElementById('C2').value= data.cards["0"].value + " of " + data.cards["0"].suit;
							document.getElementById('pic2').src = data.cards["0"].image;
							document.getElementById('CiD').value= data.remaining + " Cards in Deck";							
							/*alert("Player 2 drew a card")*/},
							error: function(xhr) {
							console.log('error', xhr);
							
					}	
					
	})

	
	
}

function war(){
	
		if(Card1 > Card2){
			alert("Player 1 Wins the Hand!");
			++score1;
			console.log("Player 1s Points: " + score1);
		}
		else if(Card1 < Card2){
			alert("Player 2 Wins the Hand");
			++score2;
			console.log("Player 2s Points: " + score2);
		}
}