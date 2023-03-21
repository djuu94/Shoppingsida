const shop = document.getElementById('shop');
let categories = document.getElementById('categories');
let cartAmount = document.getElementById("cartAmount");
let basket = [];
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
updateAmountInStorage()

// Produktdatat finns i variabeln shopData (se data.js)

const generateShop = () => {
    let allItems = shopData.map((obj) => {
        return`<div id=product-id-${obj.id} class="item">
        <img width="220" src=${obj.image} alt="">
        <div class="details">
            <h3>${obj.title}</h3>
            <p>${obj.description}</p>
            <div class="price-quantity">
            <h2>${obj.price}</h2>
            <div class="buttons">
                <i onclick="decrement(${obj.id})" class="bi bi-dash-lg"></i>
                <div id=${obj.id} class="quantity">0</div>
                <i onclick="increment(${obj.id})" class="bi bi-plus-lg"></i>
            </div>
            </div>
        </div>
    </div>`
    })
    shop.innerHTML = allItems.join("")  
}
const generateMenu = () =>{
    let j = 500;
    categories.innerHTML = `
    <li>All</li>
    <li>Mens Clothing</li>
    <li>Womens Clothing</li>
    <li>Electronics</li>
    <li>Jewelery</li>
    `
    Array.from(categories.children).forEach(element => {
        element.id = j += 1;
    });
}

const increment = (id) => {
    let theID = document.getElementById(id);
    let numVersion = Number(theID.textContent);
    theID.textContent = numVersion += 1; // Höjer siffran som visar antalet produkter i div
    
    let clickedItem = shopData.find((obj)=>{ // Hittar klickat objekt 
        return obj.id == id;
    })
    
    let isItemInBasket = basket.some((item)=>{
        return item.id == clickedItem.id;
       
    })
    let itemInBasket = basket.find((item)=>{
        return item.id == clickedItem.id
    })
    isItemInBasket == true ? itemInBasket.amount++ : basket.push(clickedItem)
    
    
    localStorage.setItem(`${clickedItem.id}`,JSON.stringify(clickedItem))
    updateAmountInStorage()

}
const decrement = (id) => {
    // Om användaren klickar på - på produkten 
    let theID = document.getElementById(id); // Element i div
    let numVersion = Number(theID.textContent); // Nummerversion av antalet i div
    let itemInBasket = basket.find((obj)=>{    // Hittar klickat i basket
        return obj.id == id;
    });
    let isItemInBasket = basket.some((item)=>{
        return item.id == itemInBasket.id;
    })
    let indexInBasket = basket.indexOf((item)=>{
        item.id == indexInBasket.id
    })

    numVersion > 0 ? theID.textContent = numVersion -= 1 : console.log("There is no items to remove")
    if(isItemInBasket && itemInBasket.amount > 1){
        itemInBasket.amount -= 1;
        console.log(basket)
    }
    else if(itemInBasket.amount == 1){
        basket.splice(indexInBasket,1)
        console.log(basket)
    }
    localStorage.removeItem(`${itemInBasket.id}`)
    updateAmountInStorage()
}


categories.addEventListener("click",function(e){
     if(e.target.id == "501"){
         generateShop()
        }
        else if(e.target.id == "502"){
            clickedCategory("men's clothing")
        }
        else if(e.target.id == "503"){
            clickedCategory("women's clothing")
        }
        else if(e.target.id == "504"){
            clickedCategory("electronics")
        }
        else if(e.target.id == "505"){
            clickedCategory("jewelery")
        }
    function clickedCategory(choice){
        let filtered = shopData.map((obj)=>{
            return obj
        }).filter((item)=>{
            return item.category == choice
        })
        let allItems = filtered.map((obj) => {
            return`<div id=product-id-${obj.id} class="item">
            <img width="220" src=${obj.image} alt="">
            <div class="details">
                <h3>${obj.title}</h3>
                <p>${obj.description}</p>
                <div class="price-quantity">
                <h2>${obj.price}</h2>
                <div class="buttons">
                    <i onclick="decrement(${obj.id})" class="bi bi-dash-lg"></i>
                    <div id=${obj.id} class="quantity">0</div>
                    <i onclick="increment(${obj.id})" class="bi bi-plus-lg"></i>
                </div>
                </div>
            </div>
        </div>`
        })
    
        shop.innerHTML = allItems.join("")
        
        
}
});


generateMenu()
generateShop()
