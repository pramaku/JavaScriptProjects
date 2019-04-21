/***********************
// Let and const
***********************/
/*
var name5 = 'John';
var age5 = 25;
name5 = 'John Miller';

console.log(name5);
console.log(age5);

// ES6
const name6 = 'Jane Smith';
let age6 = 35;
//name6 = 'Jane Miller'; // error const cannot be modified

console.log(name6);
console.log(age6);
*/

/*
// ES5
var drivingLicense5 = function(passed) {

    console.log(firstName); // prints undefined, (hoisting)
    if (passed) {
        var firstName = 'John';
        var yearOfBirth = 1989;
        console.log(firstName + ' who was born in ' +
                    yearOfBirth + ' passed the test');
    }

    // var has function scope, so below is OK.
    console.log(firstName + ' who was born in ' +
            yearOfBirth + ' passed the test');
};

drivingLicense5(true);

// ES6
var drivingLicense6 = function(passed) {
    //console.log(firstName); // error, hosting dont work for let, const
    if (passed) {
        let firstName = 'John';
        const yearOfBirth = 1989;
        console.log(firstName + ' who was born in ' +
                    yearOfBirth + ' passed the test');

        let print = function() {
            // Ok. because of block scope the variables are accesible.
            console.log(firstName + ' who was born in ' +
                    yearOfBirth + ' passed the test');
        }
        return print;
    }

    // let has block scope, so below is not OK.
    // console.log(firstName + ' who was born in ' +
    //        yearOfBirth + ' passed the test');
};

drivingLicense6(true);
drivingLicense6(true)(); // using closure of the block variable.
*/


/********************************
// Blocks and IIFE's
********************************/
/*
{
    const a = 1;
    let b = 2;
    console.log(a + b);
    var c = 3;
}

//console.log(a); // error, block scope
//console.log(b); // error, block scope
console.log(c); //OK, var creates function scope

// block scope in ES5 (IIFE)

(function() {
    var c = 10;
})();

//console.log(c); // error, block scope

*/
/*********************************
// Strings in ES6
**********************************/
/*
let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1995;

function calcAge(year) {
    return 2016 - year;
}

// ES5
console.log('My name is ' + firstName + ' ' + lastName + ', He was born ' + yearOfBirth + ', By today he is ' + calcAge(yearOfBirth) + ' years old');

// ES6 (template literals)
console.log(`This is ${firstName} ${lastName}, By today he is ${calcAge(yearOfBirth)} years old`);

const n = `${firstName} ${lastName}`;

console.log(n.startsWith('J')); // true
console.log(n.endsWith('h')); // true
console.log(n.startsWith('j')); // false
console.log(n.includes(' ')); // true
console.log(n.includes('1989')); // false

console.log('John'.repeat(5)); // JohnJohnJohnJohnJohn
console.log(`${firstName} `.repeat(5));
*/
/***********************************
// Arrow functions
************************************/

/*
const years = [1990, 1982, 1976, 1985, 2000];

// ES5
var ages5 = years.map(function(current) {
   return 2018 - current;
});

console.log(ages5);

// ES6
const ages6 = years.map(el => 2018 - el); // one arg
console.log(ages6);

// two arg and one line (return is implicit)
const ages6_1 = years.map((e1, index) => `Age element ${2016 - e1} is ${index}`);
console.log(ages6_1);

// two arg and more than one line, return needs to be mentioned
const ages6_2 = years.map((el, index) => {
    const now = new Date().getFullYear();
    return `Age element ${now - el} is ${index}`;
});
console.log(ages6_2);
*/

/*****************************
// Arrow functions with 'this'
*****************************/
/*
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        var self = this;
        document.querySelector('.green').addEventListener('click', function() {
            var str = 'This is box number ' + self.position + ' and I am ' + self.color + ' in color';
            alert(str);
        });
    }
};

//box5.clickMe();

// ES6

const box6 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        // When using arrow function, adjacent 'this' is accesible.
        document.querySelector('.green').addEventListener('click', () => {
            const str = `This is box number ${this.position} and I am ${this.color} in color`;
            alert(str);
        });
    }
};

box6.clickMe();
*/

// ES5
function Person(firstName) {
    this.firstName = firstName;
}
/*
Person.prototype.friends5 = function(friends) {
    var arr = friends.map(function(current) {
       return current + ' is friend of ' + this.firstName;
    }.bind(this));

    console.log(arr);
}

var p1 = new Person('John');
p1.friends5(['Bob', 'Jane']);

// ES6
Person.prototype.friends6 = function(friends) {
    const arr = friends.map(current => `${current} is friend of ${this.firstName}`);

    console.log(arr);
}

const p2 = new Person('John');
p2.friends6(['Bob', 'Jane']);

*/

/*****************************
// destructuring
*****************************/
/*
// ES5
var arr = ['John', 26];
var name5 = arr[0];
var age5 = arr[1];

// ES6
const [name6, age6] = ['John', 26];
console.log(name6);
console.log(age6);

const {firstName, age6_1} = {
    firstName: 'John',
    age6_1: 26
};

console.log(firstName);
console.log(age6_1);

// to customize variable names
const {firstName: a, age6_1: b} = {
    firstName: 'John',
    age6_1: 26
};

console.log(a);
console.log(b);


var calcAgeANdRetirement = function(year) {
    var age = new Date().getFullYear() - year;
    return [age, 65 - age];
};

const [r1, r2] = calcAgeANdRetirement(1986);

console.log(r1);
console.log(r2);

*/

/******************************
// Arrays in ES6
******************************/

// ES5

var boxes = document.querySelectorAll('.box');

/*
var boxesArr5 = Array.prototype.slice.call(boxes);

boxesArr5.forEach(function(current) {
    current.style.backgroundColor = 'dodgerblue';
});
*/

// ES6
/*
const boxArr6 = Array.from(boxes);
boxArr6.forEach(cur => cur.style.backgroundColor = 'dodgerblue');
*/

// ES5
/*
for (var i=0; i<boxesArr5.length; i++) {
    if (boxesArr5[i].className === 'box blue') {
        continue;
    } else {
        boxesArr5[i].textContent = "I'm blue";
    }
}
*/

/*
// ES6
// new for of loop
for (const cur of boxArr6) {
    if (cur.className.includes('blue')) {
        continue;
    } else {
        cur.textContent = "I'am blue";
    }
}

// ES5
var ages = [12, 17, 8, 21, 14, 11];
var full = ages.map(function(current) {
   return current > 18;
});

console.log(ages[full.indexOf(true)]);


//ES6
console.log(ages.findIndex(cur => cur > 18));
console.log(ages.find(cur => cur > 18));
*/


/***********************************
// speard operator
***********************************/
/*
var addFourAges = function(a, b, c, d) {
    return a + b + c + d;
}

var sum1 = addFourAges(10, 20, 30, 40);
console.log(sum1);

var ages = [10, 20, 30, 40];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

var sum3 = addFourAges(...ages);
console.log(sum3);
*/


/**********************************
// REST Parameters
**********************************/
//ES5
/*
function isFullAges5(limit) {
    console.log(arguments);
    argArr = Array.prototype.slice.call(arguments, 1);
    console.log(argArr);
    argArr.forEach(function(current) {
        console.log((new Date().getFullYear() - current) >= limit);
    });
}

isFullAges5(21, 1998, 1989, 1965, 2013, 2002);

// ES6
function isFullAges6(limit, ...years) {
    console.log(years);
    years.forEach(cur => console.log((new Date().getFullYear() - cur) >= limit));
}

isFullAges6(16, 1998, 1989, 1965, 2013, 2002);
*/
/*****************************************
// Default Parameters
*****************************************/
/*
// ES5 (default params not supported, compare with undefined)
var SmithPerson5 = function (firstName, yearOfBirth, lastName, nationality) {
    this.firstName = firstName;
    if (lastName === undefined) {
        this.lastName = 'Smith';
    }

    this.yearOfBirth = yearOfBirth;
    if (nationality === undefined) {
        this.nationality = 'american';
    }
}

var john = new SmithPerson5('John', 1980);

// ES6
const SmithPerson6 = function (firstName, yearOfBirth, lastName='Smith', nationality='american') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.yearOfBirth = yearOfBirth;
    this.nationality = nationality;
}

var john = new SmithPerson6('John', 1980, 'Schmidt');
var emily = new SmithPerson6('Emily', 1996);
console.log(emily);
*/

/******************************************
// ES6 Maps
******************************************/
/*
const question = new Map();
question.set('question', 'What is the name of latest majot JS version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct answer');
question.set(false, 'Wrong answer, please try again');


console.log(question.get('question'));

for (const [k, v] of question.entries()) {
    if (typeof(k) === 'number') {
        console.log(k + ') ' + v);
    }
}

const answer = prompt('Write your answer : ');
console.log(question.get(question.get('correct') === parseInt(answer)));
*/

/*******************************************
// ES6 Classes
*******************************************/
/*
// ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

Person5.prototype.caluculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
};

var john5 = new Person5('John', 1985, 'Teacher');

//ES6
class Person6 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    caluculateAge () {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }

    static greeting() {
        console.log('Stativ method');
    }
}

const john6 = new Person6('John', 1985, 'Teacher');

Person6.greeting();
*/

/************************************************
// Inheritance with Sub classes
************************************************/
/*
// ES5
var Person5 = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

Person5.prototype.caluculateAge = function() {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
};


var Athlete5 = function(name, yearOfBirth, job, olympics, medals) {
    Person5.call(this, name, yearOfBirth, job);
    this.olympics = olympics;
    this.medals = medals;
};

// attach the prototype.
Athlete5.prototype = Object.create(Person5.prototype);

Athlete5.prototype.wonMedal = function() {
    this.medals++;
    console.log(this.medals);
}

var johnAthelete5 = new Athlete5('John', 1990, 'Swimmer', 3, 10);


//ES6
class Person6 {
    constructor (name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    caluculateAge () {
        var age = new Date().getFullYear() - this.yearOfBirth;
        console.log(age);
    }
}

class Athlete6 extends Person6 {
    constructor (name, yearOfBirth, job, olympics, medals) {
        super(name, yearOfBirth, job);
        this.olympics = olympics;
        this.medals = medals;
    }

    wonMedal () {
        this.medals++;
        console.log(this.medals);
    }
}

var johnAthelete6 = new Athlete6('John', 1990, 'Swimmer', 3, 10);
*/
