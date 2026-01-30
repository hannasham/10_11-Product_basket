let productsArr = []
let amountArr = []
let priceArr = []

function getProductItem(index, product, amount, price) {
  let productItem = document.createElement("li")
  productItem.classList.add("item")

  let itemDiv = document.createElement("div")
  itemDiv.classList.add("item_div")

  let itemIndexDiv = document.createElement("div")
  itemIndexDiv.classList.add("index_div")
  itemIndexDiv.textContent = `${index + 1}`

  let itemNameDiv = document.createElement("div")
  itemNameDiv.classList.add("name_div")
  itemNameDiv.textContent = `Product: ${product}`

  let itemAmountDiv = document.createElement("div")
  itemAmountDiv.classList.add("amount_div")
  itemAmountDiv.textContent = `Amount: ${amount}`

  let itemPriceDiv = document.createElement("div")
  itemPriceDiv.classList.add("price_div")
  itemPriceDiv.textContent = `Price: ${price} €`

  let itemTotalPriceDiv = document.createElement("div")
  itemTotalPriceDiv.classList.add("total_price_div")
  itemTotalPriceDiv.textContent = `Total Price: ${price * amount} €`


  // Create Edit & Delete Btn
  let itemEditBtn = document.createElement("button")
  itemEditBtn.classList.add("edit_btn")
  itemEditBtn.textContent = "Edit"

  itemEditBtn.onclick = function () {
    let newProductName = prompt("Edit Product Name", productsArr[index])
    productsArr[index] = newProductName

    let newProductAmount = Number(prompt("Edit Product Amount", amountArr[index]))
    amountArr[index] = newProductAmount

    let newProductPrice = Number(prompt("Edit Product Price", priceArr[index]))
    priceArr[index] = newProductPrice

    render(productsArr, amountArr, priceArr)
  }

  let itemDeleteBtn = document.createElement("button")
  itemDeleteBtn.classList.add("delete_btn")
  itemDeleteBtn.textContent = "Delete"

  itemDeleteBtn.onclick = function () {
    productsArr.splice(index, 1)

    amountArr.splice(index, 1)

    priceArr.splice(index, 1)

    render(productsArr, amountArr, priceArr)

    console.log("Delete clicked");
    console.log(productsArr, amountArr, priceArr);

  }

  productItem.append(itemIndexDiv, itemNameDiv, itemAmountDiv, itemPriceDiv, itemTotalPriceDiv, itemEditBtn, itemDeleteBtn)

  productItem.append(itemDiv)
  // itemsList.append(productItem)
  return productItem
}


// Create Title
let title = document.createElement("h1")
title.classList.add("title")
title.textContent = "Purchase Check"


//Create Input Fields
let inputDiv = document.createElement("div")
inputDiv.classList.add("input")

// Name Div with Error Msg
let nameDiv = document.createElement("div")
nameDiv.classList.add("inputFieldDiv")

let nameInp = document.createElement("input")
nameInp.classList.add("input_field")
nameInp.placeholder = "Product name"

let wrongNameMsg = document.createElement("div")
wrongNameMsg.classList.add("error-msg", "hidden")
wrongNameMsg.textContent = "Name too short"

nameDiv.append(nameInp, wrongNameMsg)

// Amount Div with Error Msg
let amountDiv = document.createElement("div")
amountDiv.classList.add("inputFieldDiv")

let amountInp = document.createElement("input")
amountInp.classList.add("input_field")
amountInp.placeholder = "Amount"

let wrongAmountMsg = document.createElement("div")
wrongAmountMsg.classList.add("error-msg", "hidden")
wrongAmountMsg.textContent = "Amount should be more than 0, only numbers allowed"

amountDiv.append(amountInp, wrongAmountMsg)


// Price Div with Error Msg
let priceDiv = document.createElement("div")
priceDiv.classList.add("inputFieldDiv")

let priceInp = document.createElement("input")
priceInp.classList.add("input_field")
priceInp.placeholder = "Price"

let wrongPriceMsg = document.createElement("div")
wrongPriceMsg.classList.add("error-msg", "hidden")
wrongPriceMsg.textContent = "Price should be more than 0, only numbers allowed"

priceDiv.append(priceInp, wrongPriceMsg)


// Add Button
let addBtn = document.createElement("button")
addBtn.classList.add("input_field", "add_btn")
addBtn.textContent = "Add"

addBtn.onclick = function () {

  hideAllErrors();

  let productNameVal = nameInp.value
  let productAmountVal = Number(amountInp.value)
  let productPriceVal = Number(priceInp.value)

  let isValid = true

  // Name Validation
  if (productNameVal.length < 1) {
    wrongNameMsg.classList.remove("hidden")
    wrongNameMsg.classList.add("show")
    isValid = false
  }

  // Amount Validation
  if (productAmountVal < 1 || isNaN(productAmountVal)) {
    wrongAmountMsg.classList.remove("hidden")
    wrongAmountMsg.classList.add("show")
    isValid = false
  }

  // Price Validation
  if (productPriceVal < 1 || isNaN(productPriceVal)) {
    wrongPriceMsg.classList.remove("hidden")
    wrongPriceMsg.classList.add("show")
    isValid = false
  }

  if (!isValid) {
    return
  }

  productsArr.push(productNameVal)
  amountArr.push(productAmountVal)
  priceArr.push(productPriceVal)

  render(productsArr, amountArr, priceArr)

  clearAllFields()

  console.log(productsArr, amountArr, priceArr);
}

// Create Output List
let itemsList = document.createElement("ul")
itemsList.classList.add("list")

// Create Total Count Div
let totalCountDiv = document.createElement("div")
totalCountDiv.classList.add("total_count_div")
totalCountDiv.textContent = "Total Purchase Price:"

let totalCountSpan = document.createElement("span")
totalCountSpan.classList.add("total_count_span")
totalCountSpan.textContent = `0 €`

function render(name, amount, price) {
  itemsList.innerHTML = ""

  let totalCount = 0

  for (let i = 0; i < name.length; i++) {
    // create list item
    let productItem = getProductItem(i, name[i], amount[i], price[i])

    totalCount += amount[i] * price[i]
    itemsList.append(productItem)
  }

  totalCountSpan.textContent = `${totalCount} €`

}

function hideAllErrors() {
  wrongNameMsg.classList.remove("show")
  wrongNameMsg.classList.add("hidden")
  wrongAmountMsg.classList.remove("show")
  wrongAmountMsg.classList.add("hidden")
  wrongPriceMsg.classList.remove("show")
  wrongPriceMsg.classList.add("hidden")
}

function clearAllFields() {
  nameInp.value = ""
  amountInp.value = ""
  priceInp.value = ""
  hideAllErrors()
}

totalCountDiv.append(totalCountSpan)
inputDiv.append(nameDiv, amountDiv, priceDiv, addBtn)
document.body.append(title, inputDiv, itemsList, totalCountDiv)