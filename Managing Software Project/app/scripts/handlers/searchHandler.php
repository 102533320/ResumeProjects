<?php
/**********************************************
Project     : PHP-SRePS
Date Created: 16/10/2021
Description : Search Handler file for PHP-SReP. 
            : Only purpose is to search stuff, so sad ;(
contributor : Justin Santoso
 **********************************************/
include_once("../../classes/manager.php");

$manager = new Manager();

if(isset($_POST['searchName'])){
    $manager->findItem($_POST['searchName']);
}
?>