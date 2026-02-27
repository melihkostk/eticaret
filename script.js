//HOME PAGE SCRIPTLERI
if(document.body.className === "hp"){

     fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("header").innerHTML = data;

            const menuIcon = document.querySelector(".menu-icon");
            menuIcon.addEventListener("click", () => {
                document.querySelector(".drawer").style.left = 0;
            })

            let totalProduct = document.querySelector(".total-amount");
            let cart = JSON.parse(localStorage.getItem("Cart")) || [];

            let total = 0;

            cart.forEach(item => {
                total += Number(item.quantity); 
            });

            totalProduct.textContent = total;
        });

    const closeMenu = document.querySelector(".close-menu");
    closeMenu.addEventListener("click",() => {
        document.querySelector(".drawer").style.left = "-300px";
    })

    const collections = document.querySelector(".hp-col");
    collections.addEventListener("click",() => {
        window.location.replace("products.html")
    })

    const productImage = document.querySelectorAll(".hp-product-img")
    const productTitle = document.querySelectorAll(".hp-product-description")


    productImage.forEach((item,index) => {
    item.addEventListener("click" , () => {
        window.location.href = `products-page.html?id=${index+1}`;
        })
    })

    productTitle.forEach((item,index) => {
    item.addEventListener("click" , () => {
        window.location.href = `products-page.html?id=${index+1}`;
        })
    })

    const seeAllButton = document.querySelector(".hp-see-all")
    seeAllButton.addEventListener("click" , () => {
        window.location.replace("products.html")
    })

    const searchInput = document.querySelector("input")
    const products = document.querySelectorAll(".hp-product-container");

    searchInput.addEventListener("input", function () {

    const searchValue = this.value.toLowerCase();

    products.forEach(product => {

        const title = product
            .querySelector(".hp-product-description")
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

    const addButton = document.querySelectorAll(".hp-add-button");

    addButton.forEach((button,index)=>{
        button.addEventListener("click" , function(){

            const productCard = this.closest(".hp-product-container");

            const product = {
                title: productCard.querySelector(".hp-product-type").textContent,
                description: productCard.querySelector(".hp-product-description").textContent,
                price: productCard.querySelector(".cost").textContent,
                photo: productCard.querySelector(".hp-product-img").src,
                size:null,
                color:null,
                quantity:1
            }
        
            let cart = JSON.parse(localStorage.getItem("Cart")) || [];

            cart.push(product);

            localStorage.setItem("Cart", JSON.stringify(cart));

            alert("Ürün başarıyla sepete eklendi")
              
        })
    })
    
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("footer").innerHTML = data;
        });
}

//PRODUCTS SCRIPTLERI
if(document.body.className === "p"){

       fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("header").innerHTML = data;

            const menuIcon = document.querySelector(".menu-icon");
            menuIcon.addEventListener("click", () => {
                document.querySelector(".drawer").style.left = 0;
            })
        });

    const closeMenu = document.querySelector(".close-menu");
    closeMenu.addEventListener("click",() => {
        document.querySelector(".drawer").style.left = "-300px";
    })

    const cateButtons = document.querySelectorAll(".p-cate-button")

    cateButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const category = this.textContent.toLowerCase();
        fetch("product.json")
            .then(response => response.json())
            .then(data => {
                const filteredProducts = data.products.filter(product => product.category === category);  //Map ekleme fikrini kod yazdırmadan ChatGPT ye sordum 
                 const productContainer = filteredProducts.map(product => ` 
                    <div class="p-product-container">
                        <img class="p-product-img" src="${product.photo}">
                        <p class="p-product-t">${product.type}</p>
                        <p class="p-product-d">${product.name}<span class="cost">${product.price}</span></p>
                    </div>
                `).join(''); 

                document.querySelector(".p-bottom").innerHTML = productContainer;
            })
    });
});
    
    const searchInput = document.querySelector(".p-search")

    const productTitles = document.querySelectorAll(".p-product-container");

    searchInput.addEventListener("input", function () {

    const searchValue = this.value.toLowerCase();

    products.forEach(product => {

        const title = product
            .querySelector(".p-product-d")
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

    const products = document.querySelectorAll(".p-product-container");
    
    products.forEach(item =>{
        item.addEventListener("click" , function(e){
            
           const productCard = this.closest(".p-product-container");

            const product = {
                title: productCard.querySelector(".p-product-t").textContent,
                description: productCard.querySelector(".p-product-d").textContent,
                price: productCard.querySelector(".p-cost").textContent,
                photo: productCard.querySelector(".p-product-img").src,
                size:null,
                color:null,
                quantity:1
            }

            let cart = JSON.parse(localStorage.getItem("Cart")) || [];

            cart.push(product);

            localStorage.setItem("Cart", JSON.stringify(cart));

        })
    })

    const menuOpener = document.querySelector(".p-filter-opener");
    const menu = document.querySelector(".p-menu-container");
    const menuTitle = document.querySelectorAll(".p-menu-title");
    
    menuOpener.addEventListener("click" , () => {
        menu.classList.toggle("closed");
    })
}

//PRODUCT PAGE SCRIPTLERI 
if(document.body.className === "pp"){

    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("header").innerHTML = data;

            const menuIcon = document.querySelector(".menu-icon");
            menuIcon.addEventListener("click", () => {
                document.querySelector(".drawer").style.left = 0;
            })

            const totalProduct = document.querySelector(".total-amount")
            let cart = JSON.parse(localStorage.getItem("Cart")) || [];
            
            let total = 0;

            cart.forEach(item => {
                total += Number(item.quantity); 
            });

            totalProduct.textContent = total;
    });

    const closeMenu = document.querySelector(".pp-close-menu");
    closeMenu.addEventListener("click",() => {
        document.querySelector(".drawer").style.left = "-300px";
    })
    

    const smallImages = document.querySelectorAll(".pp-small-images");
    const mainImage = document.querySelector(".pp-photo");
    const addBasket = document.querySelector(".pp-add-button");
    const productTitle = document.querySelector(".pp-product-title")
    const cost = document.querySelector(".pp-cost")
    const firstSmallImage = document.querySelector('.pp-small-images img');

    let URL = new URLSearchParams(document.location.search);
    let productId = URL.get("id");

    let selectedSize = null;
    let selectedColor = null;

    document.querySelector(".pp-size").innerHTML = "";
    document.querySelector(".pp-colors").innerHTML = "";

    fetch('product.json')
        .then(res =>res.json())
        .then(data => {
            data.products.forEach((item) => {
                if(productId === item.id){
                    item.sizes.forEach(size => {
                        document.querySelector(".pp-size").innerHTML += `
                            <label class="size-${size}">
                                <input type="checkbox" name="size" value="${size}">
                                <span>${size}</span>
                            </label> 
                    `;
                    })
                    item.colors.forEach(color => {
                        document.querySelector(".pp-colors").innerHTML += `
                            <label class="pp-${color}-box">
                                <input type="checkbox" name="color" value="${color}">
                                <span></span>
                            </label>
                    `;
                })
                
                mainImage.src = item.photo
                document.querySelector(".pp-product-title").textContent = item.name;
                document.querySelector(".pp-cost").textContent = item.price
                
            }
        })
        const colors = document.querySelector(".pp-colors");
        const color = colors.querySelectorAll("label");
        const sizes = document.querySelector(".pp-size");
        const size = sizes.querySelectorAll("span");

        size.forEach(item => {
            item.addEventListener("click", function(e){
                if(e.target.tagName === "SPAN"){
                    size.forEach(b => b.classList.remove('active')); 
                    this.classList.add("active")
                    
                    selectedSize = this.textContent;
                }
            });
        });

        color.forEach(item => {
            item.addEventListener("click", function(e){
                if(e.target.tagName === "SPAN") {
                    color.forEach(b => b.classList.remove('active')); 
                    this.classList.add("active")
                    
                    selectedColor = window.getComputedStyle(this).backgroundColor;
                }
            });
        });
    }
    )

    let cart = JSON.parse(localStorage.getItem("Cart")) || [];


    if (cart.length > 0) {
        const lastProduct = cart[cart.length - 1];
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

        const rightPart = document.querySelector(".pp-right-part"); 
        const leftPart = document.querySelector(".pp-left-part");
       
        if(selectedColor && selectedSize){
            const product = {
                title: rightPart.querySelector(".pp-product-title").textContent,
                price: rightPart.querySelector(".pp-cost").textContent,
                photo: leftPart.querySelector(".pp-photo").src,
                size:selectedSize,
                color:selectedColor,
                quantity:1
            }
        
            let cart = JSON.parse(localStorage.getItem("Cart")) || [];

            cart.push(product);

            localStorage.setItem("Cart", JSON.stringify(cart));

            alert("Ürün başarıyla sepete eklendi")

            window.location.replace("shopping-bag-page.html");
        } 

        else {
            alert("Please select color and size");
        }
    });
 
    const favIcon = document.querySelector(".pp-black-fav-icon");
    favIcon.addEventListener("click" , () => {

        favIcon.classList.toggle("active");
        
        let favorites = JSON.parse(localStorage.getItem("Favorites")) || [];

        const newFavorite = {
            title: document.querySelector(".pp-product-title").textContent,
            price: document.querySelector(".pp-cost").textContent,
            photo: document.querySelector(".pp-photo").src,
    };

        favorites.push(newFavorite);
        localStorage.setItem("Favorites", JSON.stringify(favorites));
    })
}

//SHOPPING-BAG-PAGE SCRIPTLERI 
if(document.body.className ==="sbp"){

      fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.querySelector("header").innerHTML = data;

            const menuIcon = document.querySelector(".menu-icon");
            menuIcon.addEventListener("click", () => {
                document.querySelector(".drawer").style.left = 0;
            })

            const totalProduct = document.querySelector(".total-amount")
    
            let total = 0;

            cart.forEach(item => {
                total += Number(item.quantity); 
            });

            totalProduct.textContent = total;
        });

    const closeMenu = document.querySelector(".close-menu");
    closeMenu.addEventListener("click",() => {
        document.querySelector(".drawer").style.left = "-300px";
    })

   
    let cart = JSON.parse(localStorage.getItem("Cart")) || [];

    const continueButton = document.querySelector(".sbp-continue-button");
    const acceptCheckBox = document.getElementById("accept");
    const leftPart = document.querySelector(".sbp-left-part");

    leftPart.innerHTML = "";

    cart.forEach((item, index) => {
        leftPart.innerHTML += `
            <div class="sbp-product-container" data-index="${index}">
                <img class="sbp-product-img" src="${item.photo}">
                <p class="sbp-product-t">${item.title}</p>
                <div class = "sbp-p-info">
                    <p class="sbp-cost">${item.price}</p>
                </div>
            </div>
            <div class="sbp-transaction">
                <img class="sbp-close-icon" src="icons/close-icon.png">
                <p class="sbp-size">L</p>
                <div class="sbp-color-box"></div>
                        
                <div class="sbp-buttons">    
                    <button class="sbp-increase">+</button>
                    <div class="sbp-amount">1</div>
                    <button class="sbp-decrease">-</button>
                </div>
                <img class="sbp-refresh-icon" src="icons/refresh.png">
            </div>
        `;
    });

   const productContainer = document.querySelectorAll(".sbp-product-container")
   
   if(productContainer.length > 3){
        leftPart.classList.add("grid");
    }

    else{
        leftPart.classList.remove("grid")
    }

    const sizes = document.querySelectorAll(".sbp-size")
    const colors = document.querySelectorAll(".sbp-color-box")

    sizes.forEach((size, index) => {
        size.innerHTML = cart[index].size;
    });

    colors.forEach((color , index) => {
        color.style.backgroundColor = cart[index].color;
    })

    const subT =  document.querySelector(".sbp-sub-total")
    const totalCost = document.querySelector(".sbp-total")
    const shippingCost = document.querySelector(".sbp-shipping")
    subT.textContent = ""

    let cost = 0;
    cart.forEach(item => {
       cost += parseInt(item.price.replace("$",""))
       subT.textContent = "$"+cost
       totalCost.textContent = "$" + parseInt(cost + Number(shippingCost.textContent.replace("$","")))

    })
  
    const amount = document.querySelectorAll('.sbp-amount');
    const increaseButton = document.querySelectorAll(".sbp-increase")
    increaseButton.forEach((button, index) => {
    button.addEventListener("click", () => {
        cart[index].quantity += 1;
        amount[index].textContent = cart[index].quantity;
        localStorage.setItem("Cart" , JSON.stringify(cart));
        const subTotal = document.querySelector(".sbp-sub-total");
        const shippingCost = document.querySelector(".sbp-shipping")
        const totalCost = document.querySelector(".sbp-total")

        let cost = 0;

        cart.forEach(item => {
            let priceNumber = parseInt(item.price.replace(/[^0-9.]/g, ""));
            cost += priceNumber * item.quantity
        })

        subTotal.textContent = "$"+cost;

        totalCost.textContent = "$" + parseInt(cost + Number(shippingCost.textContent.replace("$","")))

    });
});
    
    const decreaseButton = document.querySelectorAll('.sbp-decrease');
    decreaseButton.forEach((button, index) => {
        button.addEventListener("click", () => {
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
                amount[index].textContent = cart[index].quantity;
                localStorage.setItem("Cart" , JSON.stringify(cart));
            }
            const subTotal = document.querySelector(".sbp-sub-total");
            const shippingCost = document.querySelector(".sbp-shipping")
            const totalCost = document.querySelector(".sbp-total")

            let cost = 0;

            cart.forEach(item => {
                let priceNumber = parseInt(item.price.replace(/[^0-9.]/g, ""));
                cost += priceNumber * item.quantity
            })

            subTotal.textContent = "$"+cost;

            totalCost.textContent = "$" + parseInt(cost + Number(shippingCost.textContent.replace("$","")))
        });
    });

    const refreshButton = document.querySelectorAll('.sbp-refresh-icon');
    refreshButton.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            cart[index].quantity = 1;
            amount[index].textContent = 1;
            localStorage.setItem("Cart" , JSON.stringify(cart));
            
            const subTotal = document.querySelector(".sbp-sub-total");
            const shippingCost = document.querySelector(".sbp-shipping")
            const totalCost = document.querySelector(".sbp-total")

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
        if (e.target.classList.contains("sbp-close-icon")) {
            
            const transaction = e.target.closest(".sbp-transaction");
            const product = transaction.previousElementSibling;

            const allTransactions = document.querySelectorAll(".sbp-transaction")
            const index = Array.from(allTransactions).indexOf(transaction); 

            let cart = JSON.parse(localStorage.getItem("Cart")) || [];
           
            cart.splice(index, 1); //ChatGPT ye kodu yazdırmadan fikir sorarak yazdım 

            localStorage.setItem("Cart", JSON.stringify(cart));

            product.remove();
            transaction.remove();

            const leftPart = document.querySelector(".sbp-left-part");
            const rightPart = document.querySelector(".sbp-right-part");

            if (!leftPart.querySelector(".sbp-product-container")) {
                leftPart.remove()
                rightPart.remove()
                localStorage.clear()
            } 
        }
    });

     amount.forEach((item , index) => {
            item.textContent = parseInt(cart[index].quantity);
    })

    continueButton.addEventListener("click" , () => {
        
        if(acceptCheckBox.checked){
            window.location.replace("checkout.html");
        }

        else{
            window.alert("Please Agree Terms And Conditions To Continue")
        }
    })

    const favoritePage = document.querySelector(".sbp-fav")
    
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

}



//CHECKOUT PAGE SCRIPTLERI
if(document.body.className === "cp"){
    const backButton = document.querySelector(".cp-forward-arrow")
    const cost = document.querySelector(".t-cost")
    const totalCost = document.querySelector(".total-c")
    const form = document.querySelector("form")
    

    backButton.addEventListener("click" ,() => {
        window.location.replace("shopping-bag-page.html");
    })
    
    let cart = JSON.parse(localStorage.getItem("Cart")) || [];

    const products = document.querySelector(".cp-products-area");
    products.innerHTML = ""

    let subtotal = 0;
    let totalProduct = 0;

    const colorMap = {
        "rgb(217, 217, 217)": "Cream",
        "rgb(169, 169, 169)": "Grey",
        "rgb(0, 0, 0)": "Black",
        "rgb(166, 214, 202)": "Green",
        "rgb(255, 255, 255)": "White",
        "rgb(185, 193, 232)": "Light Purple"
    };


    cart.forEach((item,index) => {

        totalProduct += parseInt(item.quantity)
        const totalAmount = document.querySelector(".cp-t-amount")
        totalAmount.textContent = "(" + totalProduct + ")"

        let priceNumber = parseInt(item.price.replace("$", ""));
        subtotal += priceNumber * item.quantity
    
        let colorName = colorMap[item.color] || "Empty Color";

        products.innerHTML += `
            <div class="cp-product-container" data-index="${index}">
                    <img cp-class="product-img" src="${item.photo}">
                    <div class="cp-product-d">
                        <div>
                            <p class="cp-product-t">${item.title}</p>
                            <p class="cp-product-s">${colorName}/${item.size}</p>
                        </div>
                        <div class="cp-amount-co">
                            <p class="cp-amount">(${item.quantity})</p>
                            <p class="cp-cost">${(item.price)}</p>
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
            countryInput.placeholder = "Please enter a valid country"
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
            localStorage.clear()
            window.location.replace("index.html")
        }
    }) 
}

