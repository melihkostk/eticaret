//HOME PAGE SCRIPTLERI
if(document.body.className === "hp"){
    const totalProduct = document.querySelector(".total-amount")
    totalProduct.textContent = localStorage.getItem("Total Amount")
   
    const addButton = document.querySelectorAll(".add-button");

    addButton.forEach(button=>{
        button.addEventListener("click" , function(){

            const card = this.closest(".product-container");

            const productTitle = card.querySelector(".product-type").textContent;
            const productDescription = card.querySelector(".product-description").textContent;
            const productPrice = card.querySelector(".cost").textContent;
            const productImage = card.querySelector(".product-img").src;
            
            const product = {
                title:productTitle,
                description:productDescription,
                price:productPrice,
                photo:productImage
            }

            localStorage.setItem("Type" , product.title);
            localStorage.setItem("Description" , product.description);
            localStorage.setItem("Price" , product.price);
            localStorage.setItem("Image" , product.photo);

            setTimeout(window.location.replace("products-page.html") , 3000);
        })
    })
}
//PRODUCTS SCRIPTLERI
if(document.body.className === "p"){

    const products = document.querySelectorAll(".product-container");
    
    products.forEach(item =>{
        item.addEventListener("click" , function(e){
            const productTitle = this.querySelector(".product-t").textContent;
            const productDescription = this.querySelector(".product-d").textContent;
            const productPrice = this.querySelector(".cost").textContent;
            const productImage = this.querySelector(".product-img").src;
            
            const product = {
                title:productTitle,
                description:productDescription,
                price:productPrice,
                photo:productImage
            }
            
            localStorage.setItem("Type" , product.title);
            localStorage.setItem("Description" , product.description);
            localStorage.setItem("Price" , product.price);
            localStorage.setItem("Image" , product.photo);
            
            setTimeout(window.location.replace("products-page.html") , 3000)
        })
    })

}

//PRODUCT PAGE SCRIPTLERI 
if(document.body.className === "pp"){

    const totalProduct = document.querySelector(".total-amount")
    totalProduct.textContent = localStorage.getItem("Total Amount")

    const smallImages = document.querySelectorAll(".small-images");
    const mainImage = document.querySelector(".photo");
    const colors = document.querySelector(".colors");
    const color = colors.querySelectorAll("label");
    const sizes = document.querySelector(".size");
    const size = sizes.querySelectorAll("span");
    const addBasket = document.querySelector(".add-button");
    const productTitle = document.querySelector(".product-title")
    const cost = document.querySelector(".cost")
    const firstSmallImage = document.querySelector('.small-images img');
    
    mainImage.src = localStorage.getItem("Image")
    firstSmallImage.src = localStorage.getItem("Image")
    productTitle.textContent = localStorage.getItem("Type")
    cost.textContent = localStorage.getItem("Price")
 
    smallImages.forEach(function(img){
    img.addEventListener("click" , function(e){
        mainImage.src = e.target.getAttribute("src");
        e.target.style.opacity = 1;
    })
})
 
    size.forEach(item => {
        item.addEventListener("click" , function(e){
            localStorage.setItem("Size" , e.target.textContent);
        })
    })

    color.forEach(item => {
        item.addEventListener("click" , function(){
            const colorValue = window.getComputedStyle(this).backgroundColor;
            localStorage.setItem("Color" , colorValue);
        })
    })

    addBasket.addEventListener("click", function(){
        setTimeout(window.location.replace("shopping-bag-page.html"),3000);
    })

    const favIcon = document.querySelector(".black-fav-icon")
    favIcon.addEventListener("click" , () => {
        const favorite = {
        }
    })
}

//SHOPPING-BAG-PAGE SCRIPTLERI 
if(document.body.className ==="sbp"){

    const totalProduct = document.querySelector(".total-amount")
    totalProduct.textContent = localStorage.getItem("Total Amount")

    const increaseButton = document.querySelectorAll('.increase');
    const decreaseButton = document.querySelectorAll('.decrease');
    const amount = document.querySelectorAll('.amount');
    const refreshButton = document.querySelectorAll('.refresh-icon');
    const subCost = document.querySelector(".sub-total"); 
    const productCost = document.querySelectorAll(".cost")
    const totalCost = document.querySelector(".total");
    const shipping = document.querySelector(".shipping");
    const product = document.querySelectorAll("product-container");
    const continueButton = document.querySelector(".continue-button");
    const acceptCheckBox = document.getElementById("accept");
    const productColor = document.querySelectorAll(".color-box")
    const mainImage = document.querySelectorAll(".product-img")
    const size = document.querySelectorAll(".size")
    let productTitle = document.querySelectorAll(".product-t")
    let productDescription = document.querySelectorAll(".product-d")

    let amount1 = Number(localStorage.getItem("Amount1")) 
    let amount2 = Number(localStorage.getItem("Amount2")) 
    let price = localStorage.getItem("Price")
    let productTotal = (amount1*price.replace("$", "")) + (amount2*price.replace("$",""))
    subCost.textContent = "$" + productTotal;

    totalCost.textContent = "$" + (parseInt(productTotal) + parseInt(shipping.textContent.replace("$","")));


    amount.forEach((div , index) => {
        div.textContent = localStorage.getItem("Amount" + (index+1))
    })

    increaseButton.forEach((button, index) => {
        button.addEventListener("click", () => {
            Number(amount[index].textContent);
            amount[index].textContent = Number(amount[index].textContent) + 1;
            localStorage.setItem("Amount" + (index+1) ,amount[index].textContent);
        });
    });

    decreaseButton.forEach((button, index) => {
        button.addEventListener("click" , () => {
            if(amount[index].textContent > 1){
                Number(amount[index].textContent);
                amount[index].textContent = Number(amount[index].textContent) - 1;
                localStorage.setItem("Amount" + (index+1) ,amount[index].textContent);
            }
        });
    });

    refreshButton.forEach((img , index) => {
        img.addEventListener("click" , () => {
            amount[index].textContent = 1;
            localStorage.setItem("Amount" + (index+1) ,"1");
        })
    })
  
  
    mainImage.forEach((img , index) =>{
        img.src = localStorage.getItem("Image");
    })

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
            } 
        }
    });


    productColor.forEach(item =>  {
        const savedColor = localStorage.getItem("Color");
        item.style.backgroundColor = savedColor;
    })

    size.forEach(item=> {
        item.textContent = localStorage.getItem("Size");
    })

    productTitle.forEach(item => {
        item.textContent = localStorage.getItem("Type")
    })

    productDescription.forEach(item => {
        item.textContent = localStorage.getItem("Description").replace("$99" , "");
    })

    continueButton.addEventListener("click" , () => {
        if(acceptCheckBox.checked){
            window.location.replace("checkout.html");
        }
        else{
            window.alert("Please Agree Terms And Conditions To Continue")
        }
    })
}

//CHECKOUT PAGE SCRIPTLERI
if(document.body.className === "cp"){
    const productImage = document.querySelectorAll(".product-img");
    productImage.forEach(item => {
        item.src = localStorage.getItem("Image");
    })

    const backButton = document.querySelector(".forward-arrow");
    backButton.addEventListener("click" , () => {
        window.location.replace("shopping-bag-page.html")
    })

    const productType = document.querySelectorAll(".product-t")
    productType.forEach(item => {
        item.textContent = localStorage.getItem("Type");
    })

    const productDescription = document.querySelectorAll(".product-s")
    productDescription.forEach(item => {
        let description = localStorage.getItem("Description")
        description = description.replace("$99" , "")
        item.textContent = description
    })

    const productAmount = document.querySelectorAll(".amount")
    productAmount.forEach((item , index) => {
        item.textContent = "(" + localStorage.getItem("Amount"+(index+1)) + ")"
    })

    const totalAmountDiv = document.querySelector(".t-amount");
    const totalAmount = totalAmountDiv.querySelector("p")
    totalAmount.textContent = Number(Number(localStorage.getItem("Amount1")) + Number(localStorage.getItem("Amount2"))) 
    localStorage.setItem("Total Amount", totalAmount.textContent)

    const shippingButtonInput = document.querySelector("button")
    const form = document.querySelector("form")

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

    shippingButtonInput.addEventListener("click" , () => {
        validateForm();
        if(validateForm()){
            form.submit()
            alert("Form sended")
            setTimeout(window.location.replace("index.html"),3000)
        }
    })

    let amount1 = Number(localStorage.getItem("Amount1")) 
    let amount2 = Number(localStorage.getItem("Amount2")) 
    let price = localStorage.getItem("Price")
    
    let total = (amount1 * price.replace("$" , "")) + (amount2 * price.replace("$" , ""))

    const totalPrice = document.querySelector(".t-cost");
    totalPrice.textContent = "$" + total;

    const totalCost = document.querySelector(".total-c")
    totalCost.textContent = "$" + total;
}


