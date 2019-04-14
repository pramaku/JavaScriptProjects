var budgetController = (function() {
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            data.allItems.exp.forEach(function(current) {
                current.percentage =  Math.round((current.value / totalIncome ) * 100);
            });
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }

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
    };

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
        
        removeItem: function(type, id) {
            var ids, index;
            
            var ids = data.allItems[type].map(function(current) {
               return current.id; 
            });

            index = ids.indexOf(id);
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
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

        calcPercentages: function() {
            data.allItems.exp.forEach(function(current) {
                current.calcPercentage(data.totals.inc);
            });
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalIncome: data.totals.inc,
                expenses: data.totals.exp,
                percentage: data.percentage
            };
        },

        getPercentages: function() {
            return data.allItems.exp.map(function(current) {
                return current.getPercentage(); 
            });
        },

        showData: function() {
            return data;
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
        percentageValue: '.budget__expenses--percentage',
        container: '.container',
        expensesPercentage: '.item__percentage',
        budgetTitleMonth: '.budget__title--month'
    };

    var formatNumber= function(num, type) {
        // +/- before number if inc/exp
        // exactly 2 decimal
        // use , for thousands
        var numSplit, int, decimal, sign;
        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');
        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' +
                    int.substr(int.length - 3, 3);
        }

        decimal = numSplit[1];
        return (type === 'exp'? '-' : '+') + ' ' + int + '.' + decimal;
    };

    var nodeListForEach = function(list, callback) {
        for (var i=0; i< list.length; i++) {
            callback(list[i], i);
        }
    };

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
                html = '<div class="item clearfix" id="inc-%id%"><div               class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

                domElement = document.querySelector(domStrings.incomeContainer);
            } else {
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    
                domElement = document.querySelector(domStrings.expenseContainer);
            }
            
            html = html.replace('%id%', item.id);
            html = html.replace('%description%', item.description);
            html = html.replace('%value%', formatNumber(item.value, type));
            
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
            var element, sign;

            budget.budget > 0? sign = 'inc': sign = 'exp';
            element = document.querySelector(domStrings.budgetValue);
            element.textContent = formatNumber(budget.budget, sign);

            element = document.querySelector(domStrings.incomeBudgetValue);
            element.textContent = formatNumber(budget.totalIncome, 'inc');

            element = document.querySelector(domStrings.expenseBudgetValue);
            element.textContent = formatNumber(budget.expenses, 'exp');

            element = document.querySelector(domStrings.percentageValue);
            if (budget.percentage > 0) {
                element.textContent = budget.percentage + '%';
            } else {
                element.textContent = '--';
            }            
        },

        getDomStrings: function() {
            return domStrings;
        },
        
        removeListItem: function(itemId) {
            var element;
            element = document.getElementById(itemId);
            element.parentNode.removeChild(element);
        },

        displayPercentages: function(percentages) {
            var fields;
            fields = document.querySelectorAll(domStrings.expensesPercentage);
            
            nodeListForEach(fields, function(current, index) {
                if (percentages[index] >= 0) {
                    current.textContent =  percentages[index] + '%';
                } else {
                    current.textContent = '--';
                }
            });
        },
        
        displayMonth: function() {
            var now, month, year;

            var now = new Date();
            
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = months[now.getMonth()];
            year = now.getFullYear();
            document.querySelector(domStrings.budgetTitleMonth).textContent = 
                        month  + ' ' + year;
        },

        changedType: function() {
            var fields;
            fields = document.querySelectorAll(
                domStrings.inputType + ',' +
                domStrings.inputDesc + ',' +
                domStrings.inputValue);
            
            nodeListForEach(fields, function(current) {
                current.classList.toggle('red-focus');
            });
            
            document.querySelector(domStrings.inputBtn).classList.toggle('red');
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

        document.querySelector(DOM.container)
            .addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType)
            .addEventListener('change', uiCtrl.changedType);
    };

    var updateBudget = function() {
        var budget;

        // caluculate the budget.
        budgetCtrl.calcBudget();
        
        // return the budget.
        budget = budgetCtrl.getBudget();

        // display the budget in UI.
        uiCtrl.displayBudget(budget);
    };

    var updatePercentages = function() {
        // caluculate the percentage.
        budgetCtrl.calcPercentages();

        // return the percentages.
        var percentages = budgetCtrl.getPercentages();

        // display the percentages in UI.
        uiCtrl.displayPercentages(percentages);
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

            // caluculate and update percentages.
            updatePercentages();
        }
    };

    var ctrlDeleteItem = function(event) {
        var itemId, splitId, type, id, itemRemoved;
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemId) {
            splitId = itemId.split('-');
            type = splitId[0];
            id = splitId[1];

            // remove the item from the data structure
            budgetCtrl.removeItem(type, parseInt(id));

            // remove the element from UI
            uiCtrl.removeListItem(itemId);

            // update and show the budget.
            updateBudget();

            // caluculate and update percentages.
            updatePercentages();
        }
    };

    return {
        init: function() {
            console.log('Application started');
            uiCtrl.displayBudget({
                budget: 0,
                totalIncome: 0,
                expenses: 0,
                percentage: -1
            });
            uiCtrl.displayMonth();
            setUpEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();

