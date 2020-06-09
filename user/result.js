let url = "https://quickest-yellow-octave.glitch.me/api/users";
fetch(url)
    .then((response) => response.json())
    .then((result) => {
        //console.log(result);
        let div = document.getElementById("test");
        var imageArray = result.data;
        var result = imageArray.map(function(a) { return a.imageURL; });
        // div.innerHTML = result;

        for (var i = 0; i < result.length; i++) {
            var img = document.createElement('img');
            img.setAttribute("src", result[i]);
            img.style.display = "block";
            img.style.width = "100%";
            img.style.objectFit = "cover";
            img.style.height = "150px";
            div.appendChild(img);
        }
    })
    .catch((error) => console.log("error:", error));