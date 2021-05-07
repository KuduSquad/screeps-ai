const Roles = {
	// Civilian roles
	harvester     : {
        name: 'harvester',
        pattern: [WORK,WORK,CARRY,MOVE],
        sizeLimit: 3},
	upgrader    : {
        name: 'upgrader',
        pattern: [WORK,WORK,CARRY,MOVE],
        sizeLimit: 3},
	builder     : {
        name: 'builder',
        pattern: [WORK,WORK,CARRY,MOVE],
        sizeLimit: 3},
	repairer   : {
        name: 'repairer',
        pattern: [WORK,WORK,CARRY,MOVE],
        sizeLimit: 3},
	carrier   : {
        name: 'carrier',
        pattern: [WORK,WORK,CARRY,MOVE],
        sizeLimit: 3},
};

module.exports = Roles;
