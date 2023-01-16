// import showDropDownLaptops from "./laptops.js"

let currentLoan = 0
let currentBalance = 200
let currentPay = 0
let url = "https://hickory-quilled-actress.glitch.me/computers"

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
    updateLoanAmount()
    updateBalance()
}
const buyLapTop = (price) => {
    price = parseInt(document.getElementById("price").innerText)
    if (currentBalance >= price)
    {
        currentBalance -= price
        updateBalance()
        alert("You are the proud owner of a brand new laptop!")
    }
    else
        alert("Insufficient funds!")

}

const applyLoan = () => {
    let amount = parseInt(prompt("Please enter the loan amount"))
    if (amount == null || amount == "" || isNaN(amount))
        alert("Incorrect value")
    else if (amount > currentBalance * 2)
        alert("You cannot get a loan more than double your balance")
    else if (currentLoan != 0)
        alert("You have to pay your loan first before getting a new one")
    else
    {
        currentLoan = amount
        currentBalance += currentLoan
        updateLoanAmount()
        updateBalance()
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
}

const updateLoanAmount = () => {
    document.getElementById('loan').innerText = "Current loan: " + currentLoan
    if (currentLoan > 0)
        document.getElementById('repay').style = 'display:block'
    else
        document.getElementById('repay').style = 'display:none'
}

const dropDownLaptops = () =>
    document.getElementsById("dropDownLaptops").classList.toggle("show")

const populateLink = (data) => {
    const link = document.getElementById("dropDownLaptops")
    data.forEach(element => {
        const tag = document.createElement("option")
        tag.appendChild(document.createTextNode(element.title))
        tag.value=element.id
        link.appendChild(tag)
    })
}

const showLapTop = (e) => {
    const i = e.target.value - 1
    const baseUrl = "https://hickory-quilled-actress.glitch.me/"
    fetch(url)
    .then(response => response.json())
    .then(json => {
        document.getElementById("title").innerText = json[i].title
        document.getElementById("specs").innerText = ""
        document.getElementById("features").innerText = json[i].description
        document.getElementById("image").src = baseUrl + json[i].image
        json[i].specs.forEach(element => {
            document.getElementById("specs").innerText += element + '\n'
        document.getElementById("price").innerText = json[i].price
        });
    })
    .catch(err => alert(err))
}

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

const selectedLaptop = document.querySelector('.dropDownLaptops')
selectedLaptop.addEventListener('change', showLapTop)
