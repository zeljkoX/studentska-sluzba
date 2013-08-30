module.exports = function(mongoose) {

	var ObjectId = mongoose.Schema.Types.ObjectId,
		Mixed = mongoose.Schema.Types.Mixed;

	var PredmetMiniSchema = new mongoose.Schema({
		id: ObjectId,
		ime: String
	});

	var PredmetSchema = new mongoose.Schema({
		_id: {
			type: ObjectId,
			index: true
		},
		naziv: {
			type: String,
			unique: true,
			index: true
		},
		aktivan: {
			type: String,
			default: 'da'
		},
		sifra: {
			type: String,
			unique: true,
			index: true
		},
		status: {
			type: String
		}, //izborni obavezni
		bodovi: {
			type: Number
		},
		profesor: {
			type: String
		},
		asistent: {
			type: String
		},
		fakultet: {
			_id: String,
			naziv: {
				type: String
			},
			studijskiProgram: String //ObjectId referenca na fakultet
		},
		opis: {
			type: String
		},
		casovi: {
			predavanja: {
				type: Number
			},
			vjezbe: {
				type: Number
			}
		}



	});

	return {
		Predmet: mongoose.model('Predmet', PredmetSchema, 'predmeti'),
	}
};