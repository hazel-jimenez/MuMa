var srchBtnEL = document.getElementById("srch-btn");
var searchInputEl = document.getElementById("search-input");

srchBtnEL.addEventListener("click", clickMe);
function clickMe() {
	
}



fetch("https://spotify23.p.rapidapi.com/search/?q=adele&type=multi&offset=0&limit=10&numberOfTopResults=5", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "spotify23.p.rapidapi.com",
		"x-rapidapi-key": "336db5670cmshe924e8d60e474d5p15ce38jsnff37f2a4c07d"
	}
})
.then(response => {
    return response.json() 

}).then(data => {
    console.log(data)
})
.catch(err => {
	console.error(err);
});


//hamzahs API key code 



//initializes localStorage with keyCount
function localKeyCount(keysAlias, calls, expirationHours) {
    let keyValues = ''
    let dateToday = (Date.parse(Date())) //?
    let dateScale = (expirationHours * 3600 * 1000)
    let stringDate = new Date().toLocaleDateString()
    let stringTime = new Date().toLocaleTimeString()

    if (localStorage.getItem('keyCount') == null || localStorage.getItem('createdAt') == null) {
        keyValues = populateKeyCount(keysAlias, calls);
        localStorage.setItem('keyCount', JSON.stringify(keyValues))
        localStorage.setItem('createdAt', dateToday)

        console.log(`Key calls created on ${stringDate} at ${stringTime}`)

        return localKeyCount(keysAlias, calls, expirationHours)
    } else {
        let value = localStorage.getItem('keyCount')
        let time = parseInt(localStorage.getItem('createdAt'))
        let date = new Date(time + dateScale)

        if (dateToday > (dateScale + time)) {
            localStorage.removeItem('createdAt');
            localStorage.removeItem('keyCount')

            return localKeyCount(keysAlias, calls, expirationHours)
        }
        console.log(`Your keys will refresh on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`)

        keyValues = JSON.parse(value)

        return keyValues
    }
}

//Populate keys with maxCall amount from localKeyCount
function populateKeyCount(arrOfKeys, calls) {
    let count = {}

    arrOfKeys.forEach((element) => {
        count[element] = (count[element] || calls)
    })

    return count
};

//Best best key with most calls remaining
function pickBestKey(keyCount) {
    let keyObj = Object.entries(keyCount)
    let bestKey = keyObj[0]

    keyObj.forEach((element) => {
        if (element[1] > bestKey[1]) {
            bestKey = element
        }
    })

    if (bestKey[1] == 0) {
        return -1
    } else {
        return bestKey[0]
    }
};

//updates localStorage with 
function updateKeyCount(keyIndex, keyCount) {
    let keyArr = Object.entries(keyCount)

    keyArr.forEach((element, index) => {
        if (index == keyIndex) {
            element[1]--
        }
    })

    return localStorage.setItem('keyCount', JSON.stringify(Object.fromEntries(keyArr)))
}

function fetchAPI() {
    const keysAlias = ['key1', 'key2', 'key3', 'key4']; //Alias Values for Keys for localStorage
    const keys = ['trueKey1', 'trueKey2', 'trueKey3', 'trueKey4']; //Your actual API Key at each index for each amount of keys
    const maxCalls = 100 //someInteger of Max calls for API
    const expirationHours = 24
    const keyCount = localKeyCount(keysAlias, maxCalls, expirationHours) //initializes keyCount with localStorage keyCount object

    if (pickBestKey(keyCount) == -1) {
        return console.log('Out of key calls. Clear local storage to end this message.')
    }

    let apiURL = `https://testURL.com/coding/is/fun/?q=answerKey&apiKey=${keys[keysAlias.indexOf(pickBestKey(keyCount))]}` //picks best key from array of keys based on highest remaining calls

    /*After fetch(apiURL).then(response => {
        if(response.ok){*/
    updateKeyCount(keysAlias.indexOf(pickBestKey(keyCount)), keyCount)
    /*      return response.json()  
}
}) */

    console.log(keyCount) //Objest of calls left for each Key 
};

//Your API Call
fetchAPI()