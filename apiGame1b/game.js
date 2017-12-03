
var id;
var Card1 = "";
var Card2 = "";
var score1 = 0;
var score2 = 0;
var war1 = "";
var war2 = "";


//document.getElementById('w1').src = "game.jpg";
//document.getElementById('w2').src = "game.jpg";
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
							document.getElementById('draw').src = "shuffle.gif";
							document.getElementById('draw').style.display = "block";
							document.getElementById('p1P').innerHTML= "Player 1 Points: ";
							document.getElementById('p2P').innerHTML= "Player 2 Points: ";
document.getElementById('w1').src = "game.jpg";
document.getElementById('w2').src = "game.jpg";							
							Card1 = "";
							Card2 = "";
							setTimeout("hide()", 2750);},
							
						error: function(xhr) {
							console.log('error', xhr);
					}
	})
}

function p1Draw(){
	if(Card1 == ""){
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
								document.getElementById('draw').src = "draw.gif";
								document.getElementById('draw').style.display = "block";
								setTimeout("hide()", 1600);
								/*alert("Player 1 drew a card")*/},
							error: function(xhr) {
								console.log('error', xhr);
						}	
		})
	}
	else if(Card1 != "" && Card2 != "")
		{
			alert("You must war with the cards!")
		}
		else
			{
				alert("Player 2 Draw a Card");
			}
	

}
function p2Draw(){
	
	if(Card2 == ""){
	
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
								document.getElementById('draw').src = "draw.gif";
								document.getElementById('draw').style.display = "block";
								setTimeout("hide()", 1600);							
								/*alert("Player 2 drew a card")*/},
								error: function(xhr) {
								console.log('error', xhr);
								
						}	
						
		})
	}
	else if(Card1 != "" && Card2 != "")
		{
			alert("You must war with the cards!")
		}
		else 
			{
				alert("Player 1 Draw a Card");
			}

	
	
}

function hide() {
    document.getElementById('draw').src = "";
	document.getElementById("draw").style.display = "none";
}

function war(){
	
		if(Card1 > Card2 && Card2 != ""){
			document.getElementById('draw').src = "win1.gif";
			document.getElementById('draw').style.display = "block";			
			setTimeout("hide()", 1500);
			alert("Player 1 Wins the Hand!");
			++score1;
			console.log("Player 1s Points: " + score1);
			document.getElementById('p1P').innerHTML= "Player 1 Points: " + score1;
			document.getElementById('pic1').src = "";
			document.getElementById('pic2').src = "";
			document.getElementById('C1').value= "";
			document.getElementById('C2').value= "";
			Card1 = "";
			Card2 = "";
			
			
		}
		else if(Card1 < Card2 && Card1 !== ""){
			document.getElementById('draw').src = "win2.gif";
			document.getElementById('draw').style.display = "block";			
			setTimeout("hide()", 1500);
			alert("Player 2 Wins the Hand");
			++score2;
			console.log("Player 2s Points: " + score2);
			document.getElementById('p2P').innerHTML= "Player 2 Points: " + score2;
			document.getElementById('pic1').src = "";
			document.getElementById('pic2').src = "";
			document.getElementById('C1').value= "";
			document.getElementById('C2').value= "";
			Card1 = "";
			Card2 = "";
			
		}
		else if(Card1 == Card2 && Card1 != "" && Card2 != ""){
			alert("War!");
			realWar();
			
		}
		
		else if(Card1 == "" || Card2 == "")
		{
			alert("Both players must draw a card for war")
		}
}



function realWar()
{
	$.ajax({
					url: "https://deckofcardsapi.com/api/deck/b2fp2k3q5jrf/draw/?count=1",
					dataType : "json",
					data: { 
					a: "value"
						},
							success: function(data) {
								console.log('success', data)
								war1 = (data.cards["0"].value)
									switch(war1) {
									case "KING":
										war1 = 13;
										break;
									case "QUEEN":
										war1 = 12;
										break;
									case "JACK":
										war1 = 11;
										break;
									case "ACE":
										war1 = 14;
										break;
									default:
										war1 = Number(data.cards["0"].value)
													}	
								console.log(data.cards["0"])
								console.log(war1)							
								document.getElementById('w1').src = data.cards["0"].image;
								document.getElementById('CiD').value= data.remaining + " Cards in Deck";														
								/*alert("Player 2 drew a card")*/},
								error: function(xhr) {
								console.log('error', xhr);
								
						}	
						
		})	


	$.ajax({
						url: "https://deckofcardsapi.com/api/deck/b2fp2k3q5jrf/draw/?count=1",
						dataType : "json",
						data: { 
						a: "value"
							},
								success: function(data) {
									console.log('success', data)
									war2 = (data.cards["0"].value)
										switch(war2) {
										case "KING":
											war2 = 13;
											break;
										case "QUEEN":
											war2 = 12;
											break;
										case "JACK":
											war2 = 11;
											break;
										case "ACE":
											war2 = 14;
											break;
										default:
											war2 = Number(data.cards["0"].value)
														}	
									console.log(data.cards["0"])
									console.log(war2)							
									document.getElementById('w2').src = data.cards["0"].image;
									document.getElementById('CiD').value= data.remaining + " Cards in Deck";														
									/*alert("Player 2 drew a card")*/},
									error: function(xhr) {
									console.log('error', xhr);
									
							}	
							
			})
}			
	

