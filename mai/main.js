const name = document.querySelector("#name")
const deck = document.querySelector(".deck textarea")
const img = document.querySelector(".img input")
const btn = document.querySelector("#btn")
const block = document.querySelector(".block")
const error = document.querySelector(".error__name")
const errorDec = document.querySelector(".error__dec")
const erorrImg = document.querySelector(".error__img")


function val(){
    if(!name.value || !name.value.trim()){
        name.focus()
        name.style.outlineColor = "red"
        error.style.display = "block"
        return false
    }else{
        name.style.outlineColor = "lightgray"
        error.style.display = "none"
    }
    if(!deck.value || !deck.value.trim()){
        deck.focus()
        deck.style.outlineColor = "red"
        errorDec.style.display = "block"
        return false
    }else{
        deck.style.outlineColor = "lightgray"
        errorDec.style.display = "none"
    }
    if(!img.value){
        img.focus()
        img.style.outlineColor = "red"
        erorrImg.style.display = "block"
        return false
    }else{
        deck.style.outlineColor = "lightgray"
        erorrImg.style.display = "none"
    }
    if(img.value.slice(0, 8)!="https://"){
        img.focus()
        erorrImg.style.display = "block"
         erorrImg.innerHTML = "Rasmning manzili kiritilishi kerak edi."
        return false
    }else{
        erorrImg.style.display = "none"
        erorrImg.innerHTML = "rasmni url manzili kiritilishi shart"
    }
    return true
}

function getInfo(){
    let usersInfo = [];
    if(localStorage.getItem("info")){
        usersInfo = JSON.parse(localStorage.getItem("info"))
    }
    return usersInfo
}

function clear(){
    name.value = ""
    deck.value = ""
    img.value = ""
}

function creator(element){
    return ` <div data-id="id__${element.id}" class="card__back">
    <div class="delet">
                <svg  xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>
            </div>
    <div class="card__img">
        <img width="300" height="300" src="${element.img}" alt="">
    </div>
    <div class="card__text">
        <h2>${element.name}</h2>
        <p>${element.deck}</p>
        
    </div>
</div>`
}

btn && btn.addEventListener("click", function(){
    if(val()){
        let info = {
            name: name.value,
            deck: deck.value,
            img: img.value,
            id: Date.now()
        }
        clear()

        let card = creator(info)
        block.innerHTML += card

        let localInfo = getInfo();
        localInfo.push(info)
        localStorage.setItem("info", JSON.stringify(localInfo))


        const delet = document.querySelectorAll(".delet")
    delet.forEach(element =>{
        let num =  element.parentNode.getAttribute("data-id").slice(4);
        console.log(num);
        element.addEventListener("click", function(){
            this.parentNode.style.display = "none"
            let data = getInfo()
            data = data.filter(el =>{
                return el.id != num
            })
            localStorage.setItem("info", JSON.stringify(data))
        })
    })
    }
})

document.addEventListener("DOMContentLoaded", function(){
    let localInfo = getInfo();
    localInfo.forEach(element => {
        let card = creator(element)
        block.innerHTML += card
    });

    const delet = document.querySelectorAll(".delet")
    delet.forEach(element =>{
        let num =  element.parentNode.getAttribute("data-id").slice(4);
        console.log(num);
        element.addEventListener("click", function(){
            this.parentNode.style.display = "none"
            let data = getInfo()
            data = data.filter(el =>{
                return el.id != num
            })
            localStorage.setItem("info", JSON.stringify(data))
        })
    })
})