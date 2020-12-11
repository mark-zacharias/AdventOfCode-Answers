var fs = require('fs');

var fileName = 'C:\\dev\\aoc\\2020\\day10.input';

var getItems = () => {  
    var contents = fs.readFileSync(fileName).toString();

    var items = contents.split('\r\n');
    //capture the last one

    return items;
}

var adapters = getItems();
adapters = adapters.sort((a, b) => a-b);

var onesCount = 1; //need to count the outlet
var twosCount = 0;
var threesCount = 1; //need to count the device
adapters.forEach((adapter, index) => {
    if(index > 0){
        var diff = adapter-adapters[index-1];
        switch (diff) {
            case 1:
                onesCount ++;
                break;
            case 2: 
                twosCount++;
                break;
            case 3:
                threesCount++;
                break;
            default:
                throw 'unexpected';
                break;
        }
    }
});

console.log('ones:', onesCount)
console.log('twos', twosCount);
console.log('threes', threesCount);

console.log('answer', onesCount*threesCount);