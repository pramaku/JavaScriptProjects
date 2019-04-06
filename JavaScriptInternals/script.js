////////////////////////////////////////////////
// Hoisting...

// functions
caluculateAge(1990);
function caluculateAge(year) {
    console.log(2018 - year);
}

// retirement(1965); // error due to hoisting dont work on function // expresions.
var retirement = function(year) {
    console.log(65 - (2016 - year));
}

retirement(1965);

// variables
console.log(age); // udefined due to hoisting
var age = 23;
console.log(age); // 23

// with function execution context.
function foo() {
    console.log(age); //undefined due to hoisting in foo execution context
    var age = 65;
    console.log(age); // 65
}

foo();
console.log(age);

// scope chain
var a = 'hello ! ';
first();

function first() {
    var b = 'Hi! ';
    second();
    function second() {
        var c = 'How are you !!';
        console.log(a + b + c);
        third();
    }
}

function third() {
    var d = 'I am fine !!';
    console.log(a + d); // can access only a and d
    // console.log(a + b + c + d); // error: b,c not accesible.
}

// this keyword...
console.log(this); // global context, this.

function calcAge(year) {
    console.log(2016 - year);
    console.log(this); // global context, this ( as function is global)
}

calcAge(1985);

var john = {
    name: 'john',
    yob: 1990,
    calcAge: function() {
        console.log(2018 - this.yob);
        console.log(this); // this will be 'john' object.
        
        var innnerFunc = function() {
            // below will be global context this,
            // not the 'john' object, as innerFunc is not part of john.
            console.log(this);
        };
        innnerFunc();
        
    }
};

john.calcAge();

var mike = {
    name: 'Mike',
    yob: 1996
};

mike.calcAge = john.calcAge;

mike.calcAge();
