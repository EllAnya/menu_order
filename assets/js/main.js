
function home() {
    document.getElementById('center-logo').style.display = 'block';
    document.getElementById('about-us').style.display = 'none';
    document.getElementById('contact').style.display = 'none';
    document.getElementById('food').style.display = 'none'
};
function about() {
    document.getElementById('center-logo').style.display = 'none';
    document.getElementById('about-us').style.display = 'block';
    document.getElementById('contact').style.display = 'none';
    document.getElementById('food').style.display = 'none'
};
function contact() {
    document.getElementById('center-logo').style.display = 'none';
    document.getElementById('about-us').style.display = 'none';
    document.getElementById('contact').style.display = 'block';
    document.getElementById('food').style.display = 'none'
};
function food() {
    document.getElementById('center-logo').style.display = 'none';
    document.getElementById('about-us').style.display = 'none';
    document.getElementById('contact').style.display = 'none';
    document.getElementById('food').style.display = 'block'
}
let recepti = [
    {
      recipeImage : "https://i.ibb.co/q5ftrX5/r1.png",
      recipeName  : "Hamburger",
      recipePrice : 15,
      recipeIngridients: [
      "Sesame Bun",
      "Ground Beef Patty",
      "Onion",
      "Pickle",
      "Lettuce Salad"
      ],
      ingridientPrice : 3
    },
    {
      recipeImage : "https://i.ibb.co/0mYjtSr/r2.png",
      recipeName  : "Macaroni",
      recipePrice : 10,
      recipeIngridients: [
      "Macaroni",
      "Paprica",
      "Tomato",
      "Chease",
      "Zucchini"
      ],
      ingridientPrice : 2
    },
    {
      recipeImage : "https://i.ibb.co/NNwmVty/r4.png",
      recipeName  : "Pizza",
      recipePrice : 18,
      recipeIngridients: [
      "Tomato Sauce",
      "Cheese",
      "Peperoni",
      "Olives",
      "Mushrooms",
      "Basil"    
      ],
      ingridientPrice : 3
    },
    {
      recipeImage : "https://i.ibb.co/N26pWRy/r3.png",
      recipeName  : "Salad",
      recipePrice : 12,
      recipeIngridients: [
      "Tomato",
      "Cucumber",
      "Cheese"
      ],
      ingridientPrice : 4
    },
    {
      recipeImage : "https://i.ibb.co/f8PwQWf/r5.png",
      recipeName  : "Spaghetti",
      recipePrice : 16,
      recipeIngridients: [
      "Spaghetti",
      "Tomato Sauce",
      "Ground Beef",
      "Onion"
      ],
      ingridientPrice : 4
    },
    {
      recipeImage : "https://i.ibb.co/8PBWCrq/r6.png",
      recipeName  : "Risotto",
      recipePrice : 12,
      recipeIngridients: [
      "Risotto Rice",
      "Chicken Stock",
      "Onion"
      ],
      ingridientPrice : 4
    }
  ];
  let orderedList = [];
function createCards() {
    document.getElementById("cards-html").innerHTML = '';
    recepti.forEach((element, index) => {

        document.getElementById("cards-html").innerHTML +=
        `<div class="col-lg-2">
        <div class="card bg-transparent border-secondary mt-5">
            <img src="${element.recipeImage}" class="card-img-top">
            <div class="card-body">
              <h4 class="card-title">${element.recipeName}</h4>
              <div class="form-check">
              <ul class="list-group list-group-flush">${showIngridients(element.recipeIngridients, index)}</ul>
              </div>
            </div>
            <div class="row card-footer">
              <h5 class="col-lg-6 text-danger fs-4" id="total-price${index}">Price: $${element.recipePrice}</h5>  
              <a href="#" class="btn btn-danger btn-sm text-warning col-lg-6" onclick="addToCart(${index})">ADD TO CART <i class="fs-5 bi bi-cart-fill text-warning"></i></a>
            </div>
        </div>
        </div>`;
    
})};
createCards();

function showIngridients(recipeIngridients, index) {
  let ingridients = '';
  recipeIngridients.forEach((ingridient, ind) => {
      ingridients += `<li class="list-group-item">
      <input class="form-check-input" type="checkbox" value="${ingridient}" name="checkbox${index}" checked onchange="validateCheck(${index})">${ingridient}</li>`
  });
  return ingridients;
}


function validateCheck(index) {
  let checkboxes = document.querySelectorAll(`input[name=checkbox${index}]:checked`);
  console.log(checkboxes.length);
  
  document.getElementById("total-price" + index).innerText = 'Price: $' + checkboxes.length * recepti[index].ingridientPrice;

};


function addToCart(index) {
  let checkedIngridients = [];

  let checkboxes = document.querySelectorAll(`input[name=checkbox${index}]:checked`);

  checkboxes.forEach(ingridient => {
      checkedIngridients.push(ingridient.value);
  });

  let order = {
      recipeImage : recepti[index].recipeImage,
      recipeName  : recepti[index].recipeName,
      recipePrice : checkedIngridients.length * recepti[index].ingridientPrice,
      recipeIngridients: checkedIngridients,
      ingridientPrice : recepti[index].ingridientPrice,
  };

  orderedList.push(order);
document.getElementById("modal-body").innerHTML = '';

  let totalPrice = 0;

  orderedList.forEach((order, i) => {
    document.getElementById("modal-body").innerHTML += 
      `<div class="row" id="modal-cards">
      <div class="col-md-4">
          <img class="mt-2"src="${order.recipeImage}" id="image-fluid">
      </div>
      <div class="col-md-8 ms-auto">
        <h5 class="ms-2 mt-2">${order.recipeName}</h5>
        <ul>
          ${createOrderIngridientListHTML(order.recipeIngridients)}
        </ul>
          <p class="ms-5 text-danger fs-6">Price: $${order.recipePrice}</p>
      </div>
  </div>`;

      totalPrice += order.recipePrice;
  });
    document.getElementById("modal-footer").innerHTML =
        `<p class="text-danger fs-5">Total Price: $${totalPrice}</p>
          <button type="button" class="btn btn-danger text-warning" data-bs-dismiss="modal">Buy</button>`
  ;
}


function createOrderIngridientListHTML(recipeIngridients) {
  let li = '';

  recipeIngridients.forEach((element, index) => {
      li += `<li>${element}</li>`
  });

  return li;
}