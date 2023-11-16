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

$manager = new Manager();
isLoginValid();
?>
<div class="container">
    <!-- Start of modify sales. -->
    <div class="container" id="disModifySales">
    <h3>Modify Sales Record</h3>
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8">
                <form class="card card-sm">
                    <div class="card-body row no-gutters align-items-center">
                        <div class="col-auto">
                            <i class="fas fa-search text-body"></i>
                        </div>
                        <!--end of col-->
                        <div class="col">
                            <input class="form-control form-control-lg form-control-borderless" type="date" placeholder="Search Sales by Date">
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
        <div style="height: 600px; overflow: hidden scroll;">
            <table class="table">
                <thead style="position: sticky; top: 0; background-color: #1abc9c;">
                    <tr>
                        <th scope="row">Order ID</th>
                        <th scope="row">Date Created</th>
                        <th scope="row">Date Processed</th>
                        <th scope="row">Total Price</th>
                        <th scope="row">Edit</th>
                        <th scope="row">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        /* Display Orders */
                        $manager->displaySales();
                    ?>
                </tbody>
            </table>
        </div>
    </div>
    <!-- End of modify sales. -->
    <!-- Start of Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Edit Stock Item</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table class="table">
                            <tbody>
                                <?php
                                    /* Get Order Items */
                                    
                                ?>
                            </tbody>
                         </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fa fa-trash" aria-hidden="true"></i></button>
                        <button type="button" class="btn btn-success"><i class="fa fa-check" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
        </div>
    <!-- End of Modal -->
</div>

<?php include("includes/footer.php"); ?>