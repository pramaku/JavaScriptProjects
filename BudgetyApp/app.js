var budgetController = (function() {
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    var caluculateTotals = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(current) {
            sum += current.value;
        });
        
        data.totals[type] = sum;
    }
    return {
        addItem: function(type, desc, value) {
            var newItem, ID;
            //create ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0; //first item
            }
            
            // create item
            if (type == 'exp') {
                newItem = new Expense(ID, desc, value);
            }  else if (type == 'inc') {
                newItem = new Income(ID, desc, value);
            }
            
            // add item to data
            data.allItems[type].push(newItem);
            
            return newItem;
        },
        
        calcBudget: function() {
            // caluculate total
            caluculateTotals('exp');
            caluculateTotals('inc');

            // caluculate the budget inc - exp
            data.budget = data.totals.inc - data.totals.exp;

            // caluculate the percentage.
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalIncome: data.totals.inc,
                expenses: data.totals.exp,
                percentage: data.percentage
            };
        },

        showData: function() {
            console.log(data);
        }
    };
})();

var UIController = (function() {
    var domStrings = {
        inputType: '.add__type',
        inputDesc: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetValue: '.budget__value',
        incomeBudgetValue: '.budget__income--value',
        expenseBudgetValue: '.budget__expenses--value',
        percentageValue: '.budget__expenses--percentage'
    }
    return {
        getInputData: function() {
            return {
                // will be wither inc/exp
                type: document.querySelector(domStrings.inputType).value,
                desc: document.querySelector(domStrings.inputDesc).value,
                amount: parseFloat(document.querySelector(domStrings.inputValue).value)
            }
        },

        addListItem: function(item, type) {
            var html, domElement;
            
            if (type == 'inc') {
                html = '<div class="item clearfix" id="income-%id%"><div               class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

                domElement = document.querySelector(domStrings.incomeContainer);
            } else {
                html = '<div class="item clearfix" id="expense-&id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    
                domElement = document.querySelector(domStrings.expenseContainer);
            }
            
            html = html.replace('%id%', item.id);
            html = html.replace('%description%', item.description);
            html = html.replace('%value%', item.value);
            
            domElement.insertAdjacentHTML('beforeend', html);
        },

        clearInputFields: function() {
            var fields, fieldArray;

            fields = document.querySelectorAll(domStrings.inputDesc + ', ' +         domStrings.inputValue);

            fieldArray = Array.prototype.slice.call(fields);
            
            fieldArray.forEach(function(current, index, array) {
                current.value = '';
            });
            
            fieldArray[0].focus();
        },

        displayBudget: function(budget) {
            var element;
            
            element = document.querySelector(domStrings.budgetValue);
            element.textContent = budget.budget;

            element = document.querySelector(domStrings.incomeBudgetValue);
            element.textContent = budget.totalIncome;

            element = document.querySelector(domStrings.expenseBudgetValue);
            element.textContent = budget.expenses;

            element = document.querySelector(domStrings.percentageValue);
            if (budget.percentage > 0) {
                element.textContent = budget.percentage + '%';
            } else {
                element.textContent = '--';
            }
            
        },

        getDomStrings: function() {
            return domStrings;
        }
    }
})();

var controller = (function(budgetCtrl, uiCtrl) {
    
    var setUpEventListeners = function() {
        var DOM = uiCtrl.getDomStrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    
        document.addEventListener('keypress', function(event) {
            if (event.keycode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    var updateBudget = function() {
        var budget;

        // caluculate the budget.
        budgetCtrl.calcBudget();
        
        // return the budget.
        budget = budgetCtrl.getBudget();
        console.log(budget);

        // display the budget in UI.
        uiCtrl.displayBudget(budget);
    };

    var ctrlAddItem = function() {
        var input, newItem;

        // read input data.
        input = uiCtrl.getInputData();

        // check for valid input.
        if (input.desc !== '' && !isNaN(input.amount) && input.amount > 0) {
            // add item to budget controller.
            newItem = budgetCtrl.addItem(input.type, input.desc, input.amount);

            // add item to UI controller.
            uiCtrl.addListItem(newItem, input.type);

            // clear the input fields
            uiCtrl.clearInputFields();

            // caluculate and update budget
            updateBudget();
        }
    }

    return {
        init: function() {
            console.log('Application started');
            uiCtrl.displayBudget({
                budget: 0,
                totalIncome: 0,
                expenses: 0,
                percentage: -1
            });
            setUpEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();

