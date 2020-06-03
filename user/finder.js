document.getElementById("finder_next_buttn").addEventListener('click', function() {
    document.getElementById("finder_formBox_1").style.display = "none";
    document.getElementById("finder_formBox_2").style.display = "block";
});


var map;
var marker;

function initMap() {

    var UC_Davis = { lat: 38.5382322, lng: -121.7617125 };
    var geocoder = new google.maps.Geocoder;

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: UC_Davis,
    });

    // This event listener will call addMarker() when the map is clicked.
    map.addListener('click', function(event) {
        document.getElementById("confirm_buttn").style.display = "block";
        document.getElementById("submit_buttn").style.display = "none";

        addMarker(event.latLng);
    });

    // Adds a marker to the map and push to the array.
    function addMarker(location) {
        if (marker != null) {
            marker.setMap(null);
        }

        marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }

}

document.getElementById("confirm_buttn").addEventListener("click", function() {
    if (getLocation()) {
        document.getElementById("location_info").innerText = getLocation();
    }

    if (document.getElementById("location_info").innerText == "") {
        alert("Please select an address");
    } else {
        document.getElementById("confirm_buttn").style.display = "none";
        document.getElementById("submit_buttn").style.display = "block";
    }
});

document.getElementById("submit_buttn").addEventListener("click", function() {
    sendItem();
    window.open("./result.html", '_self', false);
});

function getLocation() {
    try {
        let address = document.getElementsByClassName("title full-width")[0].innerHTML;
        return address;
    } catch (err) {
        return false;
    }
}

document.getElementById("img").addEventListener('change', () => {
    // get the file with the file dialog box
    const selectedFile = document.getElementById('img').files[0];
    // store it in a FormData object
    const formData = new FormData();
    formData.append('newImage', selectedFile, selectedFile.name);

    // build an HTTP request data structure
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload", true);
    xhr.onloadend = function(e) {
        // Get the server's response to the upload
        console.log(xhr.responseText);
        console.log("Image Done Uploding")
        sendGetRequest();
    }

    // actually send the request
    xhr.send(formData);
});

function sendGetRequest() {
    let xhr = new XMLHttpRequest;
    // it's a GET request, it goes to URL /seneUploadToAPI
    xhr.open("GET", "/sendUploadToAPI");

    // Add an event listener for when the HTTP response is loaded
    xhr.addEventListener("load", function() {
        if (xhr.status == 200) { // success
            console.log(xhr.responseText);
        } else { // failure
            console.log("no Image to upload");
        }
    });

    // Actually send request to server
    xhr.send();
}

function sendItem() {
    let title = document.getElementById("Title").value;
    let category = document.getElementById("category").value;
    let description = document.getElementById("text").innerText;
    let date = document.getElementById("date").value;
    let location = document.getElementById("location_info").innerText;
    let image_name;
    try {
        image_name = document.getElementById("img").files[0].name;
    } catch (err) {
        image_name = "NULL";
    }

    let data = {
        "title": title,
        "category": category,
        "description": description,
        "date": date,
        "location": location,
        "image_name": image_name
    };

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/newItem");
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(data));
}