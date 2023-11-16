/**********************************************
Project     : PHP-SRePS
Date Created: 14/09/2021
Description : sales js file for PHP-SReP. 
contributor : Nathaniel Brennan
 **********************************************/

/* Function to check radio button for add sales*/
function addModifySale(){
	var addModSales = document.getElementsByName('addModifySales');
	var disAddSales = document.getElementById("disAddSales");
	var disModifySales = document.getElementById("disModifySales");
	
	for (var i = 0, length = addModSales.length; i < length; i++) {
		if (addModSales[0].checked) {
			disAddSales.style.display = "block";
			disModifySales.style.display = "none";
		}
		else{
			disModifySales.style.display = "block";
			disAddSales.style.display = "none";
		}		
	}
}


/* This function loads wwhen the page is loaded*/
function init () {
	/* Get both radio buttons from sales */
	var addSales = document.getElementById("addSales");
	var checkSales = document.getElementById("checkSales");
	
	addSales.onclick = addModifySale;
	checkSales.onclick = addModifySale;

}
/* Calls this function on load*/
window.onload = init;