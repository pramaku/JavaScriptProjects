
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
    constructor (name, buildYear, length, type='normal') {
        super(name, buildYear);
        this.length = length;
        this.type = type;
    }
}

const numParks = 3;
const numStreets = 4;

let parks = new Array();
parks.push(new Park('Green Park', 1970, 100, 120));
parks.push(new Park('National Park', 1980, 200, 130));
parks.push(new Park('Oak Park', 1990, 3000, 140));

const parkAvgAge = function () {
    let avgAge;
    let sumAge = 0;
    parks.forEach(cur => sumAge += cur.calcAge())
    return sumAge / numParks;
};

let streets = new Array();
streets.push(new Street('Ocean Avenue', 1999, 2, 'big'));
streets.push(new Street('Evergreen Street', 2008, 0.6,'small'));
streets.push(new Street('4th Street',2015, 1));
streets.push(new Street('Sunset Boulevard', 1982, 4.4, 'huge'));

function parksReport() {
    console.log('---------PARKS REPORT-----------');
    console.log(`Our ${numParks} parks have an average age of ${parkAvgAge()} years`);
    parks.forEach(cur => console.log(`${cur.name} has a tree density of ${cur.calcDensity()} trees per square km`));
    for (const cur of parks) {
        if (cur.trees > 1000) {
            console.log(`${cur.name} has more than 1000 tress`);
        }
    }
}

function totalStreetLength() {
    let sum = 0;
    streets.forEach(cur => sum += cur.length);
    return sum;
}

function avgStreetLength() {
    return totalStreetLength() / numStreets;
}

function streetsReport() {
    console.log('---------STREETS REPORT-----------');
    console.log(`Out ${numStreets} streets have a total length of ${totalStreetLength()} km, with an average of ${avgStreetLength()} km`);
    streets.forEach(cur => console.log(`${cur.name}, built in ${cur.buildYear}, is a ${cur.type} street`));
}

parksReport();
streetsReport()
