<?php
/**********************************************
Project     : PHP-SRePS
Date Created: 14/09/2021
Description : reports file for PHP-SReP. 
contributor : Nathaniel Brennan
**********************************************/
include("includes/header.php");
include("includes/navbar.php");
include("includes/includeHeader.php");

$manager = new Manager();
isLoginValid();

if(isset($_POST['Report'])){
    if(isset($_POST['Report'])){
        switch ($_POST['Report']) {
            case 'month':
                $manager->generateReport(date('01/m/Y'), date('d/m/Y'));
                break;
            case 'week':
                $manager->generateReport(date('d/m/Y', strtotime('monday this week')), date('d/m/Y'));
                break;
            case 'custom':
                $manager->generateReport($_POST['dateFrom'], $_POST['dateTo']);
                break;
        }
    }  
}
?>
<!-- Start of main container. -->
    <div class="container">
        <h3 id="white">Reports</h3>
        <form method="POST" action="<?php echo $_SERVER['PHP_SELF'] ?>" enctype="multipart/form-data">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="Report" id="monthReport" value="month" checked>
                <label class="form-check-label" for="exampleRadios1">This Months Report</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="Report" id="weekReport" value="week">
                <label class="form-check-label" for="exampleRadios2">This Weeks Report</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="Report" id="customReport" value="custom">
                <label class="form-check-label" for="exampleRadios3">Custom Report</label>
            </div>
            <div class="form-group">
                <input type="date" class="form-control" id="dateFrom" name="dateFrom" placeholder="Date From" required="required">
            </div>
            <div class="form-group">
                <input type="date" class="form-control" id="dateTo" name="dateTo" placeholder="Date To">
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-primary btn-block btn-lg" value="Download Report" id="downloadReport" name="downloadReport">
            </div>
        </form>
    </div>
<!-- End of main container. -->
<?php include("includes/footer.php");?>

<?php

?>