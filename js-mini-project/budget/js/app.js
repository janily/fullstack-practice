class UI {
    constructor() {

        this.budgetFeedback = document.querySelector(".budget-feedback");
        this.expenseFeedback = document.querySelector(".expense-feedback");
        this.budgetForm = document.getElementById("budget-form");
        this.budgetInput = document.getElementById("budget-input");
        this.budgetAmount = document.getElementById("budget-amount");
        this.expenseAmount = document.getElementById("expense-amount");
        this.balance = document.getElementById("balance");
        this.balanceAmount = document.getElementById("balance-amount");
        this.expenseForm = document.getElementById("expense-form");
        this.expenseInput = document.getElementById("expense-input");
        this.amountInput = document.getElementById("amount-input");
        this.expenseList = document.getElementById("expense-list");
        this.itemList = [];
        this.itemID = 0;

    }

    submitBudgetForm() {
        const value = this.budgetInput.value;
        if(value === '' || value < 0) {
            this.budgetFeedback.classList.add('showItem');
            this.budgetFeedback.innerHTML = `<p>数值不能为空或者是小于0</p>`;
            const self = this;

            console.log(self);

            setTimeout(function(){
                self.budgetFeedback.classList.remove('showItem')
            },3000);
        } else {
            this.budgetAmount.textContent = value;
            this.budgetInput.value = '';
            this.showBalance();
        }
    }

    showBalance() {
        console.log(`hey i'am coming!!!`);
        const expense = this.totalExpense();
        const total = parseInt(this.budgetAmount.textContent) - expense;
        this.balanceAmount.textContent = total;
        if(total < 0) {
            this.balance.classList.remove('showGreen','showBlack');
            this.balance.classList.add('showRed');
        } 
        else if(total > 0) {
            this.balance.classList.remove('showRed','showBlack');
            this.balance.classList.add('showGreen');
        }
        else if(total === 0) {
            this.balance.classList.remove('showRed','showGreen');
            this.balance.classList.add('showBlack');
        }
    }

    submitExpenseForm() {
        const expenseValue = this.expenseInput.value;
        const amountValue = this.amountInput.value;
        if(expenseValue === '' || amountValue === '' || amountValue < 0) {
            this.expenseFeedback.classList.add("showItem");
            this.expenseFeedback.innerHTML = `<p>数值不能为空或者是小于0</p>`;
            const self = this;
            setTimeout(function(){
                self.expenseFeedback.classList.remove("showItem");
            }, 4000);
        } else {
            let amount = parseInt(amountValue);
            this.expenseInput.value = '';
            this.amountInput.value = '';

            let expense = {
                id:this.itemID,
                title:expenseValue,
                amount:amount,
            }
            this.itemID++;
            this.itemList.push(expense);
            this.addExpense(expense);
            this.showBalance();
        }
    }

    //add expence
    addExpense(expense) {
        const div = document.createElement('div');
        div.classList.add('expense');
        div.innerHTML = `  
        <div class="expense-item d-flex justify-content-between align-items-baseline">
        <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
        <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>
        <div class="expense-icons list-item">
         <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
          <i class="fas fa-edit"></i>
         </a>
         <a href="#" class="delete-icon" data-id="${expense.id}">
          <i class="fas fa-trash"></i>
         </a>
        </div>
       </div>
        `;
        this.expenseList.appendChild(div);
    };



    //total expense
    totalExpense() {
        let total = 0;
        console.log(this.itemList);
        total = this.itemList.reduce(function(acc,curr){
            //     // console.log(`total is ${acc} and the current value us ${curr.amount}`);
                acc += curr.amount;
                return acc;
            },0)
        // if(this.itemList.lenght > 0) {
        //     console.log(this.itemList);
        //     total = this.itemList.reduce(function(acc,curr){
        //     //     // console.log(`total is ${acc} and the current value us ${curr.amount}`);
        //         acc += curr.amount;
        //         return acc;
        //     },0)
        // }else {
        //     console.log("no expense")
        // }
        this.expenseAmount.textContent = total;
        return total;
    }

    editExpense(element) {
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement.parentElement;

        this.expenseList.removeChild(parent);

        let expense = this.itemList.filter(function(item){
            return item.id === id;
        })

        console.log(expense);

        this.expenseInput.value = expense[0].title;
        this.amountInput.value = expense[0].amount;

        let tempList = this.itemList.filter(function(item){
            return item.id !==id;
        })

        this.itemList = tempList;
        this.showBalance();
    } 

    deleteExpense(element) {
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement.parentElement;

        this.expenseList.removeChild(parent);


        let tempList = this.itemList.filter(function(item){
            return item.id === id;
        });

        this.itemList = tempList;
        this.showBalance();
    }
}

function eventListenters() {
    const budgetForm = document.getElementById("budget-form");
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list")

    const ui = new UI();

    budgetForm.addEventListener('submit', function(event) {

        event.preventDefault();
        ui.submitBudgetForm();

    });

    expenseForm.addEventListener('submit', function(event){

        event.preventDefault();
        ui.submitExpenseForm();

    });

    expenseList.addEventListener('click', function(event){


        if(event.target.parentElement.classList.contains('edit-icon')) {
            console.log(event.target.parentElement);
            ui.editExpense(event.target.parentElement);
        } else if(event.target.parentElement.classList.contains('delete-icon')) {
            ui.deleteExpense(event.target.parentElement)
        }
        event.preventDefault();

    });
}

document.addEventListener('DOMContentLoaded', function(event){
    eventListenters();
})