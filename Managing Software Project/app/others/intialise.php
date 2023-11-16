<?php
	require_once ("settings.php");
	$conn = mysqli_connect($host,$username,$password,$database)
	or die('Failed to connect to server');
	
	$query = "CREATE TABLE IF NOT EXISTS Orders (
	orderID INT (10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	dateCreated DATE NOT NULL,
	dateProcessed DATE NOT NULL,
	totalPrice DECIMAL NOT NULL
	);";
	
	mysqli_query($conn, $query);
	
	$query = "CREATE TABLE IF NOT EXISTS Items (
	itemID INT (10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR (30) NOT NULL,
	price DECIMAL NOT NULL,
	photopath LONGTEXT NOT NULL
	);";
	
	mysqli_query($conn, $query);
	
	$query = "CREATE TABLE IF NOT EXISTS OrderItems (
	orderID INT (10) NOT NULL,
	itemID INT (10) NOT NULL,
	PRIMARY KEY (orderID, itemID)
	);";

	mysqli_query($conn, $query);
?>