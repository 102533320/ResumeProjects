<?php
/**********************************************
Project     : PHP-SRePS
Date Created: 15/09/2021
Description : Database Conneciton Test file for PHP-SReP.
            : Test conneciton to the database 
contributor : Justin Santoso
**********************************************/
    include_once("../classes/dbHandler.php");
    $db = new DB_Handler();

    /* check connection to database. If invalid, return message. */
    if($db->isConnect()){
        $query = "CREATE TABLE IF NOT EXISTS testConnection (testID INT (5) NOT NULL);";
        $result = $db->executeQuery($query);
        if (!$result) {
            $db->disconnect();
            echo "Cannot Execute Query for <pre>$query</pre>";
        }else{
            $query = "INSERT INTO testConnection (testID) VALUES ('19253');";
            $result = $db->executeQuery($query);
            if (!$result) {
                $db->disconnect();
                echo "Cannot Execute Query for <pre>$query</pre>";
            }else{
                $query = "SELECT * FROM testConnection;";
                $result = $db->executeQuery($query);
                /* if PDO Query Object ($result) is invalid, disconnected.  */
                if (!$result) {
                    $db->disconnect();
                    echo "Cannot Execute Query for <pre>$query</pre>";
                } else {
                    /*
                    * set $row as a table row found inside the database table (in db case is the 'testConnection' table).
                    * while the $result can be 'fetch' (or found) by the query, set $testResult with the data found in table.
                    */
                    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                        $testResult = "Data inside 'testConnection' is: ".$row['testID']."\n";
                    }
                    /* disconnect from the server and return the following message with $testResult variable. */
                    $db->disconnect();
                    echo "Successfully established conneciton to the database. $testResult";
                }
            }
        }
    }else{
        echo "Cannot Established Connection. ".$db->getConnection()->errorInfo();
    }
?>