let dessertsContainer = document.querySelector(".desserts");

createElement();

function createElement() {
  let myResquest = new XMLHttpRequest();
  myResquest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let data = JSON.parse(this.responseText);
      for (let i = 0; i < data.length; i++) {
        // dessert box
        let mainDiv = document.createElement("div");
        mainDiv.classList.add("dessert");

        // dessert image
        let imgDiv = document.createElement("div");
        imgDiv.classList.add("photo");
        let imgsrc = data[i].image;
        let img = document.createElement("img");
        img.src = imgsrc;
        //append dessert photo to div
        imgDiv.appendChild(img);

        // add to cart div
        let addDiv = document.createElement("div");
        addDiv.classList.add("add");
        let imgAdd = document.createElement("img");
        let imgAddSrc = data[i].add;
        imgAdd.src = imgAddSrc;
        //append add to cart to div
        addDiv.appendChild(imgAdd);
        addDiv.appendChild(document.createTextNode(" Add to cart"));

        // info div
        let infoDiv = document.createElement("div");
        infoDiv.classList.add("info");

        //dessert category
        let category = document.createElement("p");
        category.classList.add("category");
        let categoryText = data[i].category;
        category.innerHTML = categoryText;

        //dessert name
        let name = document.createElement("p");
        name.classList.add("name");
        let nameText = data[i].name;
        name.innerHTML = nameText;

        //dessert price
        let price = document.createElement("p");
        price.classList.add("price");
        let priceText = data[i].price;
        price.innerHTML = `$${priceText}`;

        //append info to info div
        infoDiv.appendChild(category);
        infoDiv.appendChild(name);
        infoDiv.appendChild(price);

        //append all to dessert div
        mainDiv.appendChild(imgDiv);
        mainDiv.appendChild(addDiv);
        mainDiv.appendChild(infoDiv);

        //append to container
        dessertsContainer.appendChild(mainDiv);
      }
    }
  };
  myResquest.open("GET", `./data.json`, true);
  myResquest.send();
}
