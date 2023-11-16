<?php
/**********************************************
Project     : PHP-SRePS
Date Created: 18/09/2021
Description : Manager Class file for PHP-SReP.
            : Handles all request for db
contributor : Cobie Hudson
            : Nathaniel Brennan
            : Justin Santoso
            : Xuan Le
**********************************************/
require_once("dbHandler.php");
require_once("message.php");
require_once("genericFunctions.php");

/* Managed the database operations. */
class Manager{
    /* create a private var called $orderCreationDate & $db (DB_Handler's class). */
    private $orderCreationDate;   
    private $db; 
    /* create $item & $order array for each individuals. */
    var $item = array();
    var $order = array();

    /* Initialised (or 'construct') the Manager class. */
    function __construct(){ 
        /* create a connection to the database using DB_Handler class. */
        $this->db = new DB_Handler();
        /* set $orderCreationDate as today's date. */
        $this->orderCreationDate = date("Y-m-d");
    }

    function isDuplicate($tableName, $tableContent, $valueToCheck){
        if($this->db->isConnect()){
            $query = "SELECT * FROM $tableName WHERE $tableContent='$valueToCheck';";
            $result = $this->db->executeQuery($query);
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                if($row[$tableContent] == $valueToCheck){
                    return true;
                }
            }
            return false;
        }
    }
    
    //* ITEM FUNCTIONS *//
    function addItem($itemName, $itemPrice, $itemTotal){
        try{
            /* 
             * create an array of details for $item (name, price, & image) and set it as the value 
             * that are required (ie: $itemName, $itemPrice, $itemImage).
            */
            $imageFolder = "./images/items/";
            //$imageName = uploadImage($imageFolder, 'itemImage');
            $imageName = "dummy.png";

            $this->item["NAME"] = $itemName;
            $this->item["PRICE"] = $itemPrice;
            $this->item["ITEM_TOTAL"] = $itemTotal;
            $this->item["IMAGE"] = $imageFolder.$imageName;


            /* set the query for adding items. */
            $query = "INSERT INTO Items (itemName, itemPrice, itemTotal, itemImagePath) VALUES ('".$this->item["NAME"]."', '".$this->item["PRICE"]."', '".$this->item["ITEM_TOTAL"]."', '".$this->item["IMAGE"]."')";
            /* execute the query and set it to $result. */
            $this->db->executeQuery($query);
            
            /* Catch any error that might 'pop-up' unexpectedly. */
        }catch(PDOException $e){
            Message::insert(Message::DANGER, "PDO EXECPTION", $e->getMessage());
        }catch(Exception $e){
            Message::insert(Message::DANGER, "EXECPTION", $e->getMessage());
        }
        return true;
    }
    
    function displayItems(){
        try{
            $query = "SELECT * FROM Items;";
            $result = $this->db->executeQuery($query);

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                echo "
                <tr>
                    <td>".$row['itemID']."</td>
                    <td>".$row['itemName']."</td>
                    <td>".$row['itemPrice']."</td>
                    <td>".$row['itemTotal']."</td>
                </tr>";
            }
        }catch(PDOException $e){
            Message::insert(Message::DANGER, "PDO EXECPTION", $e->getMessage());
        }catch(Exception $e){
            Message::insert(Message::DANGER, "EXECPTION", $e->getMessage());
        }
    }

    function findItem($itemName){
        try{

            $this->item["NAME"] = $itemName;
            $query = "SELECT * FROM Items WHERE itemName LIKE '%$itemName%';";
            $result = $this->db->executeQuery($query);

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                echo "
                <tr>
                <td>".$row['itemID']."</td>
                <td>".$row['itemName']."</td>
                <td>".$row['itemPrice']."</td>
                <td>".$row['itemTotal']."</td>
                </tr>";
            }
        }catch(PDOException $e){
            Message::insert(Message::DANGER, "PDO EXECPTION", $e->getMessage());
        }catch(Exception $e){
            Message::insert(Message::DANGER, "EXECPTION", $e->getMessage());
        }
    }

    function getItems($itemID){
        $items = array();

        try{
            $query = "SELECT * FROM Items WHERE itemID='".$itemID."';";
            $result = $this->db->executeQuery($query);
            while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                array_push($items, $row['itemID'], $row['itemName'], $row['itemPrice'], $row['itemTotal']);
            }
        }catch(PDOException $e){
            Message::insert(Message::DANGER, "PDO EXECPTION", $e->getMessage());
        }catch(Exception $e){
            Message::insert(Message::DANGER, "EXECPTION", $e->getMessage());
        }
        return $items;
    }
    
    function displayModalItem($buttonID){
        try{
            $query = "SELECT * FROM Items WHERE itemID='".$buttonID."';";
            $result = $this->db->executeQuery($query);
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                echo "
                    <form method=\"POST\" action=\"editStock.php\">
                        <table class=\"table\">
                            <thead>
                                <tr>
                                    <th scope=\"row\">Item ID</th>
                                    <th scope=\"row\">Name</th>
                                    <th scope=\"row\">Price</th>
                                    <th scope=\"row\">Number of Stock Items</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td id=\"editItemID\">".$row['itemID']."</td>
                                    <td><input type=\"text\" class=\"form-control\" id=\"editItemName\" value=\"".$row['itemName']."\" required=\"required\"></td>
                                    <td><input type=\"text\" class=\"form-control\" id=\"editItemPrice\" value=\"".$row['itemPrice']."\" required=\"required\"></td>
                                    <td><input type=\"number\" class=\"form-control\" id=\"editItemTotal\" value=\"".$row['itemTotal']."\" min=\"0\" max=\"1000\" step=\"1\"required=\"required\"></td>
                                </tr>
                            <tbody>
                        </table>
                        <div class=\"modal-footer\">
                            <button type=\"button\" class=\"btn btn-danger deleteButton\" id=\"Delete-".$row['itemID']."\" data-bs-toggle=\"modal\" data-bs-target=\"#staticBackdrop\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></button>
                            <button type=\"button\" class=\"btn btn-success editButton\" id=\"Edit-".$row['itemID']."\"><i class=\"fa fa-check\" aria-hidden=\"true\"></i></button>
                        </div>
                    </form>
                ";
            }
        }catch(PDOException $e){
            Message::insert(Message::DANGER, "PDO EXECPTION", $e->getMessage());
        }catch(Exception $e){
            Message::insert(Message::DANGER, "EXECPTION", $e->getMessage());
        }
    }

    function editItem($itemID, $itemName, $itemPrice, $itemTotal){
        try{
            $query = "UPDATE Items SET itemName='".$itemName."', itemPrice='".$itemPrice."', itemTotal='".$itemTotal."' WHERE itemID='".$itemID."';";
            $result = $this->db->executeQuery($query);

            if($result != null){
                Message::insert(Message::SUCCESS, $itemName, "Successfully updated $itemName with a price of \$$itemPrice and total of $itemTotal.");
            }
            //echo "<script>alert(\"Called from Manager class -> editItem.\")</>";
        }catch(PDOException $e){
            Message::insert(Message::DANGER, "PDO EXECPTION", $e->getMessage());
        }catch(Exception $e){
            Message::insert(Message::DANGER, "EXECPTION", $e->getMessage());
        }
    }

    function deleteItem($itemID){
        try{
            $query = "DELETE FROM Items WHERE itemID='$itemID';";
            $result = $this->db->executeQuery($query);

            $row = $result->fetch(PDO::FETCH_ASSOC);
            
            if($result != null){
                Message::insert(Message::SUCCESS, $row['itemName']."deleted!", "Successfully deleted ".$row['itemName']." from the database.");
            }
        }catch(PDOException $e){
            Message::insert(Message::DANGER, "PDO EXECPTION", $e->getMessage());
        }catch(Exception $e){
            Message::insert(Message::DANGER, "EXECPTION", $e->getMessage());
        }
    }

    //* ORDER FUNCTIONS *//
    function createOrder($itemName, $dateCreated, $dateProcessed, $totalSold){
        try{
            /* create a query to find an item name inside the 'Items' table. */
            $query = "SELECT * FROM Items WHERE itemName = '$itemName';";
            /* execute the query */
            $result = $this->db->executeQuery($query);
            /* if $result is invalid. Disconnect. */
            if(!$result){
                $this->db->disconnect();
            }else{
                /* Fetch the result to $row */
                while($row = $result->fetch(PDO::FETCH_ASSOC)){
                    $itemID = $row['itemID'];
                    $itemName = $row['itemName'];
                    $itemPrice = $row['itemPrice'];
                }
                /* get the total price for an item. */
                $totalPrice = getTotalPrice($itemPrice, $totalSold);
                /* create the $order details array */
                $this->order["ITEM_ID"] = $itemID;
                $this->order["ITEM_NAME"] = $itemName;
                $this->order["ITEM_PRICE"] = $itemPrice;
                $this->order["DATE_CREATED"] = $dateCreated;
                $this->order["DATE_PROCESSED"] = $dateProcessed;
                $this->order["TOTAL_SOLD"] = $totalSold;
                $this->order["TOTAL_PRICE"] = $totalPrice;
                $this->order["CREATION_DATE"] = $this->orderCreationDate;
                /* set the query for adding items. */
				$query = "INSERT INTO Orders (itemID, itemName, itemPrice, dateCreated, dateProcessed, totalSold, totalPrice) VALUES ('".$this->order['ITEM_ID']."','".$this->order['ITEM_NAME']."','".$this->order['ITEM_PRICE']."','".$this->order['DATE_CREATED']."','".$this->order['DATE_PROCESSED']."','".$this->order['TOTAL_SOLD']."','".$this->order['TOTAL_PRICE']."')";
				/* execute the query and set it to $result. */
				$result = $this->db->executeQuery($query);
				/* check if the query is unsuccessful. Disconnect if so. */
				if(!$result){
					$this->db->disconnect();
				}
            }
        /* Catch any error that might 'pop-up' unexpectedly. */
        }catch(PDOException $e){
            Message::insert(Message::DANGER, "PDO EXECPTION", $e->getMessage());
        }catch(Exception $e){
            Message::insert(Message::DANGER, "EXECPTION", $e->getMessage());
        }
    }

    function findOrder($itemName, $dateCreated, $dateProcessed){
		try{
            $this->order["NAME"] = $itemName;
			$this->order["DATE_CREATED"] = $dateCreated;
			$this->order["DATE_PROCESSED"] = $dateProcessed;
            /* set the query for finding items. */
            $query = "SELECT itemName, dateCreated, dateProcessed FROM Orders WHERE (itemName = '$itemName' AND dateCreated = '$dateCreated' AND dateProcessed = '$dateProcessed')";
            /* execute the query and set it to $result. */
            $result = $this->db->executeQuery($query);
            /* check if the query is unsuccessful. Disconnect if so. */
            if(!$result){
                $this->db->disconnect();
            }
            /* Catch any error that might 'pop-up' unexpectedly. */
        }catch(PDOException $e){
            return "Cannot Add Item. PDOEXCEPTION: [".$e->getMessage()."]";
        }catch(Exception $e){
            return "Cannot Add Item. EXCEPTION: [".$e->getMessage()."]";
        }
    }

    function editOrder($orderID, $itemName, $dateCreated, $dateProcessed){
		try{
            $this->order["ID"] = $orderID;
			$this->order["NAME"] = $itemName;
			$this->order["DATE_CREATED"] = $dateCreated;
			$this->order["DATE_PROCESSED"] = $dateProcessed;
            /* set the query for finding items. */
            $query = "UPDATE Orders SET itemName = '$itemName', dateCreated = '$dateCreated', dateProcessed = '$dateProcessed' WHERE orderID = '$orderID'";
            /* execute the query and set it to $result. */
            $result = $this->db->executeQuery($query);
            /* check if the query is unsuccessful. Disconnect if so. */
            if(!$result){
                $this->db->disconnect();
            }
            /* Catch any error that might 'pop-up' unexpectedly. */
        }catch(PDOException $e){
            return "Cannot Add Item. PDOEXCEPTION: [".$e->getMessage()."]";
        }catch(Exception $e){
            return "Cannot Add Item. EXCEPTION: [".$e->getMessage()."]";
        }

    }

    function deleteOrder($itemName, $dateCreated, $dateProcessed){
		try{
            /* 
             * create an array of details for $item (name, price, & image) and set it as the value 
             * that are required (ie: $itemName, $itemPrice, $itemImage).
            */
            $this->order["NAME"] = $itemName;
			$this->order["DATE_CREATED"] = $dateCreated;
			$this->order["DATE_PROCESSED"] = $dateProcessed;
            /* set the query for deleting items. */
            $query = "DELETE FROM Orders WHERE (itemName = '$itemName' AND dateCreated = '$dateCreated' AND dateProcessed = 'dateProcessed')";
            /* execute the query and set it to $result. */
            $result = $this->db->executeQuery($query);
            /* check if the query is unsuccessful. Disconnect if so. */
            if(!$result){
                $this->db->disconnect();
            }
            /* Catch any error that might 'pop-up' unexpectedly. */
        }catch(PDOException $e){
            return "Cannot Add Item. PDOEXCEPTION: [".$e->getMessage()."]";
        }catch(Exception $e){
            return "Cannot Add Item. EXCEPTION: [".$e->getMessage()."]";
        }
    }
    //?NEED RE-WORK.
    function displaySales(){
        try{
            $query = "SELECT * FROM Orders;";
            if($result = $this->db->executeQuery($query)) {
                while($row = $result->fetch(PDO::FETCH_ASSOC)){
                    echo "
                    <tr>
                        <td>".$row["orderID"]."</td>
                        <td>".$row["dateCreated"]."</td>
                        <td>".$row["dateProcessed"]."</td>
                        <td>".$row["totalPrice"]."</td>
                        <td><button type=\"button\" class=\"btn btn-secondary\" id=\"edit-".$row['orderID']."\" name=\"edit-".$row['orderID']."\" data-bs-toggle=\"modal\" data-bs-target=\"#staticBackdrop\" data-bs-whatever=\"@Edit Order\"><i class=\"fas fa-pen\"></i></button></td>
                        <td><button type=\"button\" class=\"btn btn-secondary\" onClick=\"deleteItem(item.id)\" title=\"Delete Sales Record\"><span aria-hidden=\"true\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\"><path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/><path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/></svg></span></button></td>
                    </tr>";
                }
            }
        }catch(PDOException $e){
            Message::insert(Message::DANGER, "PDO EXECPTION", $e->getMessage());
        }catch(Exception $e){
            Message::insert(Message::DANGER, "EXECPTION", $e->getMessage());
        }
    }

    function generateReport($startDate, $endDate){
        try{
            $startDate = str_replace('/', '-', $startDate);
            $endDate = str_replace('/', '-', $endDate);
            $startDateSQL = date("Y-m-d", strtotime($startDate));
            $endDateSQL = date("Y-m-d", strtotime($endDate));
            $currentReportSummary = $this->retrieveReportSummaryDB($startDateSQL, $endDateSQL);
            //get performance from previous time range 
            $prevEndDate = date('Y-m-d', strtotime($startDate. ' - 1 days'));
            $prevDateRange = intval(abs(strtotime($endDate) - strtotime($startDate))/86400);
            $prevStartDate = date('Y-m-d', strtotime($startDate. " - $prevDateRange days"));
            $prevReportSummary = $this->retrieveReportSummaryDB($prevStartDate, $prevEndDate);
            ob_clean();
            //generatecsv
            $file = "report.csv";
                header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                header('Content-Disposition: attachment; filename='.$file);
                $content[0] = array('People Health Pharmacy - Performance Report');
                $content[1] = array('Start Date', 'End Date');
                $content[2] = array($startDate, $endDate);
                $content[3] = array();
                $content[4] = array('Total Orders');
                $content[5] = array('Orders processed', 'Amount of items sold', 'Revenue', "Revenue vs last $prevDateRange days", "Predicted revenue next $prevDateRange days");
                $predictionModel = $this->predictPerformance($prevReportSummary->totalRevenue, $currentReportSummary->totalRevenue);
                $content[6] = array($currentReportSummary->totalOrders, $currentReportSummary->totalItemsSold, $currentReportSummary->totalRevenue, "$predictionModel->comparativePercent%", $predictionModel->predictivePerf);
                $content[7] = array();
                $content[8] = array('Items Sold');
                $i = 9;
                foreach($currentReportSummary->itemsList as $item => $itemValue){
                    if(array_key_exists($item, $prevReportSummary->itemsList)){
                        $predictionModel = $this->predictPerformance($prevReportSummary->itemsList[$item]->revenue, $itemValue->revenue);
                    }
                    else{
                        $predictionModel = $this->predictPerformance(0, $itemValue->revenue);
                    }
                    $content[$i] = array($item);
                    $content[$i+1] = array('Amount sold', 'Revenue', "Revenue vs last $prevDateRange days", "Predicted revenue next $prevDateRange days");
                    $content[$i+2] = array($itemValue->amount, $itemValue->revenue, "$predictionModel->comparativePercent%", $predictionModel->predictivePerf);
                    $i = $i + 3;
                }
            
            $output = fopen('php://output', 'wb');
            foreach($content as $line){
                fputcsv($output, $line);
            }
            fclose($output);
            exit();
        }catch(PDOException $e){
            return "Failed to generate report. PDOEXCEPTION: [".$e->getMessage()."]";
        }catch(Exception $e){
            return "Failed to generate report. EXCEPTION: [".$e->getMessage()."]";
        }
    }
    
    private function retrieveReportSummaryDB($startDate, $endDate){        
        $itemsList = array();
        $totalRevenue = 0;
        $totalItemsSold = 0;
        $totalOrders = 0;
        //Get all items sold + how many sold + revenue for each item + total revenue
        $query = "SELECT Orders.orderID, OrderItems.totalSold, Items.itemName, Items.itemPrice FROM Orders 
                    INNER JOIN OrderItems ON Orders.OrderID=OrderItems.orderID 
                    INNER JOIN Items ON OrderItems.itemID=Items.itemID
                    WHERE STR_TO_DATE(Orders.dateProcessed, '%d-%m-%Y')
                    BETWEEN '$startDate' AND '$endDate'
                    ORDER BY `Items`.`itemName` ASC";
        $result = $this->db->executeQuery($query);
        foreach($result as $row){
            if(!array_key_exists($row['itemName'], $itemsList)){
                $itemsList[$row['itemName']] = (object) ['amount' => $row['totalSold'],
                                                        'revenue' => $row['itemPrice'] * $row['totalSold']];
            }
            else{
                $itemsList[$row['itemName']]->amount = $itemsList[$row['itemName']]->amount + $row['totalSold'];
                $itemsList[$row['itemName']]->revenue = $itemsList[$row['itemName']]->revenue + $row['itemPrice'] * $row['totalSold'];
            }
            $totalItemsSold += $row['totalSold'];
            $totalRevenue += $row['itemPrice'] * $row['totalSold'];
        }
        //get total orders
        $query = "SELECT orderID FROM Orders
                    WHERE STR_TO_DATE(dateProcessed, '%d-%m-%Y')
                    BETWEEN '$startDate' AND '$endDate'";
        $result = $this->db->executeQuery($query);
        foreach($result as $row){
            $totalOrders++;
        }

        return (object) ['totalRevenue' => $totalRevenue, 'totalItemsSold' => $totalItemsSold, 'totalOrders' => $totalOrders, 'itemsList' => $itemsList];
    }
    
    private function predictPerformance($prevPerf, $currentPerf){
        if($prevPerf != 0){
            $predictedPerf = ($currentPerf/$prevPerf) * $currentPerf;
            $comparativePercent = (($currentPerf - $prevPerf)/$prevPerf) * 100;
        }
        else{
            $predictedPerf = $currentPerf;
            $comparativePercent = 100;
        }
    
        return (object) ['predictivePerf' => round($predictedPerf, 2), 'comparativePercent' => round($comparativePercent, 2)];
    }
	
	 function alertOnLow(){
        try{
            $query = "SELECT * FROM Items WHERE itemTotal<'20'";
            $result = $this->db->executeQuery($query);
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
               Message::insert(Message::INFO, "Low on stock", "Item Name:<strong><em>".$row['itemName']."</em></strong><br>Item Number: <strong>".$row['itemTotal']."</strong>");
            }
        }catch(PDOException $e){
            Message::insert(Message::DANGER, "PDO EXECPTION", $e->getMessage());
        }catch(Exception $e){
            Message::insert(Message::DANGER, "EXECPTION", $e->getMessage());
        }
    }
}
?>