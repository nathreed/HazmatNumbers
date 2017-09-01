var fs = require("fs");

//Used for de-capping the capped names of substances
//Borrowed from https://stackoverflow.com/a/5574446
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

//full_data.txt is the extracted/edited text of the UNECE PDF (see README.md)
var rawFileData = fs.readFileSync("./full_data.txt").toString()
var rawFileLines = rawFileData.split("\n")

var finalOutput = []

for(var i=0; i<rawFileLines.length; i++) {
	var line = rawFileLines[i]

	var firstFour = line.substring(0,4)
	//If the first 4 match an integer, the integer isn't 0, and there are 4 digits in that integer (including 0s), then it's a valid UN number
	if(firstFour.match(/^\d+$/) && line != "0" && firstFour.replace(/\D/g, '').length == 4) {
		//console.log("Line", i+1, "is a valid UN number", line)
		//It is a 4 digit number, we have a UN number line
		//Find the index of the last line of the description so we can put it all together.
		var firstLineIndex = i
		var lastLineIndex = findLastDescLine(i, rawFileLines)

		var completeInfo = ""
		//Get all the lines in question concatenated into j
		for(var j=firstLineIndex; j<=lastLineIndex; j++) {
			completeInfo = completeInfo.concat(rawFileLines[j] + " ")
		}

		//Now that we have the complete info, do some further processing
		var substanceNumber = completeInfo.substring(0,4)
		var substanceName = findSubstanceName(completeInfo)
		var substanceDesc = substanceDescription(completeInfo)

		var substanceObj = {
			number: substanceNumber,
			name: substanceName,
			description: substanceDesc
		}

		finalOutput.push(substanceObj)

	}

	

}

console.log(JSON.stringify(finalOutput, null, 4)) //Spread out for ease of reading/manual editing if necessary.

//Finds the last line of the given UN number description given the starting line
function findLastDescLine(startingLineIndex, rawFileLines) {
	//First, isolate the entire description
	var lastLineIndex = startingLineIndex + 1; //We start out with the next line down
	while(true) {
		if(lastLineIndex >= rawFileLines.length) {
			break; //We are done, kill the loop
		}

		var nextLine = rawFileLines[lastLineIndex]
		if(nextLine == "") {
			//The next line is a newline all by itself, so we know we are done with finding the description
			//Kill the loop, lastLineIndex will remain how it is
			break;
		} else {
			lastLineIndex += 1 //Check the next line on the next iteration
		}
	}
	return lastLineIndex
}

//Extract the substance name from the complete list of information about the substance
function findSubstanceName(line) {
	var spaceSplit = line.split(" ");
	var capped = ""

	for(var i=0; i<spaceSplit.length; i++) {
		var segment = spaceSplit[i]
		if(segment.toUpperCase() == segment) {
			capped = capped.concat(segment + " ")
		} else {
			break; //Once we hit something that isn't a number or an uppercase, kill the loop so it doesn't get any other numbers later in description
		}
	}

	capped = capped.replace(capped.slice(0,4), "").trim().toProperCase()
	return capped
}

//Extract the description/additional information about the substance from the complete line of info about the substance
function substanceDescription(substanceInfo) {
	//Pretty much the exact opposite of findSubstanceName - returns the part starting with the first part that isn't capitalized
	var spaceSplit = substanceInfo.split(" ");
	var output = substanceInfo

	for(var i=0; i<spaceSplit.length; i++) {
		var segment = spaceSplit[i]

		if(segment.toUpperCase() == segment) {
			output = output.replace(segment, "") //Remove it from the substance info
		} else {
			break; //Once we get the inital bit out, we can return the rest
		}
	}

	output = output.replace("†", "")
	return output.trim()
}