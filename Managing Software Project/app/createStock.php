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

$db = new DB_Handler();
$manager = new Manager();
$dataIsOk = true;
isLoginValid();
?>
<div class="container">
    <!-- Start of add stock. -->
    <div class="modal-body" id="disAddStock">
        <h3>Add Stock Item</h3>
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
<!--
            <div class="form-group">
                <label for="itemImage">Photo</label>
                <input type="file" class="form-control" id="itemImage" name="itemImage" placeholder="Path to photo" required="required">
            </div>
-->
            <div class="form-group">
                <input type="submit" class="btn btn-primary btn-block btn-lg" id="submitStock" name="submitStock" value="Submit">
            </div>
        </form>
    </div>
    <!-- End of add stock. -->
</div>
<?php include("includes/footer.php"); ?>
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
        /* 
        if(!Validate::isValid(Validate::VALIDATE_IMAGE, basename($_FILES["itemImage"]["name"]))){
            Message::insert(Message::DANGER, "Item Image", basename($_FILES["itemImage"]["name"])." is not valid. Please only use .PNG, .JPG, or .JPEG file for item image.");
            $dataIsOk = false;
        }
        */

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