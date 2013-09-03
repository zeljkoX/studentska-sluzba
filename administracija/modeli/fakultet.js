module.exports = function(mongoose) {

	var ObjectId = mongoose.Schema.Types.ObjectId,
		Mixed = mongoose.Schema.Types.Mixed;

	var SemestarSchema = new mongoose.Schema({
		_id: Number,
		predmeti: [Mixed], //PredmetMiniSchema   
	});
	//Studijski Program Sema
	var SPSchema = new mongoose.Schema({
		_id: String,
		naziv: {
			type: String
			//index: true
		},
		semestri: [SemestarSchema]
	});

	var FakultetSchema = new mongoose.Schema({
		//id: ObjectId,
		_id: String,
		naziv: {
			type: String,
			required: true
		},
		skracenica: {
			type: String,
			unique: true
		},
		aktivan: {
			type: String,
			default: 'da',
			index : true
		},
		/*dekan: {
			id: ObjectId,
			ime: {
				type: String
			}
		},*/
		dekan: String,
		opis: String,
		studijskiProgrami: [SPSchema],
		//arhiva: [Mixed]
	});

	return {
		Fakultet: mongoose.model('Fakultet', FakultetSchema, 'fakulteti'),
		Program: mongoose.model('Program', SPSchema),
		Semestar: mongoose.model('Semestar', SemestarSchema)
	}
};