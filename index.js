let ta = document.getElementById("t-am");
let ua = document.getElementById("u-am");
const ca = document.getElementById("c-am");
const tam = document.getElementById("t-am-b");
const pt = document.getElementById("p-t");
const em = document.getElementById("b-e");
const pte = document.getElementById("p-t-e");
const pce = document.getElementById("p-c-e");
const amnt = document.getElementById("amnt");
const exvl = document.getElementById("e-v");
const bcvl = document.getElementById("b-a");
const lst = document.getElementById("lst");
let tempAmount = 0;

//Set Budget Part
tam.addEventListener("click", () => {
  tempAmount = ta.value;
  //empty or negative input
  if (tempAmount === "" || tempAmount < 0) {
    em.classList.remove("hide");
  } else {
    em.classList.add("hide");
    //Set Budget
    amnt.innerHTML = tempAmount;
    //Set Balance
    bcvl.innerText = tempAmount - exvl.innerText;
    //Clear Input Box
    ta.value = "";
  }
});

//Function To Disable Edit and Delete Button
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

//Function To Modify List Elements
const modifyElement = (element, edit = false) => {
  let parentDiv = element.parentElement;
  let currentBalance = bcvl.innerText;
  let currentExpense = exvl.innerText;
  let parentAmount = parentDiv.querySelector(".amount").innerText;
  if (edit) {
    let parentText = parentDiv.querySelector(".product").innerText;
    pt.value = parentText;
    ua.value = parentAmount;
    disableButtons(true);
  }
  bcvl.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  exvl.innerText =
    parseInt(currentExpense) - parseInt(parentAmount);
  parentDiv.remove();
};

//Function To Create List
const listCreator = (expenseName, expenseValue) => {
  let sublistContent = document.createElement("div");
  sublistContent.classList.add("sublist-content", "flex-space");
  lst.appendChild(sublistContent);
  sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
  let editButton = document.createElement("button");
  editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
  editButton.style.fontSize = "1.2em";
  editButton.addEventListener("click", () => {
    modifyElement(editButton, true);
  });
  let deleteButton = document.createElement("button");
  deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
  deleteButton.style.fontSize = "1.2em";
  deleteButton.addEventListener("click", () => {
    modifyElement(deleteButton);
  });
  sublistContent.appendChild(editButton);
  sublistContent.appendChild(deleteButton);
  document.getElementById("list").appendChild(sublistContent);
};

//Function To Add Expenses
ca.addEventListener("click", () => {
  //empty checks
  if (!ua.value || !pt.value) {
    pte.classList.remove("hide");
    return false;
  }
  //Enable buttons
  disableButtons(false);
  //Expense
  let expenditure = parseInt(ua.value);
  //Total expense (existing + new)
  let sum = parseInt(exvl.innerText) + expenditure;
  exvl.innerText = sum;
  //Total balance(budget - total expense)
  const totalBalance = tempAmount - sum;
  bcvl.innerText = totalBalance;
  //Create list
  listCreator(pt.value, ua.value);
  //Empty inputs
  pt.value = "";
  ua.value = "";
});