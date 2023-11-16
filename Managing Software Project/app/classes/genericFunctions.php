<?php
/**********************************************
Project     : PHP-SRePS
Date Created: 19/09/2021
Description : Generic Functions file for PHP-SReP.
            : Handles all the generic stuff 
contributor : Justin Santoso
 **********************************************/
/* 
 * GENERIC FUNCTIONS HERE 
*/

function sanitise($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);

    return $data;
}

function uploadImage($imageFolder, $name){
    $targetFile = $imageFolder.basename($_FILES[$name]["name"]);
    $tempFile = $_FILES[$name]["tmp_name"];

    if (file_exists($targetFile)) {
        return;
    }
    
    move_uploaded_file($tempFile, $targetFile);
    return basename($_FILES[$name]["name"]);
}

/* get the total price items sold. */
function getTotalPrice($itemPrice, $totalSold){
    return $itemPrice * $totalSold;
}

function isLoginValid(){
    if(!isset($_SESSION['status'])){
        header("Location: index.php");
        exit();
    }
}