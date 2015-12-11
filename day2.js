 var fs = require('fs');
 var rl = require('readline');
 var _ = require('lodash');

var reader = rl.createInterface({input: fs.createReadStream('day2.input')});

var total = 0;
var totalRibbon = 0;
reader.on('line', function(line){
	var dimensions = parseDimensions(line);
	var wrappingArea = calculateAreaPlusExtra(dimensions);
	total += wrappingArea;
	
	totalRibbon += calculateRibbon(dimensions);
});
reader.on('close', function(){
	console.log('total wrapping paper needed: ', total);
	console.log('total ribbon needed: ', totalRibbon);
})

var dimensions = parseDimensions('2x3x4');
var wrappingArea = calculateAreaPlusExtra(dimensions);
console.log(wrappingArea);

function parseDimensions(serialized){
	var arr = serialized.split('x');
	
	return {
		l: parseInt(arr[0]), 
		w: parseInt(arr[1]), 
		h: parseInt(arr[2])
		};
}

function calculateAreaPlusExtra(dimensions){
	var areas = {};
	areas.l = dimensions.l*dimensions.w;
	areas.w = dimensions.w*dimensions.h;
	areas.h = dimensions.h*dimensions.l;
	
	var smallest = _.min(areas);
	
	return 2*areas.l + 2*areas.w + 2*areas.h + smallest;
}

function calculateRibbon(dimensions){
	var sortedDimensions = _.sortBy(dimensions);
	
	var perimeter = sortedDimensions[0]+sortedDimensions[0]+sortedDimensions[1]+sortedDimensions[1];
	var cubic = dimensions.l*dimensions.w*dimensions.h;
	
	return perimeter+cubic;	
}