
class Place {
    constructor (name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }

    calcAge () {
        return new Date().getFullYear() - this.buildYear;
    }
}

class Park extends Place {
    constructor (name, buildYear, trees, parkArea) {
        super(name, buildYear);
        this.trees = trees;
        this.parkArea = parkArea;
    }

    calcDensity () {
        return (this.trees / this.parkArea);
    }
}

class Street extends Place {
    constructor (name, buildYear, length, size = 3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }

    classifyStreet() {
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        return classification;
    }
}

const numParks = 3;
const numStreets = 4;

let parks = new Array();
parks.push(new Park('Green Park', 1970, 100, 120));
parks.push(new Park('National Park', 1980, 200, 130));
parks.push(new Park('Oak Park', 1990, 3000, 140));

const calcAvg = function(arr) {
    const sum = arr.reduce((prev, cur, index) => prev + cur, 0);
    return [sum, (sum / arr.length)];
}

let streets = new Array();
streets.push(new Street('Ocean Avenue', 1999, 2, 4));
streets.push(new Street('Evergreen Street', 2008, 0.6,2));
streets.push(new Street('4th Street',2015, 1));
streets.push(new Street('Sunset Boulevard', 1982, 4.4, 5));

function parksReport() {
    console.log('--------- PARKS REPORT -----------');

    // avg age.
    const parkAges = parks.map(cur => cur.calcAge());
    const [sumAges, avgAge] = calcAvg(parkAges);
    console.log(`Our ${numParks} parks have an average age of ${avgAge} years`);

    // density
    parks.forEach(cur => console.log(`${cur.name} has a tree density of ${cur.calcDensity()} trees per square km`));

    const index = parks.map(cur => cur.trees).findIndex(cur => cur > 1000);
    console.log(`${parks[index].name} has more than 1000 tress`);
}

function streetsReport() {
    console.log('---------STREETS REPORT-----------');
    const streetLenArr = streets.map(cur => cur.length);
    const [sum, avgLength] = calcAvg(streetLenArr);
    console.log(`Out ${numStreets} streets have a total length of ${sum} km, with an average of ${avgLength} km`);
    streets.forEach(cur => console.log(`${cur.name}, built in ${cur.buildYear}, is a ${cur.classifyStreet().get(cur.size)} street`));
}

parksReport();
streetsReport()
