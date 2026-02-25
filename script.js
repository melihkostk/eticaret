//HOME PAGE SCRIPTLERI
if(document.body.className === "hp"){

    const searchInput = document.querySelector("input")
    const products = document.querySelectorAll(".product-container");

    searchInput.addEventListener("input", function () {

    const searchValue = this.value.toLowerCase();

    products.forEach(product => {

        const title = product
            .querySelector(".product-description")
            .textContent
            .toLowerCase();

        if (title.includes(searchValue)) {
            product.style.display = "block";
        } 
        
        else {
            product.style.display = "none";
        }

    });
});

    let totalProduct = document.querySelector(".total-amount");
    let cart = JSON.parse(localStorage.getItem("Cart")) || [];

    let total = 0;

    cart.forEach(item => {
        total += Number(item.quantity); 
    });

    totalProduct.textContent = total;
    
    const addButton = document.querySelectorAll(".add-button");

    addButton.forEach((button,index)=>{
        button.addEventListener("click" , function(){

            const productCard = this.closest(".product-container");

            const product = {
                title: productCard.querySelector(".product-type").textContent,
                description: productCard.querySelector(".product-description").textContent,
                price: productCard.querySelector(".cost").textContent,
                photo: productCard.querySelector(".product-img").src,
                size:null,
                color:null,
                quantity:1
            }
        
            let cart = JSON.parse(localStorage.getItem("Cart")) || [];

            cart.push(product);

            localStorage.setItem("Cart", JSON.stringify(cart));
              
            setTimeout(() => {
                window.location.href = `products-page.html?id=${index+1}`;
            }, 1000);
        })
    })

    const seeAllButton = document.querySelector(".see-all")
    seeAllButton.addEventListener("click" , () => {
        window.location.replace("products.html")
    })
}

//PRODUCTS SCRIPTLERI
if(document.body.className === "p"){

    const searchInput = document.querySelector(".search")

    const productTitles = document.querySelectorAll(".product-container");

    searchInput.addEventListener("input", function () {

    const searchValue = this.value.toLowerCase();

    products.forEach(product => {

        const title = product
            .querySelector(".product-d")
            .textContent
            .toLowerCase();

        if (title.includes(searchValue)) {
            product.style.display = "block";
        } 
        
        else {
            product.style.display = "none";
        }
    });
});

    const products = document.querySelectorAll(".product-container");
    
    products.forEach(item =>{
        item.addEventListener("click" , function(e){
            
           const productCard = this.closest(".product-container");

            const product = {
                title: productCard.querySelector(".product-t").textContent,
                description: productCard.querySelector(".product-d").textContent,
                price: productCard.querySelector(".cost").textContent,
                photo: productCard.querySelector(".product-img").src,
                size:null,
                color:null,
                quantity:1
            }

            let cart = JSON.parse(localStorage.getItem("Cart")) || [];

            cart.push(product);

            localStorage.setItem("Cart", JSON.stringify(cart));

            setTimeout(() => {
                window.location.replace("products-page.html");
            }, 1000);
        })
    })

    const menuIcon = document.querySelector(".menu-icon")
    const menu = document.querySelector(".menu-container")
    
    menuIcon.addEventListener("click" , () => {
        menu.classList.toggle("active");
        
    })

}

//PRODUCT PAGE SCRIPTLERI 
if(document.body.className === "pp"){
    const totalProduct = document.querySelector(".total-amount")
    let cart = JSON.parse(localStorage.getItem("Cart")) || [];
    
    let total = 0;

    cart.forEach(item => {
        total += Number(item.quantity); 
    });

    totalProduct.textContent = total;

    const smallImages = document.querySelectorAll(".small-images");
    const mainImage = document.querySelector(".photo");
    /*const colors = document.querySelector(".colors");
    const color = colors.querySelectorAll("label");
    const sizes = document.querySelector(".size");
    const size = sizes.querySelectorAll("span");*/
    const addBasket = document.querySelector(".add-button");
    const productTitle = document.querySelector(".product-title")
    const cost = document.querySelector(".cost")
    const firstSmallImage = document.querySelector('.small-images img');

    let URL = new URLSearchParams(document.location.search);
    let productId = URL.get("id");

    let selectedSize = null;
    let selectedColor = null;

    document.querySelector(".size").innerHTML = "";
    document.querySelector(".colors").innerHTML = "";

    fetch('product.json')
        .then(res =>res.json())
        .then(data => {
            data.products.forEach((item) => {
                if(productId === item.id){
                    item.sizes.forEach(size => {
                        document.querySelector(".size").innerHTML += `
                            <label class="size-${size}">
                                <input type="checkbox" name="size" value="${size}">
                                <span>${size}</span>
                            </label> 
                    `;
                    })
                    item.colors.forEach(color => {
                        document.querySelector(".colors").innerHTML += `
                            <label class="${color}-box">
                                <input type="checkbox" name="color" value="${color}">
                                <span></span>
                            </label>
                    `;
                }) 
            }
        })
        const colors = document.querySelector(".colors");
        const color = colors.querySelectorAll("label");
        const sizes = document.querySelector(".size");
        const size = sizes.querySelectorAll("span");

        size.forEach(item => {
            item.addEventListener("click", function(e){
                if(e.target.tagName === "SPAN"){
                    size.forEach(b => b.classList.remove('active')); 
                    this.classList.add("active")
                    
                    selectedSize = this.textContent;
                    cart[cart.length-1].size = selectedSize
                    localStorage.setItem("Cart",JSON.stringify(cart))
                }
            });
        });

        color.forEach(item => {
            item.addEventListener("click", function(e){
                if(e.target.tagName === "SPAN") {
                    color.forEach(b => b.classList.remove('active')); 
                    this.classList.add("active")
                    
                    selectedColor = window.getComputedStyle(this).backgroundColor;
                    cart[cart.length-1].color = selectedColor
                    localStorage.setItem("Cart" , JSON.stringify(cart))
                }
            });
        });
    }
    )

    if (cart.length > 0) {
        const lastProduct = cart[cart.length - 1];
        mainImage.src = lastProduct.photo;
        firstSmallImage.src = lastProduct.photo;
        productTitle.textContent = lastProduct.title;
        cost.textContent = lastProduct.price
    }

    smallImages.forEach(function(img){
    img.addEventListener("click" , function(e){
        mainImage.src = e.target.getAttribute("src");
        e.target.style.opacity = 1;
    })
    })

    addBasket.addEventListener("click", function(){
       
        if(selectedColor && selectedSize){
            window.location.replace("shopping-bag-page.html");
        } 

        else {
            alert("Please select color and size");
        }
    });
 
    const favIcon = document.querySelector(".black-fav-icon");
    favIcon.addEventListener("click" , () => {

        favIcon.classList.toggle("active");
        
        let favorites = JSON.parse(localStorage.getItem("Favorites")) || [];

        const newFavorite = {
            title: document.querySelector(".product-title").textContent,
            price: document.querySelector(".cost").textContent,
            photo: document.querySelector(".photo").src,
    };

        favorites.push(newFavorite);
        localStorage.setItem("Favorites", JSON.stringify(favorites));
    })
}

//SHOPPING-BAG-PAGE SCRIPTLERI 
if(document.body.className ==="sbp"){

    let cart = JSON.parse(localStorage.getItem("Cart")) || [];

    const totalProduct = document.querySelector(".total-amount")
    
    let total = 0;

    cart.forEach(item => {
        total += Number(item.quantity); 
    });

    totalProduct.textContent = total;
   
    const continueButton = document.querySelector(".continue-button");
    const acceptCheckBox = document.getElementById("accept");
    const leftPart = document.querySelector(".left-part");

    leftPart.innerHTML = "";

    cart.forEach((item, index) => {
        leftPart.innerHTML += `
            <div class="product-container" data-index="${index}">
                <img class="product-img" src="${item.photo}">
                <p class="product-t">${item.title}</p>
                <div class = "p-info">
                    <p class="product-d">${item.description}</p>
                    <p class="cost">${item.price}</p>
                </div>
            </div>
            <div class="transaction">
                <img class="close-icon" src="icons/close-icon.png">
                <p class="size">L</p>
                <div class="color-box"></div>
                        
                <div class="buttons">    
                    <button class="increase">+</button>
                    <div class="amount">1</div>
                    <button class="decrease">-</button>
                </div>
                <img class="refresh-icon" src="icons/refresh.png">
            </div>
        `;
    });
   
    const sizes = document.querySelectorAll(".size")
    const colors = document.querySelectorAll(".color-box")

    sizes.forEach((size, index) => {
        size.innerHTML = cart[index].size;
    });

    colors.forEach((color , index) => {
        color.style.backgroundColor = cart[index].color;
    })


    const amount = document.querySelectorAll('.amount');
    const increaseButton = document.querySelectorAll(".increase")
    increaseButton.forEach((button, index) => {
    button.addEventListener("click", () => {
        cart[index].quantity += 1;
        amount[index].textContent = cart[index].quantity;
        localStorage.setItem("Cart" , JSON.stringify(cart));
        const subTotal = document.querySelector(".sub-total");
        const shippingCost = document.querySelector(".shipping")
        const totalCost = document.querySelector(".total")

        let cost = 0;

        cart.forEach(item => {
            let priceNumber = parseInt(item.price.replace(/[^0-9.]/g, ""));
            cost += priceNumber * item.quantity
        })

        subTotal.textContent = "$"+cost;

        totalCost.textContent = "$" + parseInt(cost + Number(shippingCost.textContent.replace("$","")))

    });
});
    
    const decreaseButton = document.querySelectorAll('.decrease');
    decreaseButton.forEach((button, index) => {
        button.addEventListener("click", () => {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
                amount[index].textContent = cart[index].quantity;
                localStorage.setItem("Cart" , JSON.stringify(cart));
            }
            const subTotal = document.querySelector(".sub-total");
            const shippingCost = document.querySelector(".shipping")
            const totalCost = document.querySelector(".total")

            let cost = 0;

            cart.forEach(item => {
                let priceNumber = parseInt(item.price.replace(/[^0-9.]/g, ""));
                cost += priceNumber * item.quantity
            })

            subTotal.textContent = "$"+cost;

            totalCost.textContent = "$" + parseInt(cost + Number(shippingCost.textContent.replace("$","")))
        });
    });

    const refreshButton = document.querySelectorAll('.refresh-icon');
    refreshButton.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            cart[index].quantity = 1;
            amount[index].textContent = 1;
            localStorage.setItem("Cart" , JSON.stringify(cart));
            
            const subTotal = document.querySelector(".sub-total");
            const shippingCost = document.querySelector(".shipping")
            const totalCost = document.querySelector(".total")

            let cost = 0;

            cart.forEach(item => {
                let priceNumber = parseInt(item.price.replace(/[^0-9.]/g, ""));
                cost += priceNumber * item.quantity
            })

            subTotal.textContent = "$"+cost;

            totalCost.textContent = "$" + parseInt(cost + Number(shippingCost.textContent.replace("$","")))
        });
    });
  
    document.addEventListener("click", function(e) {
        if (e.target.classList.contains("close-icon")) {
            
            const transaction = e.target.closest(".transaction");
            const product = transaction.previousElementSibling;

            product.remove();
            transaction.remove();

            const leftPart = document.querySelector(".left-part");
            const rightPart = document.querySelector(".right-part");

            if (!leftPart.querySelector(".product-container")) {
                leftPart.remove()
                rightPart.remove()
                localStorage.clear()
            } 
        }
    });

    continueButton.addEventListener("click" , () => {
        if(acceptCheckBox.checked){
            window.location.replace("checkout.html");
        }
        else{
            window.alert("Please Agree Terms And Conditions To Continue")
        }
    })

    const favoritePage = document.querySelector(".fav")
    
    favoritePage.addEventListener("click" , () => {

        let favorites = JSON.parse(localStorage.getItem("Favorites")) || [];
        leftPart.innerHTML = "";

        favorites.forEach((item , index) => {
             leftPart.innerHTML += `
             <div class="product-container" data-index = ${index}>
                        <img class = "product-img" src="${item.photo}">
                    <p class="product-t">${item.title}</p>
            </div>
        `;
        })
    })

//CHECKOUT PAGE SCRIPTLERI
if(document.body.className === "cp"){

    const backButton = document.querySelector(".forward-arrow")
    const cost = document.querySelector(".t-cost")
    const totalCost = document.querySelector(".total-c")
    const form = document.querySelector("form")
    

    backButton.addEventListener("click" ,() => {
        window.location.replace("shopping-bag-page.html")
    })
    
    let cart = JSON.parse(localStorage.getItem("Cart")) || [];

    const products = document.querySelector(".products-area");
    products.innerHTML = ""

    let subtotal = 0;
    let totalProduct = 0;

    const colorMap = {
        "rgb(217,217,217)": "Cream",
        "rgb(169,169,169)": "Grey",
        "rgb(0,0,0)": "Black",
        "rgb(166,214,202)": "Green",
        "rgb(255,255,255)": "White",
        "rgb(185,193,232)": "Light Purple"
    };


    cart.forEach((item,index) => {

        totalProduct += parseInt(item.quantity)
        const totalAmount = document.querySelector(".t-amount")
        totalAmount.textContent = "(" + totalProduct + ")"

        let priceNumber = parseInt(item.price.replace(/[^0-9.]/g, ""));
        subtotal += priceNumber * item.quantity
        
        let color = item.color.replace(/\s/g, "");
        let colorName = colorMap[color] || "Empty  Color";

        products.innerHTML += `
            <div class="product-container" data-index="${index}">
                    <img class="product-img" src="${item.photo}">
                    <div class="product-d">
                        <div>
                            <p class="product-t">"${item.title}"</p>
                            <p class="product-s">${colorName}/${item.size}</p>
                        </div>
                        <div class="amount-co">
                            <p class="amount">(${item.quantity})</p>
                            <p class="cost">${(item.price)}</p>
                        </div>
                    </div>  
            </div>
        `;
    })
    cost.textContent = "$" + subtotal.toFixed(2);
    totalCost.textContent = "$" + subtotal.toFixed(2);

    

    function validateForm(e) {

        function setError(inputType) {
            inputType.classList.add("error")
            inputType.classList.remove("success")
        }

        function setSuccess(inputType) {
            inputType.classList.add("success")
            inputType.classList.remove("error");   
        }


        const emailInput = document.getElementById("email")
        const phoneInput = document.getElementById("tel")
        const firstNameInput = document.getElementById("fName")
        const lastNameInput = document.getElementById("lName")
        const countryInput = document.getElementById("country")
        const stateInput = document.getElementById("state")
        const addressInput = document.getElementById("address")
        const cityInput = document.getElementById("city")
        const postalCodeInput = document.getElementById("postal")
        const form = document.querySelector("form")

        let email = emailInput.value.trim();
        let phone = phoneInput.value.trim();
        let fName = firstNameInput.value.trim();
        let lName = lastNameInput.value.trim();
        let country = countryInput.value.trim();
        let state = stateInput.value.trim();
        let address = addressInput.value.trim();
        let city = cityInput.value.trim();
        let postal = postalCodeInput.value.trim();


        if (email === "" ) {
            setError(emailInput);
            emailInput.placeholder = "Place enter a valid email address"
        }

        else{
            setSuccess(emailInput)
        }

        if (phone === "") {
            setError(phoneInput)
            phoneInput.placeholder = "Please enter a valid phone number"
        }

        else{
            setSuccess(phoneInput)
        }

        if (fName === "") {
            setError(firstNameInput)
            firstNameInput.placeholder = "Please enter a valid name"
        }
        else{
            setSuccess(firstNameInput)
        }
         
        if (lName === "") {
            setError(lastNameInput)
            lastNameInput.placeholder = "Please enter a valid surname"
        }
        else{
            setSuccess(lastNameInput)
        }
        if (country === ""){
            setError(countryInput)
            country.placeholder = "Please enter a valid country"
        }
        else{
            setSuccess(countryInput)
        }
        if(state === "" ){
            setError(stateInput)
            stateInput.placeholder = "Please enter a valid state"
        }
        else{
            setSuccess(stateInput)
        }
        if(address === ""){
            setError(addressInput)
            addressInput.placeholder = "Please enter a valid address"
        }
        else{
            setSuccess(addressInput)
        }

        if (city === "") {
            setError(cityInput)
            cityInput.placeholder = "Please enter a city"
        }
        else{
            setSuccess(cityInput)
        }

        if (postal === "") {
            setError(postalCodeInput)
            postalCodeInput.placeholder = "Please enter a valid postal code"
            return false
        }

        else{
            setSuccess(postalCodeInput)
        }

        return true;
    };

    const shippingButtonInput = document.querySelector("button")
    shippingButtonInput.addEventListener("click" , () => {
        
        validateForm();
        
        if(validateForm()){
            form.submit()
            alert("Form sended")
            setTimeout(window.location.replace("index.html"),3000)
        }
    })

    
}

}
