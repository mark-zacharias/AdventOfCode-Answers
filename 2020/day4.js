var fs = require('fs');
var rl = require('readline');

var fileName = 'C:\\dev\\aoc\\2020\\day4.input';

console.log('hello');

var getItems = () => {  
    var contents = fs.readFileSync(fileName).toString();
    //console.log(contents.toString());

    var arr = contents.split('\n')
    //console.log(arr);
    var passports = [];
    var passport = '';
    arr.forEach(line => {
        
        if(line == '\r'){ //just an empty new line push what we have into the array
            passports.push(passport);
            passport = '';
        }
        else {
            passport += line.trimEnd('\r') + ' ';
        }
    });
    //capture the last one
    passports.push(passport);
    passport = '';
    return passports;
}

var parseObject = str => {
    var passport = {};
    str.split(' ').forEach(prop => {
        var t = prop.split(':');
        passport[t[0]] = t[1];
    });

    return passport;
}

validate = passport => {
    var valid = true;
    var requiredKeys = ['ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt'];
    requiredKeys.forEach(key => {
        if(!passport.hasOwnProperty(key)) {
            valid = false;
            return;
        }
    });

    return valid;
}

var items = getItems();
passports = items.map(parseObject);
var countValid = passports.reduce((count, passport) => {
    if(validate(passport)) count ++;

    return count;
}, 0);

console.log(countValid);