//-------------- add inputs to the row ----------------
function editRow(rowIdx){
  console.log("editMovieRow -- start");
  console.log(rowIdx);

  var x = document.getElementsByTagName("tr");
  var row = x[rowIdx];

  var i;
  if(row.childElementCount - 1 < 9){
    //we are editing Movies table
    for (i = 1; i < row.childElementCount - 2; i++) {
      var temp = row.childNodes[i].innerText;
      console.log(temp);
      if(i<2 || i>3){
        row.childNodes[i].innerHTML = "<input style='text-align: center; width: 70%;' type='text' value='"+temp+"'>";
      }else{
        row.childNodes[i].innerHTML = "<input style='text-align: center; width: 70%;' type='date' value='"+temp+"'>";
      }
    }

    row.childNodes[row.childElementCount - 1].innerHTML = "unsaved⚙️";
    console.log(row.childNodes[row.childElementCount - 1].innerHTML);
  }else{
    for (i = 1; i < row.childElementCount - 2; i++) {
      //we are edditing Users table
      var temp = row.childNodes[i].innerText;
      if(i >= 3 && i <= 4){ //leave username and password field
        row.childNodes[i].innerHTML = "<a style='text-align: center; width: 70%; color: red;'>"+temp+"</a>";
      }else if(i == 5){ //email form
        row.childNodes[i].innerHTML = "<input style='text-align: center; width: 70%;' type='email' value='"+temp+"'>";
      }else{
        row.childNodes[i].innerHTML = "<input style='text-align: center; width: 70%;' type='text' value='"+temp+"'>";
      }
    }
    row.childNodes[row.childElementCount - 1].innerHTML = "processing⚙️";
    console.log(row.childNodes[row.childElementCount - 1].innerHTML);
  }
}


//-------------- insert movie ----------------
function postNewMovie(){
  console.log("i was called");
  row   = document.getElementById("formRow");
  title = row.cells.item(1).firstChild.value;
  stD   = row.cells.item(2).firstChild.value;
  edD   = row.cells.item(3).firstChild.value;
  cName = row.cells.item(4).firstChild.value;
  ctgry = row.cells.item(5).firstChild.value;
  console.log(title);
  console.log(stD);
  console.log(edD);
  console.log(cName);
  console.log(ctgry);

  if(title != "" && stD != "" && edD != "" && cName != "" && ctgry != ""){
    window.location.href = "./insertMovie.php?"+'title='+title+'&start='+stD+'&end='+edD+'&cName='+cName+'&cat='+ctgry;
  }
}


//-------------- delete/update movie ----------------
function updateMovie(btn){
  console.log(btn.parentElement.parentElement.cells);

  id    = btn.parentElement.parentElement.cells.item(0).innerHTML;
  title = btn.parentElement.parentElement.childNodes[1].lastElementChild.value;
  stD   = btn.parentElement.parentElement.childNodes[2].lastElementChild.value;
  edD   = btn.parentElement.parentElement.childNodes[3].lastElementChild.value;
  cName = btn.parentElement.parentElement.childNodes[4].lastElementChild.value;
  ctgry = btn.parentElement.parentElement.childNodes[5].lastElementChild.value;

  console.log("update");
  console.log(id);
  console.log(title);
  console.log(stD);
  console.log(edD);
  console.log(cName);
  console.log(ctgry);
  if(id != '' && title != "" && stD != "" && edD != "" && cName != "" && ctgry != ""){
    window.location.href = "./updateMovie.php?"+'ID='+id+'&title='+title+'&start='+stD+'&end='+edD+'&cName='+cName+'&cat='+ctgry;
  }
}

function deleteMovie(btn){
  console.log(btn.parentElement.parentElement.cells);

  id = btn.parentElement.parentElement.cells.item(0).innerHTML;
  if(id != ''){
    window.location.href = "./deleteMovie.php?"+'ID='+id;
  }
}

//-------------- delete/confirm user ----------------
function deleteUser(btn){
  console.log(btn.parentElement.parentElement.cells);
  
  id = btn.parentElement.parentElement.cells.item(0).innerHTML;
  if(id != ''){
    window.location.href = "./deleteUser.php?"+'ID='+id;
  }
}

function confirmUser(btn){
  console.log(btn.parentElement.parentElement.cells);
  btn.parentElement.parentElement.cells.item(7).innerHTML = 1;
  
  id = btn.parentElement.parentElement.cells.item(0).innerHTML;
  if(id != ''){
    window.location.href = "./confirmUser.php?"+'ID='+id;
  }
}

function updateUser(btn){
  console.log(btn.parentElement.parentElement.cells);
  
  id      = btn.parentElement.parentElement.cells.item(0).innerHTML;
  name    = btn.parentElement.parentElement.childNodes[1].lastElementChild.value;
  surname = btn.parentElement.parentElement.childNodes[2].lastElementChild.value;
  email   = btn.parentElement.parentElement.childNodes[5].lastElementChild.value;
  role    = btn.parentElement.parentElement.childNodes[6].lastElementChild.value;
  confirm = btn.parentElement.parentElement.childNodes[7].lastElementChild.value;
  console.log(id);
  console.log(name);
  console.log(surname);
  console.log(email);
  console.log(role);
  console.log(confirm);
  if(id != '' && name != "" && surname != "" && email != "" && role != "" && confirm != ""){
    window.location.href = "./updateUser.php?"+'ID='+id+'&name='+name+'&surname='+surname+'&email='+email+'&role='+role+'&confirm='+confirm;
  }
}

//-------------- show/hide confirm buttons ----------------
function showSubmitButtn(row){
  row.cells.item(row.cells.length-1).innerHTML = "<button class='center' onclick='postNewMovie()'>Submit ✅</button>";
}


function showConfirmButtn(row){
  // console.log(row.cells.item(7).innerHTML)
    if(row.cells.item(7).innerHTML == 0){
      row.cells.item(row.cells.length-1).innerHTML = "<button class='center' onclick='confirmUser(this)'>Confirm ✅</button>";
      return true;
    }
    return false;
}

//-------------- show/hide edit buttons ----------------
function showEditButtn(row){
  // console.log(row.cells.item(row.cells.length-1).innerHTML);
  if(row.cells.item(row.cells.length-1).innerHTML == "unsaved⚙️"){
    row.cells.item(row.cells.length-1).innerHTML = "<button class='center' onclick='updateMovie(this)'>Submit 👌</button>";
  }else if(row.cells.item(row.cells.length-1).innerHTML == "processing⚙️"){
    row.cells.item(row.cells.length-1).innerHTML = "<button class='center' onclick='updateUser(this)'>Update 👌</button>";
  }else if(row.cells.item(7).innerHTML == 0 && row.cells.length-1 > 8){
    // console.log(row.cells.item(7).innerHTML);
    row.cells.item(row.cells.length-1).innerHTML = "<button class='center' onclick='confirmUser(this)'>Confirm ✅</button>";
  }else{
    row.cells.item(row.cells.length-1).innerHTML = "<button class='center' onclick='editRow("+row.rowIndex+")'>Edit ✏️</button>";
  }
}


function hideEditButtn(row){
  var str = row.cells.item(row.cells.length-1).innerHTML;
  // console.log(str);
  var isEditingMovie = str.endsWith("Submit 👌</button>");
  var isEditingUser  = str.endsWith("Update 👌</button>");

  if(isEditingMovie){
      row.cells.item(row.cells.length-1).innerHTML = "unsaved⚙️";
      return;
  }else if(isEditingUser){
      row.cells.item(row.cells.length-1).innerHTML = "processing⚙️";
      return;
  }else{
    row.cells.item(row.cells.length-1).innerHTML = null;
  }
}

//-------------- add to favorites ----------------

function showFavButtn(row){
  row.cells.item(row.cells.length-1).innerHTML = "<button class='w3-yellow w3-threequarter center' onclick='favThisMovie(this)'>Favorite ❤️</button>";
}


function hideFavButtn(row){
  row.cells.item(row.cells.length-1).innerHTML = null;
}

function favThisMovie(btn){
  console.log(btn.parentElement.parentElement.cells);

  id    = btn.parentElement.parentElement.cells.item(0).innerHTML;
  console.log(id);
  if(id != ''){
    window.location.href = "./addToFavourites.php?"+'ID='+id;
  }
}

//-------------- remove from favorites ----------------
function showUnFavButtn(row){
  row.cells.item(row.cells.length-1).innerHTML = "<button class='w3-yellow w3-threequarter center' onclick='unfavThisMovie(this)'>Remove 💔</button>";
}


function hideUnFavButtn(row){
  row.cells.item(row.cells.length-1).innerHTML = null;
}

function unfavThisMovie(btn){
  console.log(btn.parentElement.parentElement.cells);

  id    = btn.parentElement.parentElement.cells.item(0).innerHTML;
  console.log(id);
  if(id != ''){
    window.location.href = "./deleteFavorite.php?"+'ID='+id;
  }
}

// -----------------for the admin page ------------------------
function chooseButton(row){
    if(!showConfirmButtn(row)){
      showEditButtn(row);
    }
}

// ------------------ Search Functions -----------------------
function searchMovie(btn){
  console.log(btn.parentElement.parentElement.cells);

  field   = btn.parentElement.parentElement.cells.item(1).firstChild.value;
  keyword = btn.parentElement.parentElement.cells.item(3).firstChild.value;

  field = ditchSpacesAndCapitalize(field);

  acceptableFields = ['Title', 'StartDate', 'EndDate', 'CinemaName', 'Category', 'ID' ];
  
  console.log(strBelongsToEnum(field,acceptableFields))


  console.log(field);
  console.log(keyword);

  if( strBelongsToEnum(field,acceptableFields) && keyword != ''){
    window.location.href = "./searchResults.php?"+'field='+field+'&keyword='+keyword;
  }
}

function strBelongsToEnum(str, array){ //case insensitive
  capArr = array.map(function(x){ return x.toUpperCase(); })
  return capArr.includes(str.toUpperCase());
}

function ditchSpacesAndCapitalize(str){
  newStr = str.replace(/\s/g, '');
  return newStr.toUpperCase();
}