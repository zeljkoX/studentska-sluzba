module.exports = function(mongoose) {

	var ObjectId = mongoose.Schema.Types.ObjectId,
		Mixed = mongoose.Schema.Types.Mixed;



	var ProfesorSchema = new mongoose.Schema({
		_id: {
			type: ObjectId,
			index: true
		},
		fakultet: {
			type: String
		},
		ime: {
			type: String
		},
		prezime: {
			type: String
		},
		jmbg: {
			type: String,
			index: true
		},
		titula: {
			type: String
		},
		telefon: {
			type: String
		},
		email: {
			type: String
		},
		ulica: {
			type: String
		},
		mjesto: {
			type: String
		},
		aktivan: {
			type: String,
			default: 'da'
		}
	});

	return {
		Profesor : mongoose.model('Profesor', ProfesorSchema, 'profesori')
    }
};