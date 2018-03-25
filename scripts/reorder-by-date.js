// Reorder a file by running (from the scripts folder)
// node ./reorder-by-data {name-of-file-withouth.json} {year (optional)}

// Requires
const fs = require("fs");

//Get the name of the file to reorder.  By default, it will use the current year
const arguments = process.argv;
let nameOfFile = arguments[2];
if (nameOfFile.substr(-5) !== ".json") nameOfFile += ".json";

const year = arguments[3] ? arguments[3] : (new Date()).getFullYear();

const fileName = `../conferences/${year}/${nameOfFile}`;

fs.readFile(fileName, (err, data) => {
	data = JSON.parse(data);
	data.sort((a,b) => {
		let startA = new Date(a.startDate).getTime();
		let startB = new Date(b.startDate).getTime();
		if (startA > startB) return 1;
		if (startA < startB) return -1;
		return 0;
	});

	fs.writeFile(fileName, JSON.stringify(data, null, 2), () => {
		console.log(`File ${fileName} was successfully reordered`);
	});
});