let currentLoan = 0
let currentBalance = 0
let currentPay = 0
let currentLaptopPrice = 0
let url = "https://hickory-quilled-actress.glitch.me/computers"

// Initial fetch of the json data
fetch(url)
.then(response => response.json())
.then(json => populateLink(json))
.catch(err => alert(err));

const updateBalance = () => {
    document.getElementById("balance").innerText = eurCurrency(currentBalance)
}

const updateWorkBalance = () => {
    document.getElementById("pay").innerText = eurCurrency(currentPay)
}

const eurCurrency = (value) => {
    return (
        new Intl.NumberFormat(
            'fi-FI', {style: 'currency', currency: 'EUR'})
            .format(value)
    )
}

const work = () => {
    currentPay += 100
    return (eurCurrency(currentPay))
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
    if (currentBalance >= currentLaptopPrice)
    {
        currentBalance -= currentLaptopPrice
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
    updateBalance()
    updateLoanAmount()
}

const updateLoanAmount = () => {
    document.getElementById('loan').innerText = "Current loan: " + eurCurrency(currentLoan)
    if (currentLoan > 0)
    document.getElementById('repay').style = 'display:inline'
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
        document.getElementById("specs").innerText = "Specs:\n"
        document.getElementById("features").innerText = json[i].description
        imgElement = document.getElementById("image")
        imgElement.src = baseUrl + json[i].image
        currentLaptopPrice = json[i].price
        json[i].specs.forEach(element => {
            document.getElementById("specs").innerText += element + '\n'
            document.getElementById("price").innerText = "Price: " + eurCurrency(json[i].price)
        });
    })
    .catch(err => alert(err))
}

// Hiding the dropdown selection when clicked outside of it

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
