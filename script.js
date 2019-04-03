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