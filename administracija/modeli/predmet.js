module.exports = function(mongoose) {

	var ObjectId = mongoose.Schema.Types.ObjectId,
		Mixed = mongoose.Schema.Types.Mixed;

	var PredmetMiniSchema = new mongoose.Schema({
		id: ObjectId,
		ime: String
	});

	var PredmetSchema = new mongoose.Schema({
		id: {
			type: ObjectId,
			index: true
		},
		naziv: {
			type: String,
			unique: true,
			index: true
		},
		sifra: {
			type: String,
			unique: true
		},
		status: {
			type: String
		}, //izborni obavezni
		bodovi: {
			type: Number
		},
		kadar: {
			profesor: {
				id: ObjectId,
				ime: {
					type: String
				}
			},
			asistent: {
				id: ObjectId,
				ime: {
					type: String
				}
			}
		},
		fakultet: {
			id: ObjectId,
			naziv: {
				type: String
			},
			studijskiProgram: [Mixed] //ObjectId referenca na fakultet
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