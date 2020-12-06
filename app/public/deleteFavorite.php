<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mariaDB";
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn)
{
    die("Connection failed: " . mysqli_connect_error());
}

if (isset($_GET["ID"])) {
    $movieID  = $_GET['ID'];
    $userID   = $_SESSION['ID'];
    
    echo $movieID;
    echo $userID;

    $query = "DELETE FROM Favorites WHERE ID=(SELECT ID FROM Favorites WHERE MOVIEID='".$movieID."' AND USERID='".$userID."' LIMIT 1);";

    if ($conn->query($query) === TRUE) {
        echo "Record updated successfully";
       header("Location: ./favourites.php");
    } else {
        echo "Error updating record: " . $conn->error;
    }
}

?>
