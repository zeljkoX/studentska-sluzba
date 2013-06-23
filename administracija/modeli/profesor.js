module.exports = function(mongoose) {

	var ObjectId = mongoose.Schema.Types.ObjectId,
		Mixed = mongoose.Schema.Types.Mixed;



	var ProfesorSchema = new mongoose.Schema({
		id: {
			type: ObjectId,
			index: true
		},
		tip: {
			type: String
		}, //profesor ili asistent
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
			},
			titula: {
				tupe: String
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
		predmeti: [Mixed],
	});

	return Profesor = mongoose.model('Profesor', ProfesorSchema, 'profesori');

};