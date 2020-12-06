<?php
error_reporting(0);
session_start();

if($_SESSION['username'] != '' && $_SESSION["ID"] != ''){
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "mariaDB";
        $conn = mysqli_connect($servername, $username, $password, $dbname);
        if (!$conn)
        {
            die("Connection failed: " . mysqli_connect_error());
        }
        
        if (isset($_GET["field"]) && isset($_GET["keyword"])) {
            $field   = $_GET["field"];
            $keyword = $_GET['keyword'];
        
            $query = "SELECT * FROM Movies WHERE LOWER(".$field.") LIKE LOWER('%".$keyword."%');";
        }
        else{
            header("Location: ./movies.php");
        }

?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />

    <title>Search Results 📈</title>
    <link rel="stylesheet" href="./style.css" />
    <link rel="stylesheet" href="./w3.css" />
    <link href="favicon.png" rel="shortcut icon" type="image/x-icon" />
    <script type="text/javascript" src="./tableLogic.js"></script>
  </head>
  <body>
          <h3 style="color: #149414; text-align: right; margin: .3em 5em;"><? echo $_SESSION['surname']." ".$_SESSION['name']." (".$_SESSION['role'].")"?></h3>
          <h1 id="myTitle"><a id="myTitle" href="./welcome.php">cine-ΦΙΛ</a></h1>
          <h6 id="myTitle"><a id="myTitle" href="./movies.php">or, go back to movies!🎬</a></h6>
        <div class="container">
            <table class="w3-table-all w3-threequarter center">
                <thead>
                <tr class="w3-green">
              <th style="text-align: center;">ID</th>
              <th style="text-align: center;">Title</th>
                    <th style="text-align: center;">Start Date</th>
                    <th style="text-align: center;">End Date</th>
                    <th style="text-align: center;">Cinema</th>
                    <th style="text-align: center;">Category</th>
                    <th style="text-align: center;">⭐</th>
                </tr>
                </thead>
            <?php

                $result=mysqli_query($conn,$query); 
                 if(!$result)
                    die("Query Failed: " .  mysqli_error($conn));
                 else{
                     if(mysqli_num_rows($result)>0)
                     {
                            /* fetch object array */
                    while ($row = $result->fetch_row()) {
                        echo "<tr onmouseenter='showFavButtn(this)' onmouseleave='hideFavButtn(this)'><td style='text-align: center;'>" . $row[0] . "</td><td style='text-align: center;'>" . $row[1] . "</td><td style='text-align: center;'>" . $row[2] . "</td><td style='text-align: center;'>" . $row[3] . "</td>";
                        echo "<td style='text-align: center;'>" . $row[4] . "</td><td style='text-align: center;'>" . $row[5] . "</td><td style='text-align: center;'></td></tr>";                      
                    }
                        echo "</table>";
                        exit();
                     }
                    else
                    {

                    }
                 }
            ?>
          </div>
        </div>
  </body>
</html>

<?php

}
else{

?>
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <title>Oopsies Page</title>
            <link rel="stylesheet" href="./style.css" />
            <link href="favicon.png" rel="shortcut icon" type="image/x-icon" />
        </head>
        <body>
            <h1 style="text-align: center; color: #149414;">Something went wrong... 🤷‍♂️</h1>
            <script>setTimeout("location.href = './welcome.php';",2000);</script>
        </body>
    </html>
    <?php
}
?>

