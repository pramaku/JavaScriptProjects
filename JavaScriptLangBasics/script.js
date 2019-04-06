/*
* Variables and data types
*/
var firstName = 'John';
console.log(firstName);

var lastName = 'Schmit';

var age = 28;
var fullAge = true;
console.log(fullAge);

var job;
console.log(job);

job='teacher';
console.log(job);

// variable naming rules
var _3years = 3
var johnMark = 'John and Mark'
// var if = 23 , error

/*
 * Variable mutation and type coercion
 */

// type coercion
console.log(firstName + ' ' + age);

var isMarried = false;
console.log(firstName + ' is ' + age + ' years old ' + job);
console.log('Is he married? ' + isMarried);

// variable mutation
age = 'twenty eight'
job = 'Driver'
//alert(firstName + ' is ' + age + ' years old ' + job);
//alert('Is he married? ' + isMarried);

//lastName = prompt('What is ' + firstName + ' last name? ');
console.log(firstName + ' ' + lastName);

/*
* Basic operators
*/
var currentYear, yearJohn, yearMark, ageJohn, ageMark;
currentYear = 2018;
ageJohn = 28;
ageMark = 31;

// math operators
yearJohn = currentYear - ageJohn;
yearMark = currentYear - ageMark;
console.log(yearJohn);
console.log(currentYear + 2);
console.log(currentYear / 10);

// logical operators
var johnOlder = ageJohn < ageMark;
console.log(johnOlder);

// typeof operator
console.log(typeof johnOlder);
console.log(typeof 'hello');
var x;
console.log(typeof x);

// operator precendence
yearJohn = 1989;
currentYear = 2018;
var fullAge = 18;

// subtraction operator has more 
// precedence than greater than equalto
var isJohnFullAge = currentYear - yearJohn >= fullAge;
console.log(isJohnFullAge);

var ageJohn = currentYear - yearJohn;
var ageMark = 31;
var avgAge = (ageJohn + ageMark) / 2;
console.log(avgAge);

// multiple assignments
var x, y;
x = y = (3 + 5) * 4 - 6;
console.log(x, y); // 26

// more operators
x = x * 2;
x *= 2; 
console.log(x);

x++ // incremental operator


/*****************************
* CODING CHALLENGE 1
*/

/*
Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).

1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs
3. Create a boolean variable containing information about whether Mark has a higher BMI than John.
4. Print a string to the console containing the variable from step 3. (Something like "Is Mark's BMI higher than John's? true"). 

GOOD LUCK ðŸ˜€
*/

var massJohn, massMark, heightMark, heightJohn;
var bmiJohn, bmiMark;
var isMarkBmiHigher;

massJohn = 78;
massMark = 92;

heightMark = 1.69;
heightJohn = 1.95;

bmiJohn = massJohn / (heightJohn * heightJohn);
bmiMark = massMark / (heightMark * heightMark);

isMarkBmiHigher = bmiMark > bmiJohn;
console.log('Is Mark\'s BMI higher than John\'s? ' + isMarkBmiHigher);


/*
*  If else statements
*/
firstName = 'John'
var civilStatus = 'single'
if (civilStatus === 'married') {
    console.log(firstName + ' is married');
} else {
    console.log(firstName + ' is single');
}

/*
* Boolean logic
*/
firstName = 'John';
age = 36;

if (age < 13) {
    console.log(firstName + ' is a boy');
} else if (age >= 13 && age <20) {
    console.log(firstName + ' is a teenager');
} else if (age >20 && age <30) {
    console.log(firstName + ' is a young man');
} else {
    console.log(firstName + ' is a man');
}

/*
* The ternary operator
*/
firstName = 'John';
age = 26;

age >= 18?console.log(firstName + ' drinks beer'):console.log(firstName + ' drinks juice');

age = 16;
var drink = age >= 18 ? 'beer' : 'juice';
console.log(firstName + ' drinks ' + drink);


/*
* Truthy, Falsy values and equal operators
*/

// falsy values - undefined, null, 0, '', NaN, false
// truthy values - anything other than falsy values.

var height;
height = false;
if (height || 
    height === 0 || 
    height === '' || 
    height === null || 
    height === false) {
    console.log('variable is defined');
} else {
    console.log('variable is not defined');
}

/*
*  Equality operators
*/
height = 23;
if (height == '23') { // '==' will do type coerscion before compare
    console.log('type coerciosn done');
} else {
    console.log('type coerciosn not done');
}

/*****************************
* CODING CHALLENGE 2
*/

/*
John and Mike both play basketball in different teams. In the latest 3 games, John's team scored 89, 120 and 103 points, while Mike's team scored 116, 94 and 123 points.

1. Calculate the average score for each team
2. Decide which teams wins in average (highest average score), and print the winner to the console. Also include the average score in the output.
3. Then change the scores to show different winners. Don't forget to take into account there might be a draw (the same average score)

4. EXTRA: Mary also plays basketball, and her team scored 97, 134 and 105 points. Like before, log the average winner to the console. HINT: you will need the && operator to take the decision. If you can't solve this one, just watch the solution, it's no problem :)
5. Like before, change the scores to generate different winners, keeping in mind there might be draws.

GOOD LUCK ðŸ˜€
*/

var johnScore1,johnScore2,johnScore3;
var mikeScore1,mikeScore2,mikeScore3;
var maryScore1,maryScore2,maryScore3;

johnScore1 = 89;
johnScore2 = 139;
johnScore3 = 103;

mikeScore1 = 116;
mikeScore2 = 91;
mikeScore3 = 123;

maryScore1 = 97;
maryScore2 = 134;
maryScore3 = 105;

var johnTeamAvg, mikeTeamAvg, maryTeamAvg;

johnTeamAvg = (johnScore1 + johnScore2 + johnScore3) / 3;
mikeTeamAvg = (mikeScore1 + mikeScore2 + mikeScore3) / 3;
maryTeamAvg = (maryScore1 + maryScore2 + maryScore3) / 3;

console.log(johnTeamAvg, mikeTeamAvg, maryTeamAvg);

if ((johnTeamAvg > mikeTeamAvg) && (johnTeamAvg > maryTeamAvg)){
    console.log('John team won');
} else if ((mikeTeamAvg > johnTeamAvg) && (mikeTeamAvg > maryTeamAvg)) {
    console.log('Mike team won');
} else if ((maryTeamAvg > johnTeamAvg) && (maryTeamAvg > mikeTeamAvg)) {
    console.log('Mary team won');
} else {
    console.log('The matches has been draw');
}

/*
* Functions
*/
function calcAge(birthYear) {
    return 2018 - birthYear;
}
var ageJohn = calcAge(1989);
var ageMark = calcAge(1992);
var ageMary = calcAge(1998);
console.log(ageJohn, ageMark, ageMary);

function yearsUntilRetirement(birthYear, firstName) {
    var age = calcAge(birthYear);
    var retirement = 65 - age;
    if (retirement > 0) {
        console.log(firstName + ' will retire in ' + retirement + ' years');
    } else {
        console.log(firstName + ' already retired');
    }
}

yearsUntilRetirement(1989, 'John');
yearsUntilRetirement(1986, 'Mark');
yearsUntilRetirement(1946, 'Mary');


/*
* Arrays.
*/
var names = ['John', 'Jane', 'Mark'];
var years = new Array(1990, 1969, 1948);

console.log(names[0]); // first element.
console.log(names.length); // get the size.

names[1] = 'Ben';
console.log(names);
console.log(names[5]); // gets undefined

names.push('Criag');
console.log(names);

// with different data-types
var john = ['John', 'Schimdt', 28, false];
console.log(john);
console.log(john.pop()); // gets last element.

console.log(john.indexOf(28)); // returns 2


/*****************************
* CODING CHALLENGE 3
*/

/*
John and his family went on a holiday and went to 3 different restaurants. The bills were $124, $48 and $268.

To tip the waiter a fair amount, John created a simple tip calculator (as a function). He likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200, and 10% if the bill is more than $200.

In the end, John would like to have 2 arrays:
1) Containing all three tips (one for each bill)
2) Containing all three final paid amounts (bill + tip).

(NOTE: To calculate 20% of a value, simply multiply it with 20/100 = 0.2)

GOOD LUCK ðŸ˜€
*/

var bills = [124, 48, 268];

var tripCalc = function(bill) {
    if (bill < 50) {
        return bill * 0.2;
    } else if (bill >=50 && bill <= 200) {
        return bill * 0.5;
    } else {
        return bill * 0.1;
    }
}

var tips = new Array();
tips.push(tripCalc(bills[0]));
tips.push(tripCalc(bills[1]));
tips.push(tripCalc(bills[2]));

var totalBill = new Array();
totalBill.push(tips[0] + bills[0]);
totalBill.push(tips[1] + bills[1]);
totalBill.push(tips[2] + bills[2]);

console.log(bills);
console.log(tips);
console.log(totalBill);

/*
* Objects and properties
*/

// object literal
var person = {
    firstName: 'John',
    lastName: 'Schimt',
    age: 28,
    family: ['Jane', 'Ben', 'Mark'],
    isMarried: false,
    job: 'Teacher'
};

console.log(person);

console.log(person.firstName); // John
var x = 'job';
console.log(person[x]); // Teacher

var emp = new Object(); // create through Constructor
emp.firstName = 'Jane';
emp.id = 100;
console.log(emp);

/*
* Objects and methods
*/

var john = {
    firstName: 'John',
    lastName: 'Schimt',
    birthYear: 1989,
    family: ['Jane', 'Ben', 'Mark'],
    isMarried: false,
    job: 'Teacher',
    calcAge: function() {
        this.age =  2018 - this.birthYear;
    }
}

john.calcAge();
console.log(john);


/*****************************
* CODING CHALLENGE 4
*/

/*
Let's remember the first coding challenge where Mark and John compared their BMIs. Let's now implement the same functionality with objects and methods.
1. For each of them, create an object with properties for their full name, mass, and height
2. Then, add a method to each object to calculate the BMI. Save the BMI to the object and also return it from the method.
3. In the end, log to the console who has the highest BMI, together with the full name and the respective BMI. Don't forget they might have the same BMI.

Remember: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).

GOOD LUCK ðŸ˜€
*/

var mark = {
    fullName: "Mark Jane",
    mass: 84.5,
    height: 1.65,
    calcBmi: function() {
        this.bmi = (this.mass / (this.height * this.height));
        return this.bmi;
    }
};

var john = {
    fullName: 'John schmidt',
    mass: 64.5,
    height: 1.65,
    calcBmi: function() {
        this.bmi = (this.mass / (this.height * this.height));
        return this.bmi;
    }
};


if (john.calcBmi() > mark.calcBmi()) {
    console.log(john.fullName + ' has highest bmi : ' + john.bmi);
} else if (mark.bmi > john.bmi) {
    console.log(mark.fullName + ' has highest bmi : ' + mark.bmi);
} else {
    console.log(john.fullName + ' and ' + mark.fullName + ' has same bmi : ' + john.bmi);
}


/*
* Loops and iteraation.
*/

 for(i=0; i< 10; i++) {
     console.log(i);
 }

var arr = ['john', 'mark', 32, 'desiner', false];

for (var i=0; i< arr.length; i++) {
    if (typeof arr[i] !== 'string') continue;
    console.log(arr[i]);
}

for (var i=arr.length-1; i>=0; i--) {
    console.log(arr[i]);
}


/*****************************
* CODING CHALLENGE 5
*/

/*
Remember the tip calculator challenge? Let's create a more advanced version using everything we learned!

This time, John and his family went to 5 different restaurants. The bills were $124, $48, $268, $180 and $42.
John likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200, and 10% if the bill is more than $200.

Implement a tip calculator using objects and loops:
1. Create an object with an array for the bill values
2. Add a method to calculate the tip
3. This method should include a loop to iterate over all the paid bills and do the tip calculations
4. As an output, create 1) a new array containing all tips, and 2) an array containing final paid amounts (bill + tip). HINT: Start with two empty arrays [] as properties and then fill them up in the loop.


EXTRA AFTER FINISHING: Mark's family also went on a holiday, going to 4 different restaurants. The bills were $77, $375, $110, and $45.
Mark likes to tip 20% of the bill when the bill is less than $100, 10% when the bill is between $100 and $300, and 25% if the bill is more than $300 (different than John).

5. Implement the same functionality as before, this time using Mark's tipping rules
6. Create a function (not a method) to calculate the average of a given array of tips. HINT: Loop over the array, and in each iteration store the current sum in a variable (starting from 0). After you have the sum of the array, divide it by the number of elements in it (that's how you calculate the average)
7. Calculate the average tip for each family
8. Log to the console which family paid the highest tips on average

GOOD LUCK ðŸ˜€
*/

var john = {
    bills: [124, 48, 268, 180, 42],
    tipCalc: function() {
        var tips = [];
        var totalBills = [];
        for (var i=0; i<this.bills.length; i++) {
            var bill = this.bills[i];
            var tip;
            if (bill < 50) {
                tip = bill * 0.2;
            } else if (bill >= 50 && bill < 200) {
                tip = bill * 0.15;
            } else {
                tip = bill * 0.1;
            }
            tips[i] = tip;
            totalBills[i] = bill + tip;
        }
        this.tips = tips;
        this.totalBills = totalBills;
    }
};

john.tipCalc();
console.log(john.bills);
console.log(john.tips);
console.log(john.totalBills);

var mark = {
    bills: [77, 375, 110, 45],
    tipCalc: function() {
        var tips = [];
        var totalBills = [];
        for (var i=0; i<this.bills.length; i++) {
            var bill = this.bills[i];
            var tip;
            if (bill < 100) {
                tip = bill * 0.2;
            } else if (bill >= 100 && bill <= 300) {
                tip = bill * 0.1;
            } else {
                tip = bill * 0.25;
            }
            tips[i] = tip;
            totalBills[i] = bill + tip;
        }
        this.tips = tips;
        this.totalBills = totalBills;
    }
};


mark.tipCalc();
console.log(mark.bills);
console.log(mark.tips);
console.log(mark.totalBills);

function calcAvgTip(tips) {
    var sum = 0;
    for (var i=0; i<tips.length; i++) {
        sum += tips[i];    
    }
    return sum / tips.length;
}

johnAvgTip = calcAvgTip(john.tips);
markAvgTip = calcAvgTip(mark.tips);

if (johnAvgTip > markAvgTip) {
    console.log('John made more tips ' + johnAvgTip);
} else if (johnAvgTip < markAvgTip) {
    console.log('Mark made more tips ' + markAvgTip);
} else {
    console.log('John and mark made eqaul tips ' + johnAvgTip);
}