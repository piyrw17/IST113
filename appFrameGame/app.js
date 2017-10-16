"use strict";

// using a function contructor form to create an object
function MyApp()
{
	var version = "v1.0";

	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}

	// creating a public function
	this.start = function()
	{
		$("#app>header").append(version);
		setStatus("ready");
	};
	var count = 0;

function new_game ( )
{
	count = 0;
  document.getElementById("userGuess").value = "";
  //my_number = rand ( 100 );
  
 
}


function make_guess ( )
{
	/*var x = document.getElementById("userNumber");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }*/
  var userNumber = parseInt(document.getElementById("userNumber").value);
  
  var userGuess = parseInt(document.getElementById("userGuess").value);
  
  
  
  
  if ( userGuess > userNumber )
  {
	  count++;
    document.getElementById("results").innerHTML = "The Guess was too high!";
  }
  else if ( userGuess < userNumber )
  {
	  count++;
    document.getElementById("results").innerHTML = "The Guess was too low!";
  }
  else
  {
	  count++;
    document.getElementById("results").innerHTML = "Congratulations the number was "+ userNumber;
	document.getElementById("Count").innerHTML = "The number of guesses was "+ count;
    new_game ( );
  }
}
} // end MyApp

/* 	JQuery's shorthand for the document ready event handler
		could be written: $(document).ready(handler);

		When this page loads, we'll create a global variable
		named "app" by attaching it to the "window" object
		(part of the BOM - Browser Object Model)
*/
$(function() {
	window.app = new MyApp();
	window.app.start();
});
