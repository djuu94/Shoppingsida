let shoppingCart = document.getElementById("shopping-cart")
let fullPrice = document.getElementsByClassName("label");
let fullClear = document.getElementById("fullClear");
let cartAmount = document.getElementById("cartAmount")
let basket = []
for (let i = 0; i < localStorage.length; i++){
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    basket.push(JSON.parse(value));
}

function updateAmountInStorage(){
    let totalItems = basket.reduce((a,b)=>{
        return a + b.amount;
    },0)
    cartAmount.textContent = totalItems
}

const generateCartItems = () => {
    let total = 0;
    let allItems = basket.map((obj) => {
        total += obj.amount * obj.price;

        total > 0 ? fullPrice[0].textContent = "Full Price - " + `${total.toFixed(1)}` : fullPrice[0].textContent = ""
        
        return `<div class="cart-item">
        <img width="100" src=${obj.image} alt="" />
        <div class="details">
            <div class="title-price-x">
            <h4 class="title-price">
                <p>${obj.title}</p>
                <p class="cart-item-price"> ${obj.price}</p>
            </h4>
            <i onclick="removeItem(${obj.id})" class="bi bi-x-lg"></i>
            </div>
            <div class="cart-buttons">
            <div class="buttons">
                <i onclick="decrement(${obj.id})" class="bi bi-dash-lg"></i>
                <div id=${obj.id} class="quantity">${obj.amount}</div>
                <i onclick="increment(${obj.id})" class="bi bi-plus-lg"></i>
            </div>
            </div>
            <h3> ${obj.amount * obj.price}</h3>
        </div>
        </div>`
    });
    shoppingCart.innerHTML = allItems.join("");
    updateAmountInStorage();
}


function increment(id){
    let theID = document.getElementById(id);
    let numVersion = Number(theID.textContent);
    theID.textContent = numVersion += 1; 
    let clickedItemBasket = basket.find((obj)=>{
        return obj.id == id;
    })
    clickedItemBasket.amount += 1;
    generateCartItems();
}
const decrement = (id) => {
    let theID = document.getElementById(id);
    let numVersion = Number(theID.textContent);
    let clickedItemBasket = basket.find((obj)=>{
        return obj.id == id;
    })
    console.log(clickedItemBasket)
    if(clickedItemBasket.amount > 0){
        clickedItemBasket.amount -= 1;
        theID.textContent = clickedItemBasket.amount;
        generateCartItems();
      
        if(clickedItemBasket.amount < 1){   //Radera från sidan om antalet av produkten är 0
            window.localStorage.removeItem(`${clickedItemBasket.id}`);
            basket.splice(clickedItemBasket,1)
            generateCartItems();
        }
    }
   generateCartItems();
}
let removeAll = ()=>{
    window.localStorage.clear();
    location.reload();
    
}
fullClear.addEventListener("click",removeAll)

generateCartItems();
