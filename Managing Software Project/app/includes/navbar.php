<?php

/**********************************************
Project     : PHP-SRePS
Date Created: 14/09/2021
Description : navbar file for PHP-SReP. 
contributor : Nathaniel Brennan
            : Justin Santoso
 **********************************************/
/*GET CURRENT PAGE & RID OF EXTENSION FILE*/
?>

<body>
    <!-- Start of main Nav. -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="index.php">People Health Pharmacy</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <div class="navbar-nav">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="dropdownSales" role="button" data-bs-toggle="dropdown" aria-expanded="false">Sales</a>
                    <ul class="dropdown-menu" aria-labelledby="dropdownSales">
                        <li><a class="dropdown-item" href="createSales.php">Create Sales</a></li>
                        <li><a class="dropdown-item" href="editSales.php">Edit sales</a></li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="dropdownStock" role="button" data-bs-toggle="dropdown" aria-expanded="false">Stock</a>
                    <ul class="dropdown-menu" aria-labelledby="dropdownStock">
                        <li><a class="dropdown-item"href="createStock.php">Create Stock</a></li>
                        <li><a class="dropdown-item"href="editStock.php">Edit Stock</a></li>
                    </ul>
                </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="reports.php">Reports</a>
                    </li>
                </div>
            </div>
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownUserInfo" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-cog"></i>    
                
                </button>
                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownUserInfo">
                    <p class="dropdown-item"><?php echo "<strong>".$_SESSION['UID']."</strong> | <em>".$_SESSION['role']."</em>";?></p>
                    <div class="dropdown-divider"></div>
                <?php if($_SESSION['role'] == "Admin"){ ?>
                    <a class="dropdown-item" href="#"><i class="fa fa-history" aria-hidden="true"></i> View Logs</a>
                    <a class="dropdown-item" href="#"><i class="fas fa-user-cog"></i> Manage Staff</a>
                <?php }?>
                    <a class="dropdown-item" href="logout.php"><i class="fas fa-sign-out-alt"></i> Logout</a>
                </div>
            </div>
        </div>
    </nav>
    <!-- End of main Nav. -->