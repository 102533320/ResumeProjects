<?php
/**********************************************
Project     : PHP-SRePS
Date Created: 14/09/2021
Description : stocks file for PHP-SReP. 
contributor : Nathaniel Brennan
**********************************************/
include("includes/header.php");
include("includes/navbar.php");
include("includes/includeHeader.php");

$db = new DB_Handler();
$manager = new Manager();
$dataIsOk = true;

?>
<!-- Start of main container. -->
    <div class="container">
        <!-- Start of stock radio. -->
		<div class="form-check form-check-inline">
			<input id="option-input" class="form-check-input" type="radio" name="addModifyStock" id="addStock" value="addStock" checked>
			<label class="form-check-label" for="flexRadioDefault1">Add Stock</label>
		</div>
		<div class="form-check form-check-inline">
			<input id="option-input" class="form-check-input" type="radio" name="addModifyStock" id="checkStock" value="checkStock">
			<label class="form-check-label" for="flexRadioDefault2">View or Modify Stock Record</label>
		</div>
		<!-- End of stock radio. -->
        <!-- Start of add stock. -->
        <div class="modal-body" id="disAddStock">
            <h3 id="white">Add Stock Item</h3>
            <form action="<?php echo $_SERVER['PHP_SELF']?>" method="POST" enctype="multipart/form-data" >
                <div class="form-group">
                    <label for="itemName">Name</label>
                    <input type="text" class="form-control" id="itemName" name="itemName" placeholder="Name of item" required="required" >
                </div>
                <div class="form-group">
                    <label for="itemPrice">Price</label>
                    <input type="text" class="form-control" id="itemPrice" name="itemPrice" placeholder="Price of item" required="required" >
                </div>
                <div class="form-group">
                    <label for="itemTotal">Inventory</label>
                    <input type="number" class="form-control" value="0" min="0" max="1000" step="1" id="itemTotal" name="itemTotal" placeholder="Number of itmes in stock" required="required">					
                </div>
                <div class="form-group">
                    <label for="itemImage">Photo</label>
                    <input type="file" class="form-control" id="itemImage" name="itemImage" placeholder="Path to photo" required="required">
                </div>
                <div class="form-group">
                    <input type="submit" class="btn btn-primary btn-block btn-lg" id="submitStock" name="submitStock" value="Submit">
                </div>
            </form>
        </div>
        <!-- End of add stock. -->
        <!-- start of modify stock item. -->
        <div class="container" id="disModifyStock">
        <h3 id="white">Modify Stock Item</h3>
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8">
                    <form class="card card-sm">
                        <div class="card-body row no-gutters align-items-center">
                            <div class="col-auto">
                                <i class="fas fa-search text-body"></i>
                            </div>
                            <div class="col">
                                <input class="form-control form-control-lg form-control-borderless" type="search" placeholder="Search items by name">
                            </div>
                            <div class="col-auto">
                                <button class="btn btn-sm btn-success" type="submit" id="searchItem">Search</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <br>
            <table class="table">
                <tbody>
                    <tr>
                        <th scope="row">Item ID</th>
                        <th scope="row">Name</th>
                        <th scope="row">Stock Available</th>
                        <th scope="row">Edit</th>
                        <th scope="row">Remove</th>
                    </tr>
                    <?php
                    /* * * * * * * * * 
                     * Display Stock Items
                     * * * * * * * * */
                    //!NEED TO FIND A WAY TO CONNECT BUTTONS 
                    $manager->displayItems();
                    ?>
                </tbody>
            </table>
        </div>
        <!-- end of modify stock item. -->
        <!-- Start of Modal -->
        <div class="modal fade" id="ModalCenter" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ModalLongTitle">Edit Stock Item</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <table class="table">
                    <tbody>
                        <?php
                        /* * * * * * * * * 
                         * Edit Stock Item
                         * * * * * * * * */
                            $manager->editItem(1);
                        ?>
                    </tbody>
                </table>
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
    <script src="scripts/stock.js"></script>
<!-- End of main container. -->

<?php include("includes/footer.php");?>
<?php
    /* * * * * * * * * 
     * Processing stock 
     * * * * * * * * */

    /* start the process once submit button is clicked. */
    if(isset($_POST['submitStock'])){
        /* sanitise raw data. */
        if(isset($_POST['itemName'])) $itemName = sanitise($_POST['itemName']);
        if(isset($_POST['itemPrice'])) $itemPrice = sanitise($_POST['itemPrice']);
        if(isset($_POST['itemTotal'])) $itemTotal = sanitise($_POST['itemTotal']);

        /* validate sanitised data. returns respective errors when condition is not met. */
        if($manager->isDuplicate("Items", "itemName", $itemName)){
            Message::insert(Message::WARNING, "Duplicate Data", $itemName." is already recorded. Try editing it instead.");
            $dataIsOk = false;
        }
        
        if(!Validate::isValid(Validate::VALIDATE_NAME, $itemName)){
            Message::insert(Message::DANGER, "Item Name", $itemName." is not valid. Please use only alphanumeric characters, with no less than 3 characters and no more than 45 characters.");
            $dataIsOk = false;
        }
        
        if (!Validate::isValid(Validate::VALIDATE_PRICE, $itemPrice)) {
            Message::insert(Message::DANGER, "Item Price", $itemPrice." is not valid. Please use only numeric characters, with no less than 2 decimal points. Ie: 12.95, 13.98, etc.");
            $dataIsOk = false;
        }
        
        if(!Validate::isValid(Validate::VALIDATE_IMAGE, basename($_FILES["itemImage"]["name"]))){
            Message::insert(Message::DANGER, "Item Image", basename($_FILES["itemImage"]["name"])." is not valid. Please only use .PNG, .JPG, or .JPEG file for item image.");
            $dataIsOk = false;
        }

        /* when data is sanitised & validated, get a connection from the database. */
        if($dataIsOk){
            if($db->isConnect()){
                if($manager->addItem($itemName, $itemPrice, $itemTotal)){
                    Message::insert(Message::SUCCESS, "Database", "Item of: $itemName - \$$itemPrice / items with $itemTotal in total. Successfully inserted.");
                }
            }
        }
        Message::display();
    }
?>
