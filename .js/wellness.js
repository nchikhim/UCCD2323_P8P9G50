// variables
const fitnessBtn = document.getElementById("fitness");
const testBtn = document.getElementById("test");
const nutritionBtn = document.getElementById("nutrition");
const mentalBtn = document.getElementById("mental");
const searchBtn = document.getElementById("search");

const txtSearch = document.getElementById("txtSearch");
const articlesType = document.getElementById("articlesType");
const articlesDetails = document.getElementById("articlesDetails");

var wellnessDataArray = [];

// apis
const startUrl = "https://health.gov/myhealthfinder/api/v3/topicsearch.json";
const fitnessUrl = "https://health.gov/myhealthfinder/api/v3/topicsearch.json?categoryId=24";
const testUrl = "https://health.gov/myhealthfinder/api/v3/topicsearch.json?categoryId=27";
const nutritionUrl = "https://health.gov/myhealthfinder/api/v3/topicsearch.json?categoryId=21"
const mentalUrl = "https://health.gov/myhealthfinder/api/v3/topicsearch.json?categoryId=109"
const searchUrl = "https://health.gov/myhealthfinder/api/v3/topicsearch.json?keyword="

window.onload =function(){
    articlesType.innerHTML="<h4>Articles</h4>"
    fetchStart();
};

fitnessBtn.addEventListener("click",function(){
    articlesType.innerHTML="<h4>Physical Fitness</h4>"
    fetchFitnessArticles();
});

testBtn.addEventListener("click",function(){
    articlesType.innerHTML="<h4>Preventive Care</h4>"
    fetchTestArticles();
});

nutritionBtn.addEventListener("click",function(){
    articlesType.innerHTML="<h4>Diet & Lifestyle</h4>"
    fetchNutritionArticles();
});

mentalBtn.addEventListener("click",function(){
    articlesType.innerHTML="<h4>Mental Health</h4>"
    fetchMentalArticles();
});

searchBtn.addEventListener("click",function(){
    articlesType.innerHTML="<h4>Search : "+txtSearch.value+"</h4>"
    fetchSearch(); 
});

txtSearch.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission if inside a form
        searchBtn.click(); // Trigger the click event of the search button
    }
});

const fetchStart = async () =>{
    const response = await fetch(startUrl);
    wellnessDataArray =[];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        wellnessDataArray = myJson.Result.Resources.Resource;
    } else {
        //handle errors
        console.log(response.status, response.statusText);
        wellnessDataArray.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayArticles();
}

const fetchFitnessArticles = async () =>{
    const response = await fetch(fitnessUrl);
    wellnessDataArray =[];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        console.log(myJson);
  
        wellnessDataArray = myJson.Result.Resources.Resource;
    } else {
        //handle errors
        console.log(response.status, response.statusText);
        wellnessDataArray.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayArticles();
}

const fetchTestArticles = async () =>{
    const response = await fetch(testUrl);
    wellnessDataArray =[];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        wellnessDataArray = myJson.Result.Resources.Resource;
    } else {
        //handle errors
        console.log(response.status, response.statusText);
        wellnessDataArray.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayArticles();
}

const fetchNutritionArticles = async () =>{
    const response = await fetch(nutritionUrl);
    wellnessDataArray =[];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        wellnessDataArray = myJson.Result.Resources.Resource;
    } else {
        //handle errors
        console.log(response.status, response.statusText);
        wellnessDataArray.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayArticles();
}

const fetchMentalArticles = async () =>{
    const response = await fetch(mentalUrl);
    wellnessDataArray =[];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        wellnessDataArray = myJson.Result.Resources.Resource;
    } else {
        //handle errors
        console.log(response.status, response.statusText);
        wellnessDataArray.innerHTML = "<h5>No data found.</h5>";
        return;
    }

    displayArticles();
}


const fetchSearch = async () => {
    if (!txtSearch.value.trim()) return; // Avoid making requests with empty search queries
    try {
        const response = await fetch(searchUrl + encodeURIComponent(txtSearch.value));
        if (response.status >= 200 && response.status < 300) {
            const myJson = await response.json();
            console.log(myJson); // Log the API response to see its structure
            if (myJson.Result && myJson.Result.Resources) {
                wellnessDataArray = myJson.Result.Resources.Resource;
                displayArticles();
            } else {
                throw new Error("Unexpected API response structure.");
            }
        } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error(error);
        articlesDetails.innerHTML = "<h5 class='no-articles-message'>No articles found for your search. Please try a different keyword or check back later.</h5>";
    }
}


function displayArticles(){

    articlesDetails.innerHTML = "";

    if(wellnessDataArray.length == 0){
        articlesDetails.innerHTML = "<h5>No articles found for your search. Please try a different keyword or check back later.</h5>";
        return;
    }

    wellnessDataArray.forEach(articles =>{

        var col = document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-3 p-2";

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("height", "100%");
        image.setAttribute("width", "100%");
        image.src=articles.ImageUrl;

        var cardBody = document.createElement('div');

        var topic = document.createElement('h5');
        topic.className = "card-title";
        topic.innerHTML = articles.Title;

        var categories = document.createElement('p');
        categories.className="text-muted";
        categories.innerHTML = articles.Categories;

        var link = document.createElement('a');
        link.className="btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = articles.AccessibleVersion;
        link.innerHTML="Read more";

        cardBody.appendChild(topic);
        cardBody.appendChild(categories);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        articlesDetails.appendChild(col);
        
    });
}

