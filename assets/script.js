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

