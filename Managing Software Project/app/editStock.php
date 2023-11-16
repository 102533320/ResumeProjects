<?php
/**********************************************
Project     : PHP-SRePS
Date Created: 14/09/2021
Description : sales file for PHP-SReP. 
contributor : Nathaniel Brennan
            : Justin Santoso
 **********************************************/
include("includes/header.php");
include("includes/navbar.php");
include("includes/includeHeader.php");

$manager = new Manager();
isLoginValid();
?>
<div class="container">
    <!-- start of modify stock item. -->
    <div class="container" id="disModifyStock">
        <h3>Modify Stock Item</h3>
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8">
                    <form class="card card-sm">
                        <div class="card-body row no-gutters align-items-center">
                            <div class="col-auto">
                                <i class="fas fa-search text-body"></i>
                            </div>
                            <div class="col">
                                <input class="form-control form-control-borderless" type="search" id="searchItem" placeholder="Search items by name">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <br>
            <div style="height: 600px; overflow: hidden scroll;">
                <table id="displayItems" class="table">
                    <thead style="position: sticky; top: 0; background-color: #1abc9c;">
                        <tr>
                            <th scope="row">ID</th>
                            <th scope="row">Name</th>
                            <th scope="row">Individual Price</th>
                            <th scope="row">In Inventory</th>
                        </tr>
                    </thead>
                    <tbody id="searchResult">
                        <?php $manager->displayItems(); ?>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- end of modify stock item. -->
    </div>
<!-- End of main container. -->
<?php include("includes/footer.php");?>
</div>