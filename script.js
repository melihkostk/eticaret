 //HOME PAGE SCRIPTLERI
if(document.body.className === "hp"){

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

            console.log(product)

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
    const smallImages = document.querySelectorAll(".small-images");
    const mainImage = document.querySelector(".photo");
    const colors = document.querySelector(".colors");
    const color = colors.querySelectorAll("label");
    const sizes = document.querySelector(".size");
    const size = sizes.querySelectorAll("span");
    const addBasket = document.querySelector(".add-button");
    const productTitle = document.querySelector(".product-title")
    const cost = document.querySelector(".cost")
    
    mainImage.src = localStorage.getItem("Image")
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
        window.location.replace("shopping-bag-page.html");
    }
)}

//SHOPPING-BAG-PAGE SCRIPTLERI 
if(document.body.className ==="sbp"){
    const increaseButton = document.querySelectorAll('.increase');
    const decreaseButton = document.querySelectorAll('.decrease');
    const amount = document.querySelectorAll('.amount');
    const refreshButton = document.querySelectorAll('.refresh-icon');
    const cost = document.querySelector(".sub-total");
    const fszCost = document.querySelector(".fsz-cost");
    const bsfCost = document.querySelector(".bsf-cost");
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
    
    increaseButton.forEach((button, index) => {
        button.addEventListener("click", () => {
            Number(amount[index].textContent);
            amount[index].textContent = Number(amount[index].textContent) + 1;
        });
    });

    decreaseButton.forEach((button, index) => {
        button.addEventListener("click" , () => {
            if(amount[index].textContent > 1){
                Number(amount[index].textContent);
                amount[index].textContent = Number(amount[index].textContent) - 1;
            }
        });
    });

    refreshButton.forEach((img , index) => {
        img.addEventListener("click" , () => {
            amount[index].textContent = 1;
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

    fszCost.textContent = localStorage.getItem("Price");
    bsfCost.textContent = localStorage.getItem("Price")

    productTitle.forEach(item => {
        item.textContent = localStorage.getItem("Type")
    })

    productDescription.forEach(item => {
        item.textContent = localStorage.getItem("Description")
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
        item.textContent = localStorage.getItem("Description")
    })

    const cost = document.querySelectorAll(".cost")
    cost.forEach(item => {
        item.textContent = localStorage.getItem("Price")
    })
}


