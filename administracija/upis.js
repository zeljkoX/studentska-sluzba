module.exports = function() {
	var fs = require('fs');

	function upisi(options) {
		var datoteka = options.datoteka,
			data = options.data,
			lok = __dirname + '/public/json/',
			dir = __dirname + '/public/json/' + datoteka;
		//console.log(dir);

		fs.writeFileSync(dir, data);
		sve(lok);
	};

	function sve(lokacija) {
		var sve = [];
		var datoteke = fs.readdirSync(lokacija);
		//console.log(datoteke);
		datoteke.forEach(function(fajl) {
			if ((fajl != 'sve.json') && (fajl.search(/~/g) == -1)) {
				var temp = fs.readFileSync(lokacija + fajl, "utf8");
				sve = sve.concat(JSON.parse(temp.split(/[\r\n]/)));
			}
			fs.writeFileSync(lokacija + 'sve.json', JSON.stringify(sve));

		});
		//console.log(sve);
	}

	return {
		upisiFajl: upisi
	};
}();