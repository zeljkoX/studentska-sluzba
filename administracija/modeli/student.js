module.exports = function(mongoose) {

	var ObjectId = mongoose.Schema.Types.ObjectId,
		Mixed = mongoose.Schema.Types.Mixed;


	var Semestar = new mongoose.Schema({
		id: ObjectId,
		redniBroj: Number,
		predmeti: [Mixed] //Koristiti PredmetMini dokument
	});

	var StudentSchema = new mongoose.Schema({
		id: {
			type: ObjectId,
			index: true
		},
		index: {
			type: String,
			unique: true
		},
		password: {
			type: String
		},

		fakultet: {
			naziv: {
				type: String
			},
			smjer: {
				type: String
			},
			godinaStudija: {
				type: Number,
				min: 1,
				max: 5
			},
			aktivanSemestar: {
				type: Number
			}
		},
		licniPodaci: {
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
				type: String
			},
			godina: {
				type: Date
			}
		},
		kontaktInformacije: {
			brTel: {
				type: String
			},
			email: {
				type: String,
				unique: true
			},
			adresa: {
				type: String
			}
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
			},
			popust: {
				type: String
			}
		}
	});

	return {
		Student: mongoose.model('Student', StudentSchema, 'studenti'),
		Semestar: mongoose.model('Semestar', Semestar)
	}
};