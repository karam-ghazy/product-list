let dessertsContainer = document.querySelector(".desserts");

createElement();

let count = 0;
let quantityItems = [0, 0, 0, 0, 0, 0, 0, 0, 0];

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
        addDiv.dataset.price = data[i].price;
        addDiv.dataset.dessert_name = data[i].name;
        addDiv.dataset.quantity = quantityItems[i] + 1;
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
      countItemChosen();
    }
  };
  myResquest.open("GET", `./data.json`, true);
  myResquest.send();
}

function countItemChosen() {
  let buttons = document.querySelectorAll(".dessert .add");
  buttons.forEach((btn) => {
    btn.onclick = function () {
      this.innerHTML = "";

      let count = document.createElement("span");
      count.innerHTML = this.dataset.quantity;

      let decrementDiv = document.createElement("div");
      decrementDiv.classList.add("decrement");
      let decrementImg = document.createElement("img");
      decrementImg.src = "../assets/images/icon-decrement-quantity.svg";
      decrementDiv.appendChild(decrementImg);

      let incrementDiv = document.createElement("div");
      incrementDiv.classList.add("increment");
      let incrementImg = document.createElement("img");
      incrementImg.src = "../assets/images/icon-increment-quantity.svg";
      incrementDiv.appendChild(incrementImg);

      this.appendChild(decrementDiv);
      this.appendChild(count);
      this.appendChild(incrementDiv);

      addToCart(this);
    };
  });
}

function addToCart(itemAdd) {
  let cart = document.querySelector(".cart");
  let cartQuantity = document.querySelector(".cart .count");
  let cartImgEmpty = document.querySelector(".cart .empty-cart");
  let cartpEmpty = document.querySelector(".cart p");

  if (cartImgEmpty) {
    cartImgEmpty.remove();
    cartpEmpty.remove();
  }
  if (!itemAdd.classList.contains("clicked")) {
    count = count + 1;
    cartQuantity.innerHTML = `Your Cart ( <span>${count}</span> )`;

    let items = document.createElement("div");
    items.classList.add("items");

    let item = document.createElement("div");
    item.classList.add("item");
    item.id = `${itemAdd.dataset.dessert_name}`;
    item.dataset.price = `${itemAdd.dataset.price}`;

    let itemInfo = document.createElement("div");
    itemInfo.classList.add("item-info");

    let title = document.createElement("p");
    title.classList.add("title");
    title.innerHTML = itemAdd.dataset.dessert_name;

    let totalAmount = document.createElement("p");
    totalAmount.classList.add("total-amount");

    let quantity = document.createElement("span");
    quantity.classList.add("quantity");
    quantity.innerHTML = `1x`;

    let price = document.createElement("span");
    price.classList.add("price");
    price.innerHTML = `${itemAdd.dataset.price}`;

    let total = document.createElement("span");
    total.classList.add("total");
    total.innerHTML = `$${
      parseFloat(price.innerHTML) * parseFloat(quantity.innerHTML)
    }`;

    price.innerHTML = `@${itemAdd.dataset.price}`;
    totalAmount.appendChild(quantity);
    totalAmount.appendChild(price);
    totalAmount.appendChild(total);

    itemInfo.appendChild(title);
    itemInfo.appendChild(totalAmount);

    let removeItem = document.createElement("div");
    removeItem.classList.add("remove-item");

    let removeImg = document.createElement("img");
    removeImg.src = "../assets/images/icon-remove-item.svg";

    removeItem.appendChild(removeImg);

    item.appendChild(itemInfo);
    item.appendChild(removeItem);

    items.appendChild(item);

    cart.appendChild(items);

    itemAdd.classList.add("clicked");
  } else {
    let incrementDiv = itemAdd.querySelector(".increment");
    let decrementDiv = itemAdd.querySelector(".decrement");
    incrementDiv.onclick = function () {
      updateCartItem(itemAdd, "increment");
    };
    decrementDiv.onclick = function () {
      updateCartItem(itemAdd, "decrement");
    };
  }
  let order = document.querySelector(".total-order");
  if (order) order.remove();
  totalOrder();
}
function updateCartItem(Item, action) {
  let cartQuantity = document.querySelector(".cart .count span");
  if (action === "increment") {
    Item.dataset.quantity++;
    count++;
  } else if (action === "decrement" && Item.dataset.quantity > 1) {
    Item.dataset.quantity--;
    count--;
  }
  cartQuantity.innerHTML = count;

  let item = document.getElementById(`${Item.dataset.dessert_name}`);
  let quantity = item.querySelector(".quantity");
  quantity.innerHTML = `${Item.dataset.quantity}x`;
  let price = Item.dataset.price;
  let total = item.querySelector(".total");

  total.innerHTML = `$${parseFloat(price) * parseFloat(quantity.innerHTML)}`;
}

function totalOrder() {
  let cart = document.querySelector(".cart");
  let totalOrder = document.createElement("div");
  totalOrder.classList.add("total-order");

  let titleOrder = document.createElement("p");
  titleOrder.classList.title;
  titleOrder.innerHTML = "Total Order";

  let items = document.querySelectorAll(".cart .item");
  let sum = 0;

  items.forEach((item) => {
    let quantity = item.querySelector(".quantity");
    let price = item.dataset.price;
    sum += parseFloat(quantity.innerHTML) * price;
  });
  let orderPrice = document.createElement("p");
  orderPrice.classList.add("order-price");
  orderPrice.innerHTML = `$${sum}`;

  totalOrder.appendChild(titleOrder);
  totalOrder.appendChild(orderPrice);
  cart.appendChild(totalOrder);
}
