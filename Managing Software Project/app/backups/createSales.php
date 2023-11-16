<?php
/**********************************************
Project     : PHP-SRePS
Date Created: 14/09/2021
Description : sales file for PHP-SReP. 
contributor : Cobie Hudson
            : Nathaniel Brennan
 **********************************************/
include("includes/header.php");
include("includes/navbar.php");
include("includes/includeHeader.php");

$dbConn = new DB_Handler();
$manager = new Manager();
isLoginValid();
?>

<div class="container">
    <!-- Start of add sales. -->
    <div class="row" id="disAddSales">
    <h3>Create a Sales Record</h3>
        <div class="col">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8">
                    <form class="card card-sm">
                        <div class="card-body row no-gutters align-items-center">
                            <div class="col-auto">
                                <i class="fas fa-search text-body"></i>
                            </div>
                            <div class="col">
                                <input class="form-control form-control-borderless" type="search" placeholder="Search item by names" id="searchItem">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <br>
            <!-- Start of items table. -->
            <div id="createSales" style="height: 225px; overflow: hidden scroll;">
                <table class="table" id="searchItemSaleTable">
                    <thead>
                        <tr>
                            <th scope="row">Item ID</th>
                            <th scope="row">Name</th>
                            <th scope="row">In Inventory</th>
                            <th scope="row">Item Added</th>
                        </tr>
                    </thead>
                    <tbody id="searchResult">
                        <?php $manager->displayItems(); ?>
                    </tbody>
                </table>
            </div>
            <br>
            <h3>Items in Order</h3>
            <div id="itemInOrder" style="height: 225px; overflow: hidden scroll;">
                <table class="table" id="itemInSaleTable">
                    <thead>
                        <tr>
                            <th scope="row">Item ID</th>
                            <th scope="row">Name</th>
                            <th scope="row">In Inventory</th>
                            <th scope="row">Item Added</th>
                            <th scope="row">Remove</th>
                        </tr>
                    </thead>
                    <tbody id="itemsAdded">
                        
                    </tbody>
                </table>
            </div>
            <br>
            <div class="form-group">
                <input type="submit" class="btn btn-primary btn-block btn-lg" value="Finalize/Process Order" id="processOrder">
            </div>
        </div>
    </div>
    <!-- End of add sales. -->
</div>
<?php include("includes/footer.php"); ?>

<?php
    if(isset($_POST["processOrder"])) {
        $manager->createOrder();
    }
?>