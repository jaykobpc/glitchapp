document.getElementById("submits").addEventListener("click", function () {


    let category = document.getElementById("category").value;


    asasas(category);


});

function asasas(category) {
    let url = "http://localhost:3000/api/users/" + category;
    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            //console.log(result);

            let div = document.getElementById("test");

            console.log(result.data.imageURL);

            let imageArray = result.data.imageURL;

            // var imageArray = (JSON.stringify(result.data));
            console.log(imageArray);


            //div.innerHTML = imageArray;

            //console.log(imageArray[0].imageURL);

            var img = document.createElement('img');
            img.setAttribute("src", imageArray);
            img.style.display = "block";
            img.style.width = "100%";
            img.style.objectFit = "cover";
            img.style.height = "150px";
            div.appendChild(img);

        })
        .catch((error) => console.log("error:", error));
}