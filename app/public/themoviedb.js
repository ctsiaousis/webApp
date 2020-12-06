
function getPopMoviePage(number){
        let ch = new XMLHttpRequest();
        // Request to open weather map
        ch.open(
          'GET',
          'https://api.themoviedb.org/3/discover/movie?api_key=38c21ebdd888e9383f44356f0be3566c&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page='+number,
        );
        ch.onload = () => {
          if (ch.readyState === 4) {
            if (ch.status === 200) {
              let json = JSON.parse(ch.responseText);
              console.log(json);

              table = document.getElementById('upcomingMovies');
              var newRow;
              var cellImg;
              var cellTitle;
              var cellPopularity;
              var cellRelease;
              var cellAverage;
              var cellDescription;
              var i;
              for(i = 0; i < 20; i++){
              	console.log(json.results[i]);
              	// Insert a row at the end of table
				newRow 			= table.insertRow();
				//create cells
				cellImg 		= newRow.insertCell(0);
				cellTitle 		= newRow.insertCell(1);
				cellPopularity 	= newRow.insertCell(2);
				cellRelease 	= newRow.insertCell(3);
				cellAverage 	= newRow.insertCell(4);
				cellDescription = newRow.insertCell(4);
				//populate contents
				cellImg.innerHTML 			= "<img class ='center' style='width: 60%; height: 60%;' src = 'https://image.tmdb.org/t/p/w500"+json.results[i].poster_path+"'>";
				cellTitle.innerHTML			= "<a class='bookmark center'>"+json.results[i].title+"</a>";
				cellPopularity.innerHTML	= "<a class='bookmark center'>"+json.results[i].popularity+"</a>";
				cellRelease.innerHTML		= "<a class='bookmark center'>"+json.results[i].release_date+"</a>";
				cellAverage.innerHTML		= "<a class='bookmark center'>"+json.results[i].vote_average+"</a>";
				cellDescription.innerHTML	= "<a class='bookmark center'>"+json.results[i].overview+"</a>";
              }
              //load next page
              	newRow 			= table.insertRow();
				//create cells
				cellImg 		= newRow.insertCell(0);
				cellTitle 		= newRow.insertCell(1);
				cellPopularity 	= newRow.insertCell(2);
				cellRelease 	= newRow.insertCell(3);
				cellAverage 	= newRow.insertCell(4);
				cellDescription = newRow.insertCell(4);
				newPageNo = number+1;
				cellDescription.innerHTML = "<button class='center' onclick='getPopMoviePage("+newPageNo+")'>Load More 😎</button>";
            } else {
              console.log('error msg: ' + ch.status);
            }
          }
        };
        ch.send();
}

// window.onload = () => {
// 	console.log("height");
// 	getPopMoviePage(1);
// };