<?php
/**********************************************
Project     : PHP-SRePS
Date Created: 14/09/2021
Description : Simple Index file for PHP-SReP. Nothing to fancy just yet 
contributor : Justin Santoso
            : Nathaniel Brennan
            : Khoa Anh
**********************************************/
setCookie('lastLoggedIn', time(), time()+604800);
include("includes/header.php");

if(isset($_SESSION['status']) && $_SESSION['status']){
    include("includes/navbar.php");
    header("location: reports.php");
}

include_once("includes/includeHeader.php");
include_once("classes/authenticator.php");

$db = new DB_Handler();
$db->initialise();
?>

<div class="logcontainer">
    <div class="wrapper">
        <div class="title"><span>Staff Login</span></div>
        <form class="log-in" method="POST" action ="<?php echo $_SERVER['PHP_SELF']; ?>">
            <div class="row">
                <i class="fas fa-user"></i>
                <input type="text" id="username" name="username" placeholder="Username">
            </div>
            <div class="row">
                <i class="fas fa-lock"></i>
                <input type="password" id="userPassword" name="userPassword" placeholder="Password">
            </div>
            <div class="pass"><a href="#" id="forgotPassword" name="forgotPassword">Forgot password?</a></div>
            <div class="row button">
                <input type="submit" id="login" name="login" value="Login">
            </div>
        </form>
    </div>
</div>
<?php include("includes/footer.php");?>

<?php
    Message::insert(Message::INFO, "Login Detail for Testing", "Role <strong><em>ADMIN</em></strong><br>Username: <strong>s01234</strong><br>Password: <strong><em>qwerty</em></strong>");
    Message::insert(Message::INFO, "Login Detail for Testing", "Role <strong><em>STAFF</em></strong><br>Username: <strong>s09999</strong><br>Password: <strong><em>qwerty</em></strong>");

    if(isset($_POST['username'])){
        $userIsValid = true;
        if(isset($_POST['username'])) $userID = sanitise($_POST['username']);
        if(isset($_POST['userPassword'])) $userPass = sanitise($_POST['userPassword']);

        if(!Validate::isValid(Validate::VALIDATE_USERID, $userID)){
            Message::insert(Message::DANGER, "Incorrect Staff ID", "Please make sure to include the letter 's' and your staff identifiable number afterward. <br><strong>Ie: s00000</strong>");
            $userIsValid = false;
        }
        
        if($userIsValid){
            if(Authenticator::IsUserIDExist($db, $userID)){
                if(Authenticator::isPasswordValid($db, $userID, $userPass)){
                    $_SESSION['status'] = true;
                    if (isset($_SESSION['status']) && $_SESSION['status']){
                        $_SESSION['UID'] = $userID;
                        (Authenticator::isUserAdmin($db, $userID))? $_SESSION['role'] = "Admin" : $_SESSION['role'] = "Staff";
                        header("location: reports.php");
                    }
                }
            }else{
                Message::insert(Message::DANGER, "Login details", "User ID with ".$userID." either doesn't exist or using the wrong password.");
            }
        }
    }

    Message::display();

?>