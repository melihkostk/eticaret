//SHOPPING-BAG-PAGE SCRIPTLERI 
if(document.body.className==="sbp"){
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


    increaseButton.forEach((button, index) => {
        button.addEventListener("click", () => {
            Number(amount[index].textContent);
            amount[index].textContent = Number(amount[index].textContent) + 1;
        });
    });

    decreaseButton.forEach((button, index) => {
        button.addEventListener("click" , () => {
            if(amount[index].textContent > 0){
                Number(amount[index].textContent);
                amount[index].textContent = Number(amount[index].textContent) - 1;
            }
        });
    });

    refreshButton.forEach((img , index) => {
        img.addEventListener("click" , () => {
            amount[index].textContent = 0;
        })
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

    continueButton.addEventListener("click" , () => {
        if(acceptCheckBox.checked){
            window.location.replace("checkout.html");
        }
    })
}

//PRODUCT PAGE SCRIPTLERI 
if(document.body.className == "pp"){
    const smallImages = document.querySelectorAll(".small-images");
    const mainImage = document.querySelector(".photo");
    const colors = document.querySelector(".colors");
    const color = colors.querySelectorAll("label");
    const sizes = document.querySelector(".size");
    const size = sizes.querySelectorAll("span");
    const addBasket = document.querySelector(".add-button");
    const productInfo = document.querySelector(".right-part");

    smallImages.forEach(function(img){
    img.addEventListener("click" , function(e){
        mainImage.src = e.target.getAttribute("src");
        e.target.style.opacity = 1;
    })
})

    //seçilen bedeni localStorageda tutar 
    size.forEach(item => {
        item.addEventListener("click" , function(e){
            localStorage.setItem("Size" , e.target.textContent);
        })
    })

    //seçilen rengi localStorageda tutar
    color.forEach(item => {
        item.addEventListener("click" , function(e){
            localStorage.setItem("Color" , e.target.value);
        })
    })

    //seçilen ürünü beden, renk , başlık ve fiyatıyla localStorageda tutar
    addBasket.addEventListener("click", function(){
        const title = document.querySelector(".product-title").textContent;
        
        const color = localStorage.getItem("Color");
        const size = localStorage.getItem("Size");

        const price = document.querySelector(".cost").textContent;

        const product = {
            title,
            size,
            color,
            price
        }

        localStorage.setItem("Product", JSON.stringify(product))

        window.location.replace("shopping-bag-page.html");
    })
}






