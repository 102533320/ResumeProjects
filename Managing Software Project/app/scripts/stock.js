/**********************************************
Project     : PHP-SRePS
Date Created: 14/09/2021
Description : stock js file for PHP-SReP. 
contributor : Nathaniel Brennan
 **********************************************/

/* Function to check radio button for add stock*/
function addModifyStock(){
	var addModStock = document.getElementsByName('addModifyStock');
	var disAddStock = document.getElementById("disAddStock");
	var disModifyStock = document.getElementById("disModifyStock");
	
	for (var i = 0, length = addModStock.length; i < length; i++) {
		if (addModStock[0].checked) {
			disAddStock.style.display = "block";
			disModifyStock.style.display = "none";
		}
		else{
			disModifyStock.style.display = "block";
			disAddStock.style.display = "none";
		}		
	}
}

/* This function loads wwhen the page is loaded*/
function init () {
	/* Get both radio buttons from stock */
	var addStock = document.getElementById("addStock");
	var checkStock = document.getElementById("checkStock");
	
	addStock.onclick = addModifyStock;
	checkStock.onclick = addModifyStock;
}
/* Calls this function on load*/
window.onload = init;