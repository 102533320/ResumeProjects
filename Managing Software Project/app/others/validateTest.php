<?php
/**********************************************
Project     : PHP-SRePS
Date Created: 18/09/2021
Description : Validation test for PHP-SReP. 
contributor : Justin Santoso
**********************************************/
include("../classes/validation.php");

$itemName = ["Creams", "Salicylic Acid and Sulfur Aqueous", "Dusting Powders.", "Ear-Drops", "Spirit", "Aluminium acetate", "Sodium Bicarbonate", "Eye Drops containing Cocaine Hydrochloride", "Eye Drops", "Eye Lotions", "Inhalations", "Menthol", "Benzoin and Menthol", "Menthol and Eucalyptus", "Linctuses containing: Codeine Phosphate", "Codeine.", "Linctuses", "@Lotions", "Aluminium Acetate Aqueous", "Mixtures containing Codeine Phosphate", "Mixtures", "Magnesium Trisilicate", "Kaolin"];
$itemPrice = ["12.90", "13.45", "23,45", "45", "0.093", "0.00", "-12.03", "1,293.03", "495865.02", "twenty two cent", "0", "12.53.32", "12,09.09"];
$itemImageExtention = [".PNG", ".JPG", ".ai", ".bmp", ".gif", ".ico", ".jpeg", ".jpg", ".JPEG", ".max", ".obj", ".png", ".ps", ".psd", ".svg", ".tif", ".3ds", ".3dm"];
$itemImage = [];

for($i = 0; $i < sizeof($itemImageExtention); $i++){
    array_push($itemImage, $itemName[rand(0, 22)].$itemImageExtention[$i]);
}

$count = 0;
echo "<h3>Testing 'VALIDATE_NAME':</h3>";
echo "<em>Valid with only alphanumeric character</em>";
foreach($itemName as $n){
    $count++;
    if(Validate::isValid(Validate::VALIDATE_NAME, $n)){
        echo "<p>$count&emsp;Name with : '$n' is <a style='color:green'>VALID</a> </p>";
    }else{
        echo "<p>$count&emsp;Name with : '$n' is <a style='color:red'>INVALID</a> </p>";
    }
}

$count = 0;
echo "<hr><h3>Testing 'VALIDATE_PRICE':</h3>";
echo "<em>Valid with only the 'default' price. ie $12.49></em>";
foreach($itemPrice as $p){
    $count++;
    if(Validate::isValid(Validate::VALIDATE_PRICE, $p)){
        echo "<p>$count&emsp;price of: \$$p is <a style='color:green'>VALID</a> </p>";
    }else{
        echo "<p>$count&emsp;price of: \$$p is <a style='color:red'>INVALID</a> </p>";
    }
}

$count = 0;
echo "<hr><h3>Testing 'VALIDATE_IMAGE':</h3>";
echo "<em>Valid with only common image extention. ie png, jpg, jpeg, etc </em>";
foreach($itemImage as $i){
    $count++;
    if(Validate::isValid(Validate::VALIDATE_IMAGE, $i)){
        echo "<p>$count&emsp;Image of: '".$i."' is <a style='color:green'>VALID</a> </p>";
    }else{
        echo "<p>$count&emsp;Image of: '".$i."' is <a style='color:red'>INVALID</a> </p>";
    }
}
?>