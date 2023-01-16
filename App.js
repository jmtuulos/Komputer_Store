// import showDropDownLaptops from "./laptops.js"

let currentBalance = 200
let currentLoan = 0
let currentPay = 0
let url = "https://hickory-quilled-actress.glitch.me/computers"
let obj

class Laptop {
    constructor(data) {
        this.title = data.title
        this.id = data.id
        this.specs = data.specs
        this.description = data.description
        this.price = data.price
        this.stock = data.stock
        this.active = data.active
        this.image = data.image
    }

}
fetch(url)
    .then(response => response.json())
    .then(json => populateLink(json))
    .catch(err => alert(err));

const updateBalance = () => {
    document.getElementById("balance").innerText = currentBalance
}

const updateWorkBalance = () => {
    document.getElementById("pay").innerText = currentPay
}

const work = () => {
    currentPay += 100
    return (currentPay)
}

const Bank = () => {
    if (currentLoan != 0)
    {
        currentLoan -= 0.10 * currentPay
        if (currentLoan < 0)
        {
            currentPay += Math.abs(currentLoan)
            currentLoan = 0;
        }
        currentPay = 0.90 * currentPay
    }
    transferToBank()
}

const transferToBank = () => {
    currentBalance += currentPay
    currentPay = 0
    updateWorkBalance()
    updateBalance()
    updateLoanAmount()
}


const applyLoan = () => {
    let amount = parseInt(prompt("Please enter the loan amount"))
    if (amount == null || amount == "" || isNaN(amount))
        alert("Incorrect value")
    else if (amount * 2 > currentBalance)
        alert("You cannot get a loan more than double your balance")
    else if (currentLoan != 0)
        alert("You have to pay your loan first before getting a new one")
    else
    {
        currentLoan = amount
        updateLoanAmount()
    }
    return (currentBalance)
}

const repayLoan = () => {
    currentLoan -= currentPay
    if (currentLoan < 0)
    {
        currentBalance += Math.abs(currentLoan)
        currentLoan = 0;
    }
    currentPay = 0
    updateWorkBalance()
    updateLoanAmount()
    updateBalance()
}

const updateLoanAmount = () => {
    document.getElementById('loan').innerText = "Current loan: " + currentLoan
    if (currentLoan > 0)
        document.getElementById('repay').style = 'display:block'
    else
        document.getElementById('repay').style = 'display:none'
}

const dropDownLaptops = () =>
    document.getElementById("dropdownlaptops").classList.toggle("show")

const saveLaptopData = (data) => {

}

const populateLink = (data) => {
    const link = document.getElementById("dropdownlaptops")
    data.forEach(element => {
        const tag = document.createElement("a")
        tag.appendChild(document.createTextNode(element.title))
        tag.id = element.id
        tag.href = "javascript:showLapTop()"
        link.appendChild(tag)

        // console.log(tag.id + tag.innerHTML)
    })
}

const showLapTop = (id) => {
    id--
    fetch(url)
    .then(response => response.json())
    .then(json => {
        document.getElementById("title").innerText = json[id].title
        json[id].specs.forEach(element => {
            document.getElementById("specs").innerText += element + '\n'
        document.getElementById("price").innerText = json[id].price
        });
    })
    .catch(err => alert(err))
}

showLapTop(1)


window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var elements = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < elements.length; i++) {
            var openDropdown = elements[i];
            if (openDropdown.classList.contains('show'))
                openDropdown.classList.remove('show');
        }
    }
}
