var Repairer = {
    run: function(creep){

        // suche naechsten container, wenn er resourcen enthaelt sonst naechste resourcen quelle 
        if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.repairing = false;
            creep.say('harvest');

            let containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_STORAGE) && 
                        structure.store[RESOURCE_ENERGY] > 0);
                }
            });

            if(containers.length > 0){
                creep.memory.sourceID = creep.pos.findClosestByRange(containers).id;
            }
            else {
                creep.memory.sourceID = creep.pos.findClosestByRange(FIND_SOURCES).id;
            }
        }

        // suche zu reparierende structur im raum und 
        if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0){
            creep.memory.repairing = true;
            creep.say('repair');
            
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER ||
                        structure.structureType == STRUCTURE_ROAD ||
                        structure.structureType == STRUCTURE_TOWER &&
                        structure.hits < structure.hitsMax);
                }
            });

            targets.sort((a,b) => (a.hits/a.hitsMax) - (b.hits/b.hitsMax));

            let repairers = _.filter(Game.creeps, (otherCreep) => otherCreep.memory.role == 'repairer' &&
                otherCreep.room.name == creep.room.name);

            if(repairers.length > 0){
                for(let i = 0; i < repairers.length; ++i){
                    let index = targets.indexOf(Game.getObjectById(repairers[i].memory.target)); 
                    if(index != -1){
                        targets.splice(index,1);
                    }
                }
            }
            
            if(targets.length > 0){
                creep.memory.target = targets[0].id;
            }

        }

        if(creep.memory.repairing && creep.memory.target != null) {
            const target = Game.getObjectById(creep.memory.target);
            if(target.hits == target.hitsMax){
                    
                let targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_ROAD ||
                            structure.structureType == STRUCTURE_TOWER) &&
                            structure.hits < structure.hitsMax);
                    }
                });

                targets.sort((a,b) => (a.hits/a.hitsMax) - (b.hits/b.hitsMax));

                let repairers = _.filter(Game.creeps, (otherCreep) => otherCreep.memory.role == 'repairer' &&
                    otherCreep.room.name == creep.room.name);

                if(repairers.length > 0){
                    for(let i = 0; i < repairers.length; ++i){
                        let index = targets.indexOf(Game.getObjectById(repairers[i].memory.target)); 
                        if(index != -1){
                            targets.splice(index,1);
                        }
                    }
                }
                
                if(targets.length > 0){
                    creep.memory.target = targets[0].id;
                }
            }

            if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }

        }
        else {
            const source = Game.getObjectById(creep.memory.sourceID);
            if(source.structureType == STRUCTURE_CONTAINER || source.structureType == STRUCTURE_STORAGE 
                && source.store[RESOURCE_ENERGY] > 0) {
                if(creep.withdraw(source,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }else {
                creep.memory.sourceID = creep.pos.findClosestByRange(FIND_SOURCES).id;
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
    }

module.exports = Repairer;
