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

function fetchAPI2() {
    const secretKey = 'mumaKey2' //Enter a unique string for each fetch that usees a different set of keys
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

//Your API Call
fetchAPI()
fetchAPI2()
