var spawnRepairer = {
    
  
	spawn: function() {
		let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');

        let energie = Game.rooms['W24S42'].energyAvailable;
        const maxenergie = 2*(Game.rooms['W24S42'].energyCapacityAvailable/3);
        if(energie >= maxenergie){
            energie = maxenergie;
        }

        if(repairers.length < 2  && energie >= 200) {

            let body = [];
            const bodypart = [WORK,CARRY,MOVE];
            const x = Math.floor((energie)/200);
            for(let i=0; i < x; ++i){
                body.push(...bodypart);
            }

            console.log(body);
            let newName = 'Repairer' + Game.time;
            console.log('Spawning new repairer: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(body, newName,
                {memory: {role: 'repairer', repairing: true}});
        }
	}
};

module.exports = spawnRepairer;
