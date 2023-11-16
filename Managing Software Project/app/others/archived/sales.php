<?php
/**********************************************
Project     : PHP-SRePS
Date Created: 14/09/2021
Description : sales file for PHP-SReP. 
contributor : Nathaniel Brennan
 **********************************************/
include("includes/header.php");
include("includes/navbar.php");
include("includes/includeHeader.php");

$dbConn = new DB_Handler();
?>
<!-- Start of main container. -->
<div class="container">
		<!-- Start of sales radio. -->
		<div class="form-check form-check-inline">
			<input id="option-input" class="form-check-input" type="radio" name="addModifySales" id="addSales" value="addSales" checked>
			<label class="form-check-label" for="flexRadioDefault1">Add Sales</label>
		</div>

		<div class="form-check form-check-inline">
			<input id="option-input" class="form-check-input" type="radio" name="addModifySales" id="checkSales" value="checkSales">
			<label class="form-check-label" for="flexRadioDefault2">View or Modify Sales Record</label>
		</div>
		<!-- End of sales radio. -->
		<!-- Start of add sales. -->
		<div class="row" id="disAddSales">
		
		<h3 id="white">Create a Sales Record</h3>
			<div class="col">
				<div class="row justify-content-center">
                    <div class="col-12 col-md-10 col-lg-8">
                        <form class="card card-sm">
                            <div class="card-body row no-gutters align-items-center">
                                <div class="col-auto">
                                    <i class="fas fa-search text-body"></i>
                                </div>
                                <div class="col">
                                    <input class="form-control form-control-lg form-control-borderless" type="search" placeholder="Search items">
                                </div>
                                <div class="col-auto">
                                    <button class="btn btn-sm btn-success" type="submit" id="searchSales">Search</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
				<br>
				<!-- Start of items table. -->
				<div class="col-lg-12">
					<table class="table" id="searchItemSaleTable">
						<tbody>
						<tr>
							<th scope="row">Item ID:</th>
							<td>Item ID Placeholder</td>
							<th scope="row">Name:</th>
							<td>Name of product placholder</td>
							<th scope="row">Inventory Number:</th>
							<td>Item ID Placeholder</td>
							<th scope="row">Number of Items:</th>
							<td><input type="number" value="0" min="0" max="1000" step="1"/></td>
							<td><button type="button" class="btn btn-secondary" onClick="addItem(item.id)" title="Edit Item"><span aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg></span></button></td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="col">
				<h3 id="white">Items in Order</h3>
				<div class="col-lg-12">
					<table class="table" id="itemInSaleTable">
						<tbody>
						<tr>
							<th scope="row">Item ID:</th>
							<td>Item ID Placeholder</td>
							<th scope="row">Name:</th>
							<td>Name of product placholder</td>
							<th scope="row">Inventory Number:</th>
							<td>Item ID Placeholder</td>
							<th scope="row">Number of Items:</th>
							<td><input type="number" value="0" min="0" max="1000" step="1"/></td>
							<td><button type="button" class="btn btn-secondary" onClick="deleteItem(item.id)" title="Delete Item"><span aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/><path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg></span></button></td>
						</tr>
						</tbody>
					</table>
					<div class="form-group">
                    	<input type="submit" class="btn btn-primary btn-block btn-lg" value="Finalize/Process Order" id="processOrder">
                	</div>
				</div>
			</div>
		</div>
		<!-- End of add sales. -->
		<!-- Start of modify sales. -->
		<div class="container" id="disModifySales">
		<h3 id="white">Modify Sales Record</h3>
			<div class="row justify-content-center">
				<div class="col-12 col-md-10 col-lg-8">
					<form class="card card-sm">
						<div class="card-body row no-gutters align-items-center">
							<div class="col-auto">
								<i class="fas fa-search text-body"></i>
							</div>
							<!--end of col-->
							<div class="col">
								<input class="form-control form-control-lg form-control-borderless" type="search" placeholder="Search items">
							</div>
							<!--end of col-->
							<div class="col-auto">
								<button class="btn btn-sm btn-success" type="submit" id="searchSalesModify">Search</button>
							</div>
							<!--end of col-->
						</div>
					</form>
				</div>
				<!--end of col-->
			</div>
			<br>
			<!-- Start of search sales to modify sales. -->
			<div class="col-lg-12" id="selectSalesRecord">
				<?php
					$query = "SELECT * FROM orders";
					if($result = $dbConn->executeQuery($query)) {
						while ($row = $result->fetch(PDO::FETCH_ASSOC)){
							echo "<table class=\"table\">";
								echo "<tbody>";
								echo "<tr>";
									echo "<th scope=\"row\">Sales ID:</th>"
									."<td>".$row["orderID"]."</td>"
									."<th scope=\"row\">Date of Sale:</th>"
									."<td>".$row["dateProcessed"]."</td>"
									."<th scope=\"row\">Total Price:</th>"
									."<td>".$row["totalPrice"]."</td>"
									."<td><button type=\"button\" class=\"btn btn-secondary\" data-toggle=\"modal\" data-target=\"#ModalCenter\" title=\"Edit Sales Record\"><span aria-hidden=\"true\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-pen\" viewBox=\"0 0 16 16\"><path d=\"m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z\"/></svg></span></button></td>"
									."<td><button type=\"button\" class=\"btn btn-secondary\" onClick=\"deleteItem(item.id)\" title=\"Delete Sales Record\"><span aria-hidden=\"true\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\"><path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/><path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/></svg></span></button></td>";
								echo "</tr>";
								echo "</tbody>";
							echo "</table>";
						}
					}
				?>
			</div>
		</div>
		<!-- End of modify sales. -->
		<!-- Start of Modal -->
		<div class="modal fade" id="ModalCenter" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered modal-xl" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="ModalLongTitle">Edit Items in Sales Record</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<?php
							$orderID = 1; //will be changed to value of edit button selected to select orderID
							$query = "SELECT itemID from OrderItems where orderID=$orderID";
							$result = $dbConn->executeQuery($query);
							$itemID = $result->fetch(PDO::FETCH_ASSOC);
							$query = "SELECT * from items where itemID=$itemID";   //idea: get orderID from edit button, use orderID to find itemID's from OrderItems table to find all items in order from Items table
							if($result = $dbConn->executeQuery($query)) {
								while ($row = $result->fetch(PDO::FETCH_ASSOC)){
									echo "<table class=\"table\">";
										echo "<tbody>";
										echo "<tr>";
											echo "<th scope=\"row\">Item ID:</th>"
											."<td>",$row["itemID"],"</td>"
											."<th scope=\"row\">Name:</th>"
											."<td>",$row["itemName"],"</td>"
											."<th scope=\"row\">Price:</th>"
											."<td><input type=\"text\" class=\"form-control\" id=\"price\" name=\"price\" placeholder=",$row["itemPrice"],"></td>"
											."<th scope=\"row\">Number of Items:</th>"
											."<td><input type=\"number\" value=",$row["itemTotal"]," min=\"0\" max=\"1000\" step=\"1\"/></td>"
											."<td><button type=\"button\" class=\"btn btn-secondary\" onClick=\"deleteItem(item.id)\" title=\"Delete Item\"><span aria-hidden=\"true\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\"><path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/><path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/></svg></span></button></td>";
										echo "</tr>";
										echo "</tbody>";
									echo "</table>";
								}
							}
						?>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary">Save changes</button>
					</div>
				</div>
			</div>
        </div>
        <!-- End of Modal -->
	</div>
<!-- End of main container. -->
<script src="scripts/sales.js"></script>

<?php include("includes/footer.php"); ?>