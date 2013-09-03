module.exports = function(mongoose) {

	var ObjectId = mongoose.Schema.Types.ObjectId,
		Mixed = mongoose.Schema.Types.Mixed;


	var Semestar = new mongoose.Schema({
		_id: Number,
		predmeti: [Mixed] //Koristiti PredmetMini dokument
	});

	var StudentSchema = new mongoose.Schema({
		_id: {
			type: String,
			index: true
		},
		fakultet: {
			type: String
		},
		studijskiProgram: {
			type: String
		},
		sifra: {
			type: String
		},
		godinaStudija: {
			type: Number,
			min: 1,
			max: 5,
			default: 1
		},
		aktivanSemestar: {
			type: Number,
			default: 0
		},
		status: {
			type: String,
			default: 'redovan'
		},
		aktivan: {
			type: String,
			default: 'da',
			index: true
		},
		godina: {
			type: Number
		},
		ime: {
			type: String
		},
		prezime: {
			type: String
		},
		imeRoditelja: {
			type: String
		},
		jmbg: {
			type: String,
			unique: true
		},
		telefon: {
			type: String
		},
		email: {
			type: String,
		},
		ulica: {
			type: String
		},
		mjesto: {
			type: String
		},
		semestri: [Semestar],
		skolarina: {
			iznos: {
				type: String,
				default: '3000km'
			},
			uplaceno: {
				type: Number,
				default: 0
			}
		}
	});

	return {
		Student: mongoose.model('Student', StudentSchema, 'studenti'),
		Semestar: mongoose.model('Semestar1', Semestar)
	}
};