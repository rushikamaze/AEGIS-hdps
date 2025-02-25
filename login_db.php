<?php
$host = "localhost"; // or your MySQL server's IP
$user = "root"; // MySQL username
$pass = "Bareera@21"; // MySQL password
$dbname = "heart_disease_db"; // Your database name

// Create connection
$conn = new mysqli($host, $user, $pass, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>
