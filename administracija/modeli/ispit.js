module.exports = function(mongoose) {
	var ObjectId = mongoose.Schema.Types.ObjectId,
		Mixed = mongoose.Schema.Types.Mixed;

	var IspitSchema = new mongoose.Schema({
		_id: String,
		naziv: {
			type: String,
			required: true
		},
		godina: String,
		prijavaOd: {
			type: Date,
			index: true
		},
		prijavaDo: {
			type: Date,
			index: true
		},
		brojTermina: {
			type: Number,
			default: 1
		},
		ispitniOd: Date,
		ispitniDo: Date,
		termini: {},
		prijave: {},
		//Rok da li je obrisan ili ne
		aktivan: {
			type: String,
			default: 'da',
			index: true
		},
		//vrijednost da je prijava ispita u toku
		prijava: {
			type: String,
			default: 'da'
		}

	});


	return {
		Ispit: mongoose.model('Ispit', IspitSchema, 'ispiti')
	}
};