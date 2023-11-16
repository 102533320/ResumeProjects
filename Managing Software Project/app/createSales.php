<?php
	/**********************************************
	Project     : PHP-SRePS
	Date Created: 14/09/2021
	Description : sales file for PHP-SReP. 
	contributor : Nathaniel Brennan, Cobie Hudson
	 **********************************************/
	session_start();
	
	error_reporting(E_ERROR);
	
	include("includes/header.php");
	include("includes/navbar.php");
	include("includes/includeHeader.php");
	
	$dbConn = new DB_Handler();
?>
	<div class="container">
		<div class="row" id="disAddSales">
			<h3>ITEM SEARCH</h3>
			<div class="col">
				<div class="row justify-content-center">
					<div class="col-12 col-md-10 col-lg-8">
						<form class="card card-sm" method = "post" action = "createSales.php" id = "itemSearchForm" autocomplete = "off">
							<div class="card-body row no-gutters align-items-center">
								<div class="col-auto">
									<i class="fas fa-search text-body"></i>
								</div>
								<div class="col">
									<input class="form-control form-control-lg form-control-borderless" type="text" id = "itemID" name="item" placeholder = "Item Search...">
								</div>
								<div class="col-auto">	
									<input class="btn btn-sm btn-success" id="submitID" type="submit" value="SEARCH"/>
								</div>
							</div>
						</form>
					</div>
				</div>
				<br>
				<?php					
					error_reporting(E_ERROR);
					function displayItem() {
						$itemName = $_POST["item"];
						$orderArray = array();
						$x = 0;
						
						require_once ("settings.php");
						$conn = mysqli_connect($host,$username,$password,$database)
						or die('Failed to connect to server');
						
						$query = "SELECT * FROM Items";
						$results = mysqli_query($conn, $query);
						
						$row = mysqli_fetch_row($results);
						
						while ($row) 
						{
							if ($itemName == "{$row[1]}")
							{	
								$itemID = "{$row[0]}";
								$itemName = "{$row[1]}";
								$itemPrice = "{$row[2]}";
								$itemTotal = "{$row[3]}";
								echo "<div class='col-lg-12'><table class='table' id='searchItemSaleTable'><tbody><tr><th scope='row'>Item ID:</th><td>$itemID</td><th scope='row'>Name:</th><td>$itemName</td><th scope='row'>Item Price:</th><td>$itemPrice</td><th scope='row'>Inventory Number:</th><td>$itemTotal</td><th scope='row'>Number of Items:</th><td><form method = 'post' action = 'createSales.php?id=$itemID&itemName=$itemName&itemPrice=$itemPrice&itemTotal=$itemTotal' id = 'itemForm' autocomplete = 'off'><td><input type='number' id='itemNumberID' name='itemNumber' min='1' max='100' value='1'></td><td><input class='button' id='submitItemID' type='submit' value='ADD ITEM'/></fieldset></td></form></tr></tbody></table></div>";
								$row = mysqli_fetch_row($results);
							}
							else
							{
								$row = mysqli_fetch_row($results);
							}
						}
						header('Location: createSales.php');
					}
					
					if(isset($_POST["item"])) {
						displayItem();
					}
						
					if(isset($_POST["processOrder"])) {
						require_once ("settings.php");
						$conn = mysqli_connect($host,$username,$password,$database)
						or die('Failed to connect to server');
						
						$itemID = $_SESSION['itemIDSession'];
						$itemTotal = $_SESSION['itemTotalSession'];
						$itemNumber = $_SESSION['itemNumberSession'];
						$totalPrice = $_SESSION['itemTotalPriceSession'];
						$count = sizeOf($itemID);
						date_default_timezone_set('Australia/Melbourne');
						$date = date('d-m-Y', time());
						
						$query = "SELECT MAX(orderID) FROM OrderItemsTest;";
						$results = mysqli_query($conn, $query);
						$row = mysqli_fetch_row($results);
						$orderNumber = $row[0] + 1;
						$boolSale1 = false;
						$boolSale2 = false;
						$boolSale3 = false;
							
						for($i = 0; $i < $count; $i++)
						{					
							$currentItemID = $itemID[$i];
							$currentItemTotal = $itemTotal[$i];
							$currentItemNumber = $itemNumber[$i];
							
							$currentStock = $currentItemTotal - $currentItemNumber;
							
							$query = "INSERT INTO OrderItemsTest (orderID, itemID, totalSold) VALUES ($orderNumber, $currentItemID, $currentItemNumber)"; 
							if (mysqli_query($conn, $query)) 
							{
								$boolSale1 = true; 
							}
							else 
							{
								echo "Error inserting record";
							}
							
							$query = "UPDATE Items SET itemTotal = $currentStock WHERE itemID = $currentItemID";
							if (mysqli_query($conn, $query)) 
							{
								$boolSale2 = true;
							}
							else 
							{
								echo "Error inserting record";
							}
						}
						
						$query = "INSERT INTO OrdersTest (dateCreated, dateProcessed, totalPrice) VALUES ('$date', '$date', $totalPrice)";
						if (mysqli_query($conn, $query)) 
						{
							$boolSale3 = true;
						}
						else 
						{
							echo "Error inserting record";
						}
						
						if ($boolSale1 == true && $boolSale2 = true && $boolSale3 = true) {
							Message::insert(Message::SUCCESS, "ORDER", "Successfully Processed Order");
							Message::display();
						}
						
						unset($_SESSION['itemIDSession']);
						unset($_SESSION['itemNameSession']);
						unset($_SESSION['itemPriceSession']);
						unset($_SESSION['itemTotalSession']);
						unset($_SESSION['itemNumberSession']);
						unset($_SESSION['itemTotalPriceSession']);
						unset($_SESSION['boolSession']);
						header('Location: createSales.php');
					}
				?>
				<?php 
					error_reporting(E_ERROR);
					if (isset($_POST['itemNumber']))
					{
						$itemID = $_GET['id'];
						$itemName = $_GET['itemName'];
						$itemPrice = $_GET['itemPrice'];
						$itemTotal = $_GET['itemTotal'];
						$itemNumber = $_POST['itemNumber'];
						$totalPrice = $itemNumber * $itemPrice;
						
						if (!(isset($_SESSION['itemIDSession'])) && !(isset($_SESSION['itemNumberSession']))) {
							$_SESSION['itemIDSession'] = array();
							$_SESSION['itemNameSession'] = array();
							$_SESSION['itemPriceSession'] = array();
							$_SESSION['itemTotalSession'] = array();
							$_SESSION['itemNumberSession'] = array();
							array_push($_SESSION['itemIDSession'], $itemID);
							array_push($_SESSION['itemNameSession'], $itemName);
							array_push($_SESSION['itemPriceSession'], $itemPrice);
							array_push($_SESSION['itemTotalSession'], $itemTotal);
							array_push($_SESSION['itemNumberSession'], $itemNumber);
							$_SESSION['itemTotalPriceSession'] = $totalPrice;
							$_SESSION['boolSession'] = true;
						}
						else {
							array_push($_SESSION['itemIDSession'], $itemID);
							array_push($_SESSION['itemNameSession'], $itemName);
							array_push($_SESSION['itemPriceSession'], $itemPrice);
							array_push($_SESSION['itemTotalSession'], $itemTotal);
							array_push($_SESSION['itemNumberSession'], $itemNumber);
							$_SESSION['itemTotalPriceSession'] = $_SESSION['itemTotalPriceSession'] + $totalPrice;
						}
						header('Location: createSales.php');
					}
					
					if ($_SESSION['boolSession'] == true) {
						$itemID = $_SESSION['itemIDSession'];
						$itemName = $_SESSION['itemNameSession'];
						$itemPrice = $_SESSION['itemPriceSession'];
						$itemTotal = $_SESSION['itemTotalSession'];
						$itemNumber = $_SESSION['itemNumberSession'];
						$totalPrice = $_SESSION['itemTotalPriceSession'];
						$count = sizeOf($itemID);
						
						echo "<h3>SHOPPING CART</h3>";
						
						for($i = 0; $i < $count; $i++)
						{					
							$currentItemID = $itemID[$i];
							$currentItemName = $itemName[$i];
							$currentItemPrice = $itemPrice[$i];
							$currentItemTotal = $itemTotal[$i];
							$currentItemNumber = $itemNumber[$i];
							echo "<div class='col-lg-12'><table class='table' id='searchItemSaleTable'><tbody><tr><th scope='row'>Item ID:</th><td>$currentItemID</td><th scope='row'>Name:</th><td>$currentItemName</td><th scope='row'>Item Price:</th><td>$currentItemPrice</td><th scope='row'>Inventory Number:</th><td>$currentItemTotal</td><th scope='row'>Number of Items:</th><td>$currentItemNumber</td></tr></tbody></table></div>";
						}
						
						echo "<div class='col-lg-12'><table class='table' id='searchItemSaleTable'><tbody><tr><th scope='row'>Total Price: $$totalPrice</th></tr></tbody></table></div>";
						echo "<div class='row justify-content-center'><form method = 'post' action = 'createSales.php'><div class='card-body row no-gutters align-items-center'><div class='col-auto'>	<input class='button' name='processOrder' type='submit' value='PROCESS ORDER'/></div></div></form></div>";
					}
				?>
			<br>
		</div>
	</div>
<?php include("includes/footer.php"); ?>