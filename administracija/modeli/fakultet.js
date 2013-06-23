module.exports = function(mongoose) {

	var ObjectId = mongoose.Schema.Types.ObjectId,
		Mixed = mongoose.Schema.Types.Mixed;

	var PlanPoGodiniSchema = new mongoose.Schema({
		zimskiSemestar: [Mixed], //PredmetMiniSchema   
		ljetniSemestar: [Mixed]
	});

	var ProgramSchema = new mongoose.Schema({
		id: ObjectId,
		naziv: {
			type: String,
			unique: true,
			index: true
		},
		godineStudija: Number,
		planPoGodini: [PlanPoGodiniSchema]
	});

	var FakultetSchema = new mongoose.Schema({
		id: ObjectId,
		naziv: {
			type: String,
			required: true
		},
		skracenica: {
			type: String
		},
		dekan: {
			id: ObjectId,
			ime: {
				type: String
			}
		},
		studijskiProgrami: [ProgramSchema],
		arhiva: [Mixed]
	});

	return {
		Fakultet: mongoose.model('Fakultet', FakultetSchema, 'fakulteti'),
		Program: mongoose.model('Program', ProgramSchema),
		PlanPoGodini: mongoose.model('PlanPoGodini', PlanPoGodiniSchema)
	}
};