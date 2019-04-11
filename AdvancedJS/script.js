// Function constructor
/*
var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

// inheritance,
Person.prototype.caluculateAge = function() {
    console.log(2018 - this.yearOfBirth);
}

var john = new Person('john', 1998, 'Teacher');
var mark = new Person('mark', 1980, 'Designer');

john.caluculateAge();
mark.caluculateAge(); 
*/

// Object.create
var personProto = {
    caluculateAge: function() {
        console.log(2016 - this.yob);
    }
}

var john = Object.create(personProto);
john.name = 'john';
john.yob = 1990;
john.job = 'teacher';

console.log(john);
john.caluculateAge();

var jane = Object.create(personProto, {
    name: {value: 'Jane'},
    yob: {value: 1990},
    job: {value: 'Designer'}
});

console.log(jane);
jane.caluculateAge();


// primitives vs objects
var a = 23;
var b = a;
a = 43;

console.log(a);
console.log(b);

var obj1 = {
    name: 'john',
    age: 23
};

var obj2 = obj1; // object refernce are copied.
obj2.age = 24;
console.log(obj1.age);
console.log(obj2.age);

// With functions.
var a = 30;
var obj = {
    name: 'Jonas',
    city: 'Lisbon'
};

function change(x, y) {
    x = 40;
    y.city = 'New York';
}

change(a, obj);
console.log(a);
console.log(obj);


/*
* Passing function as arguments
*/

var years = [1965, 1987, 1990, 1976, 2013];

function arrayCalc(arr, fn) {
    var result = [];
    for (var i=0; i<arr.length; i++) {
        result.push(fn(arr[i]));
    }
    return result;
}

var calcAge = function(year) {
    return 2018 - year;
}
var ages = arrayCalc(years, calcAge);
console.log(ages);

var fullAgeCalc = function(age) {
    return age >= 18;
}
var fullAges = arrayCalc(ages, fullAgeCalc);
console.log(fullAges);

var maxHeartRate = function(age) {
    if (age >=18 && age <=81) {
        return Math.round(206.9 - (0.67 * age));
    } else {
        return -1;
    }
}
var maxHrtRates = arrayCalc(ages, maxHeartRate);
console.log(maxHrtRates);

/***************************************
// Functions returning functions
****************************************/

function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ' what you know about UX design ?');
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log(name + ' what subjects can you teach ?');
        }
    } else {
        return function(name) {
            console.log(name + ' what job do you want to apply for?');
        }
    }
}

var teacherQuestion = interviewQuestion('teacher');
teacherQuestion('Jane');

var designerQuestion = interviewQuestion('designer');
designerQuestion('John');

var unknownJobQuestion = interviewQuestion('developer');
unknownJobQuestion('Mark');

/*
// Immediately Invoked Function expression. (IIFE)
*/

(function() {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();

//console.log(score); // error, cannot access score.

// with arguments

(function(goodLuck) {
    var score = Math.random() * 10;
    console.log(score >= (5 - goodLuck));
})(4);

/*******************************
// closures
********************************/

function retirement(retirementAge, ) {
    var msg = ' years until retirement';
    return function(yearOfBirth) {
        var age = 2018 - yearOfBirth;
        console.log((retirementAge - age) + msg);
    }
}

var usRetirement = retirement(66);
var ukRetirement = retirement(65);
var indiaRetirement = retirement(55);

usRetirement(1985);
ukRetirement(1985);
indiaRetirement(1985);

function interviewQuestion(job) {
    var question;
    if (job === 'designer') {
        question = ' what you know about UX design ?';
    } else if (job === 'teacher') {
        question = ' what subjects can you teach ?';
    } else {
        question = ' what job do you want to apply for?';
    }

    return function(name) {
        console.log(name + question);
    }
}

var teacherQuestion = interviewQuestion('teacher');
teacherQuestion('Jane');

var designerQuestion = interviewQuestion('designer');
designerQuestion('John');

var unknownJobQuestion = interviewQuestion('developer');
unknownJobQuestion('Mark');