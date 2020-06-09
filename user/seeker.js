document.getElementById("submits").addEventListener("click", function () {

    let category = document.getElementById("category").value;
    if (category.length < 0 || category == null || category == "") {
        alert("Ooops! That Wasn't supposed to Happen. Try searching using Category");
    } else {
        // alert("aaaah fine now");
        asasas(category);
    }
 


});//https://glitch.com/help

function asasas(category) {
    let url = "https://quickest-yellow-octave.glitch.me/api/filtered/" + category;
    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            //console.log(result);
            let div = document.getElementById("test");  

            //console.log(location);
            let imageArray = result.data.imageURL;
      
            let newStore = result.data[0].description;
      
            for(var x = 0; x < result.data.length; x++) {
              
              let storeData = result.data[x].imageURL;              
              let title = result.data[x].title;
              let descriptions = result.data[x].description;
              let location = result.data[x].location;
              let category = result.data[x].category;
              let date = result.data[x].found_date;
              //               
              var textview = document.createElement('p');
              textview.innerText = "Title:  "+title;
              var textview1 = document.createElement('p');
              textview1.innerText = "Description:  "+descriptions;
              var textview2 = document.createElement('p');
              textview2.innerText = "Location:  "+location;
              var textview3 = document.createElement('p');
              textview3.innerText = "Category:  "+category;
              var textview4 = document.createElement('p');
              textview4.innerText = "Date Uploaded:  "+date;
              
              
              // 
              var img = document.createElement('img');
              img.setAttribute("src",storeData);
              img.style.display = "block";
              img.style.width = "100%";
              img.style.objectFit = "cover";
              img.style.marginTop = "10px";
              img.style.paddingTop = "15px";
              img.style.marginBottom = "20px";
              img.style.height = "200px";
              
              div.appendChild(img);
              div.appendChild(textview); 
              div.appendChild(textview1); 
              div.appendChild(textview2); 
              div.appendChild(textview3); 
              div.appendChild(textview4); 
            }
        })
        .catch((error) => console.log("error:", error));
}