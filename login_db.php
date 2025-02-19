<?php
$con = mysqli_connect("localhost", "root", "", "login_db");

// Checking connection
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";
?>
