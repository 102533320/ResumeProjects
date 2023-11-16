<?php
/**********************************************
Project     : PHP-SRePS
Date Created: 14/09/2021
Description : Item Handler file for PHP-SReP. 
contributor : Justin Santoso
 **********************************************/
include_once("../../classes/manager.php");
include_once("../../classes/message.php");

$manager = new Manager();

header('Content-Type: application/json');

$input = filter_input_array(INPUT_POST);

if($input["action"] === 'edit'){
    $manager->editItem($input["itemID"], $input["itemName"], $input["itemPrice"], $input["itemTotal"]);
}

if($input["action"] === 'delete'){
    $manager->deleteItem($input["itemID"]);
}

Message::display();

echo json_encode($input);
?>