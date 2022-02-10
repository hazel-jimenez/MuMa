var srchBtnEL = document.getElementById("srch-btn");
var searchInputEl = document.getElementById("search-input");
var artistBlockEl = document.querySelector("#artist-block");
var newsBlockEl = document.querySelector("#news-block");
var pastSearchEl = document.querySelector("#past-search-btn")

// Api function that calls the news
function musicNewsApi() {
	
		const secretKey = 'mumaKeyNews' //Enter a unique string for each fetch that usees a different set of keys
		const keys = ['4df9de0ba0msh15d940754aa44e0p19aa82jsn9517ca64824b']; //Your actual API Key at each index for each amount of keys
		const maxCalls = 100 //someInteger of Max calls for API
		const expirationHours = 24
		const keyCount = localKeyCount(keys.length, maxCalls, expirationHours, secretKey) //initializes keyCount with localStorage keyCount object
	
		if (pickBestKey(keyCount) == -1) {
			return console.log('Out of key calls. Clear local storage to end this message.')
		}
	
		let apiURL = `https://testURL.com/coding/is/fun/?q=answerKey&apiKey=${keys[pickBestKey(keyCount)]}` //picks best key from array of keys based on highest remaining calls
	
	// calling the API using multiple keys
	fetch("https://music-news-api.p.rapidapi.com/news/nytimes", {
	
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "music-news-api.p.rapidapi.com",
			"x-rapidapi-key": `${keys[pickBestKey(keyCount)]}`
		}
	})    
	
	.then(response => {
	
		updateKeyCount(pickBestKey(keyCount), keyCount, secretKey)
		console.log(keyCount)
		 response.json().then(function(news){
			console.log(news)
			displayNewsBlock(news);
	
		
	});
	}
	).catch(function(error){
		alert("Unable to connect to News API");
	});
	}


//API function calling spotify information for search bar
function spotifyApi(artistName) {
//var artistName= searchInputEl.value.trim()
console.log(artistName);

	const secretKey = 'mumaKeySpotify' //Enter a unique string for each fetch that usees a different set of keys
    const keys = ['336db5670cmshe924e8d60e474d5p15ce38jsnff37f2a4c07d','4df9de0ba0msh15d940754aa44e0p19aa82jsn9517ca64824b','32633583a2msh6023211a7ca5fc3p11b52fjsnbe86d190dff9']; //Your actual API Key at each index for each amount of keys
    const maxCalls = 100 //someInteger of Max calls for API
    const expirationHours = 24
    const keyCount = localKeyCount(keys.length, maxCalls, expirationHours, secretKey) //initializes keyCount with localStorage keyCount object

    if (pickBestKey(keyCount) == -1) {
        return console.log('Out of key calls. Clear local storage to end this message.')
    }

    let apiURL = `https://testURL.com/coding/is/fun/?q=answerKey&apiKey=${keys[pickBestKey(keyCount)]}` //picks best key from array of keys based on highest remaining calls




//calling the API using mutiple keys
fetch(`https://spotify23.p.rapidapi.com/search/?q=${artistName}&type=multi&offset=0&limit=10&numberOfTopResults=5`, {

	"method": "GET",
	"headers": {
		"x-rapidapi-host": "spotify23.p.rapidapi.com",
		"x-rapidapi-key": `${keys[pickBestKey(keyCount)]}`
	}
})    

.then(response => {

    updateKeyCount(pickBestKey(keyCount), keyCount, secretKey)
	console.log(keyCount)
     response.json().then(function(data){
		console.log(data)
    	
//sending data to diaplay function to display information
	
displayArtistBlock(data);


});
}
).catch(function(error){
	alert("Unable to connect to the API");
});
}



//MuMa button function to search Artist
var formSubmitHandler = function(event){
    event.preventDefault();
    var artistName= searchInputEl.value.trim()
    ;
    localStorage.setItem("artistName",artistName);
    pastSearchBtn()
console.log(artistName)
    if(artistName){
        spotifyApi(artistName);
        searchInputEl.value="";
       
     }
     else{
         alert("Please Enter an Artist");
     }
     console.log(event);
     
};
// Displays Artist,Picture,and Albums
function displayArtistBlock(data){
	artistBlockEl.textContent="";
	var searchResults=document.createElement("div")
  //album covers class list
	searchResults.classList="search-results"

    var trackBlockEl= document.createElement("div")
    trackBlockEl.classList= "track-block"

	var artistName= document.createElement("h1");

	artistName.textContent= data.artists.items[0].data.profile.name;

	var artistImgEl=document.createElement("img");
	artistImgEl.src= data.users.items[0].data.image.largeImageUrl;


    for(var i=0; i < 5; i++){
		var trackListEl= document.createElement("h3");
		trackListEl.textContent = data.tracks.items[i].data.name;

        trackBlockEl.appendChild(trackListEl);
    }

	 for(var i=0; i < 5; i++){
		var coverArtEl= document.createElement("img");
		coverArtEl.src = data.albums.items[i].data.coverArt.sources[0].url;

		searchResults.appendChild(coverArtEl);
		
	 }
	 artistBlockEl.appendChild(artistName);
	 artistBlockEl.appendChild(artistImgEl);
     artistBlockEl.appendChild(trackBlockEl);
	 artistBlockEl.appendChild(searchResults);

}

//display music news
function displayNewsBlock(news){
    console.log(news)
    var newsTitle = document.createElement("h3")
    newsTitle.textContent = news[0].title;

    // var newsUrl = document.createElement("p")
    // newsUrl.textContent = news[0].url;
    
    var newsSource = document.createElement('p');
    newsSource.textContent = news[0].source;

    newsBlockEl.appendChild(newsTitle);
   // newsBlockEl.appendChild(newsUrl);
    newsBlockEl.appendChild(newsSource);
}


musicNewsApi()

function pastSearchBtn(){
    var pastSearch= document.createElement("div");

    var pastArtist= localStorage.getItem("artistName");

    var pastBtn = document.createElement("btn");
    pastBtn.classlist="past-button waves-effect waves-light btn-small"
    pastBtn.textContent= pastArtist;

    pastSearch.addEventListener("click", function(){spotifyApi(pastArtist)});

    pastSearch.appendChild(pastBtn);
    pastSearchEl.appendChild(pastSearch);

}




srchBtnEL.addEventListener("click", formSubmitHandler);





// //hamzahs API key code 



//initializes localStorage with keyCount
function localKeyCount(keyLength, calls, expirationHours, secretKey) {
    let keyValues = ''
    let dateToday = (Date.parse(Date()))
    let dateScale = (expirationHours * 3600 * 1000)
    let currentDate = new Date()

    if (localStorage.getItem(`keyCount${secretKey}`) == null || localStorage.getItem(`createdAt${secretKey}`) == null) {
        keyValues = populateKeyCount(keyLength, calls);
        localStorage.setItem(`keyCount${secretKey}`, JSON.stringify(keyValues))
        localStorage.setItem(`createdAt${secretKey}`, dateToday)

        console.log(`Key calls created on ${currentDate.toLocaleDateString()} at ${currentDate.toLocaleTimeString()}`)

        return localKeyCount(keyLength, calls, expirationHours, secretKey)
    } else {
        let value = localStorage.getItem(`keyCount${secretKey}`)
        let time = parseInt(localStorage.getItem(`createdAt${secretKey}`))
        let date = new Date(time + dateScale)

        if (dateToday > (dateScale + time)) {
            localStorage.removeItem(`createdAt${secretKey}`);
            localStorage.removeItem(`keyCount${secretKey}`)

            return localKeyCount(keyLength, calls, expirationHours, secretKey)
        }
        console.log(`Your keys will refresh on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`)
        keyValues = JSON.parse(value)

        return keyValues
    }

}

//Populate keys with maxCall amount from localKeyCount
function populateKeyCount(arrLength, calls) {

    let arr = new Array(arrLength)
    let uniqueArr = []
    let i = 0;
    while (uniqueArr.length < arrLength) {
        uniqueArr.push(getRandom(10000))
        if (uniqueArr.indexOf(uniqueArr[i]) == -1) {
            i++
        } else {
            uniqueArr[i] = getRandom(10000)
        }
    }
    for (var j = 0; j < arrLength; j++) {
        arr[j] = ([getRandom(1, 9999), calls])
    }

    return Object.fromEntries(arr)
};

//Best best key with most calls remaining
function pickBestKey(keyCount) {
    let keyObj = Object.entries(keyCount)
    let bestKey = keyObj[0]
    let bestKeyIndex = 0;

    keyObj.forEach((element, index) => {
        if (element[1] > bestKey[1]) {
            bestKey = element
            bestKeyIndex = index
        }
    })

    if (bestKey[1] == 0) {
        return -1
    } else {
        return bestKeyIndex
    }
};

//updates localStorage with 
function updateKeyCount(keyIndex, keyCount, secretKey) {
    let keyArr = Object.entries(keyCount)

    keyArr[keyIndex][1]--

    return localStorage.setItem(`keyCount${secretKey}`, JSON.stringify(Object.fromEntries(keyArr)))
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fetchAPI() {
    const secretKey = 'mumaKey1' //Enter a unique string for each fetch that usees a different set of keys
    const keys = ['trueKey1', 'trueKey2', 'trueKey3', 'trueKey4']; //Your actual API Key at each index for each amount of keys
    const maxCalls = 100 //someInteger of Max calls for API
    const expirationHours = 24
    const keyCount = localKeyCount(keys.length, maxCalls, expirationHours, secretKey) //initializes keyCount with localStorage keyCount object

    if (pickBestKey(keyCount) == -1) {
        return console.log('Out of key calls. Clear local storage to end this message.')
    }

    let apiURL = `https://testURL.com/coding/is/fun/?q=answerKey&apiKey=${keys[pickBestKey(keyCount)]}` //picks best key from array of keys based on highest remaining calls

    /*After fetch(apiURL).then(response => {
        if(response.ok){*/
    updateKeyCount(pickBestKey(keyCount), keyCount, secretKey)
    /*      return response.json()  
}
}) */

    console.log(keyCount) //Objest of calls left for each Key 
};



