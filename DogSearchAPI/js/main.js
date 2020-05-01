window.onload = (e) => {
    document.querySelector("#search").onclick = searchButtonClicked;
    document.querySelector("#breed").onchange = breedChanged;

    
    displayStorageValues();
};


//Local Storage
let prefix = "txa7348mjs8837-";
let breedKey = prefix + "breed";
let subBreedKey = prefix + "subBreed";
let limitKey = prefix + "limit";
let contentKey = prefix + "content";

let displayTerm = "";

function searchButtonClicked() {
    //Starting URL
    const DOG_URL = "https://dog.ceo/api/";
    let url = DOG_URL;

    //What breed to search for
    let breed = document.querySelector("#breed").value;
    let subBreed = document.querySelector("#subBreed").value;

    displayTerm = breed;

    if (breed == "random") {
        url += "breeds/image/random/";
    }
    else {
        //Use for all breeds with sub breeds
        if (subBreed != "all" && subBreed != "none") {
            url += "breed/" + breed + "/" + subBreed + "/images/random/";
            displayTerm = subBreed + " " + breed;
        }
        else {
            url += "breed/" + breed + "/images/random/";
        }
    }
    

     //Number of images received (maximum is 50 images for this API)
     let limit = document.querySelector("#limit").value;
     url += limit;

     document.querySelector("#status").innerHTML = "<b>Searching for '" + displayTerm + "'</b>";

     console.log(url);

     getData(url);
 }

 function getData(url) {
     let xhr = new XMLHttpRequest();

     xhr.onload = dataLoaded;
     xhr.onerror = dataError;

     xhr.open("GET", url);
     xhr.send();
 }

function dataLoaded(e) {

     let xhr = e.target;
     console.log(xhr.responseText);

     let obj = JSON.parse(xhr.responseText);

     if (!obj.message || obj.message.length == 0) {
         document.querySelector("#status").innerHTML = "<b>No results found for '" + displayTerm + "'</b>";
         return;
     }

     //Number of images received
     let results = obj.message;
     let bigString = "<p><i>We found " + results.length + " images for '" + displayTerm + "'</i></p>";

     //Adds images to the string of data received
     for (let i = 0; i < results.length; i++) {
         let result = results[i];

         let smallURL = result;
         if (!smallURL) smallURL = "images/no-image-found.png";


         let line = `<div class='result'><img src='${smallURL}' /></div>`;
         bigString += line;
     }

     //Adds images to page
     document.querySelector("#content").innerHTML = bigString;

     document.querySelector("#status").innerHTML = "<b>Success!</b>";

    setLocalStorage();
 }

 function dataError(e) {
     console.log("An error occurred");
 }

function breedChanged() {
    let breedWidget = document.querySelector("#breed");
    let subBreedWidget = document.querySelector("#subBreed");

    //Displays available sub breeds for breeds that have them
    subBreedWidget.innerHTML = '<option value="all" selected>All</option>';
    switch (breedWidget.value) {
        case "buhund":
            subBreedWidget.innerHTML += '<option value="norwegian">Norwegian</option>';
            break;
        case "bulldog":
            subBreedWidget.innerHTML += '<option value="boston">Boston</option>';
            subBreedWidget.innerHTML += '<option value="english">English</option>';
            subBreedWidget.innerHTML += '<option value="french">French</option>';
            break;
        case "bullterrier":
            subBreedWidget.innerHTML += '<option value="staffordshire">Staffordshire</option>';
            break;
        case "cattledog":
            subBreedWidget.innerHTML += '<option value="australian">Australian</option>';
            break;
        case "collie":
            subBreedWidget.innerHTML += '<option value="border">Border</option>';
            break;
        case "corgi":
            subBreedWidget.innerHTML += '<option value="cardigan">Cardigan</option>';
            break;
        case "dane":
            subBreedWidget.innerHTML += '<option value="great">Great</option>';
            break;
        case "deerhound":
            subBreedWidget.innerHTML += '<option value="scottish">Scottish</option>';
            break;
        case "elkhound":
            subBreedWidget.innerHTML += '<option value="norwegian">Norwegian</option>';
            break;
        case "frise":
            subBreedWidget.innerHTML += '<option value="bichon">Bichon</option>';
            break;
        case "greyhound":
            subBreedWidget.innerHTML += '<option value="italian">Italian</option>';
            break;
        case "hound":
            subBreedWidget.innerHTML += '<option value="afghan">Afghan</option>';
            subBreedWidget.innerHTML += '<option value="basset">Basset</option>';
            subBreedWidget.innerHTML += '<option value="blood">Blood</option>';
            subBreedWidget.innerHTML += '<option value="english">English</option>';
            subBreedWidget.innerHTML += '<option value="ibizan">Ibizan</option>';
            subBreedWidget.innerHTML += '<option value="walker">Walker</option>';
            break;
        case "mastiff":
            subBreedWidget.innerHTML += '<option value="bull">Bull</option>';
            subBreedWidget.innerHTML += '<option value="english">English</option>';
            subBreedWidget.innerHTML += '<option value="tibetan">Tibetan</option>';
            break;
        case "mountain":
            subBreedWidget.innerHTML += '<option value="bernese">Bernese</option>';
            subBreedWidget.innerHTML += '<option value="swiss">Swiss</option>';
            break;
        case "pinscher":
            subBreedWidget.innerHTML += '<option value="miniature">Miniature</option>';
            break;
        case "pointer":
            subBreedWidget.innerHTML += '<option value="german">German</option>';
            subBreedWidget.innerHTML += '<option value="germanlonghair">German Longhair</option>';
            break;
        case "poodle":
            subBreedWidget.innerHTML += '<option value="miniature">Miniature</option>';
            subBreedWidget.innerHTML += '<option value="standard">Standard</option>';
            subBreedWidget.innerHTML += '<option value="toy">Toy</option>';
            break;
        case "retriever":
            subBreedWidget.innerHTML += '<option value="chesapeake">Chesapeake</option>';
            subBreedWidget.innerHTML += '<option value="curly">Curly</option>';
            subBreedWidget.innerHTML += '<option value="flatcoated">Flatcoated</option>';
            subBreedWidget.innerHTML += '<option value="golden">Golden</option>';
            break;
        case "ridgeback":
            subBreedWidget.innerHTML += '<option value="rhodesian">Rhodesian</option>';
            break;
        case "schnauzer":
            subBreedWidget.innerHTML += '<option value="giant">Giant</option>';
            subBreedWidget.innerHTML += '<option value="miniature">Miniature</option>';
            break;
        case "setter":
            subBreedWidget.innerHTML += '<option value="english">English</option>';
            subBreedWidget.innerHTML += '<option value="gordon">Gordon</option>';
            subBreedWidget.innerHTML += '<option value="irish">Irish</option>';
            break;
        case "sheepdog":
            subBreedWidget.innerHTML += '<option value="english">English</option>';
            subBreedWidget.innerHTML += '<option value="shetland">Shetland</option>';
            break;
        case "spaniel":
            subBreedWidget.innerHTML += '<option value="blenheim">Blenheim</option>';
            subBreedWidget.innerHTML += '<option value="brittany">Brittany</option>';
            subBreedWidget.innerHTML += '<option value="cocker">Cocker</option>';
            subBreedWidget.innerHTML += '<option value="irish">Irish</option>';
            subBreedWidget.innerHTML += '<option value="japanese">Japanese</option>';
            subBreedWidget.innerHTML += '<option value="sussex">Sussex</option>';
            subBreedWidget.innerHTML += '<option value="welsh">Welsh</option>';
            break;
        case "springer":
            subBreedWidget.innerHTML += '<option value="english">English</option>';
            break;
        case "terrier":
            subBreedWidget.innerHTML += '<option value="american">American</option>';
            subBreedWidget.innerHTML += '<option value="australian">Australian</option>';
            subBreedWidget.innerHTML += '<option value="bedlington">Bedlington</option>';
            subBreedWidget.innerHTML += '<option value="border">Border</option>';
            subBreedWidget.innerHTML += '<option value="dandie">Dandie</option>';
            subBreedWidget.innerHTML += '<option value="fox">Fox</option>';
            subBreedWidget.innerHTML += '<option value="irish">Irish</option>';
            subBreedWidget.innerHTML += '<option value="kerryblue">Kerry Blue</option>';
            subBreedWidget.innerHTML += '<option value="lakeland">Lakeland</option>';
            subBreedWidget.innerHTML += '<option value="norfolk">Norfolk</option>';
            subBreedWidget.innerHTML += '<option value="norwich">Norwich</option>';
            subBreedWidget.innerHTML += '<option value="patterdale">Patterdale</option>';
            subBreedWidget.innerHTML += '<option value="russell">Russell</option>';
            subBreedWidget.innerHTML += '<option value="scottish">Scottish</option>';
            subBreedWidget.innerHTML += '<option value="sealyham">Sealyham</option>';
            subBreedWidget.innerHTML += '<option value="silky">Silky</option>';
            subBreedWidget.innerHTML += '<option value="tibetan">Tibetan</option>';
            subBreedWidget.innerHTML += '<option value="toy">Toy</option>';
            subBreedWidget.innerHTML += '<option value="westhighland">West Highland</option>';
            subBreedWidget.innerHTML += '<option value="wheaten">Wheaten</option>';
            subBreedWidget.innerHTML += '<option value="yorkshire">Yorkshire</option>';
            break;
        case "waterdog":
            subBreedWidget.innerHTML += '<option value="spanish">Spanish</option>';
            break;
        case "wolfhound":
            subBreedWidget.innerHTML += '<option value="irish">Irish</option>';
            break;
        default:
            subBreedWidget.innerHTML = '<option value="none">None</option>';
            break;
    }
}



// Creating a function to set the local storage of the breed, sub-breed, and number of results for when the page is reloaded
function setLocalStorage() {
    let breedValue = document.querySelector("#breed").value;
    localStorage.setItem(breedKey, breedValue);

    let subBreedValue = document.querySelector("#subBreed").value;
    localStorage.setItem(subBreedKey, subBreedValue);

    let limitValue = document.querySelector("#limit").value;
    localStorage.setItem(limitKey, limitValue);

    let contentValue = document.querySelector("#content").innerHTML;
    localStorage.setItem(contentKey, contentValue);
}

function displayStorageValues() {
    const storedBreed = localStorage.getItem(breedKey);
    if (storedBreed){
        document.querySelector("#breed").value = storedBreed;
    }
    breedChanged();

    const storedSubBreed = localStorage.getItem(subBreedKey);
    if (storedSubBreed) {
        document.querySelector("#subBreed").value = storedSubBreed;
    }

    const storedLimit = localStorage.getItem(limitKey);
    if (storedLimit){
        document.querySelector("#limit").value = storedLimit;
    }

    const storedContent = localStorage.getItem(contentKey);
    if (storedContent) {
        document.querySelector("#content").innerHTML = storedContent;
    }
}


 