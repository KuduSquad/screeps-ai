var CreepFactory = {
    spawn: function(room_name, creep_properties){
        let energy = Game.rooms[room_name].energyAvailable;

        let pattern_cost = 0;
        // calculate pattern cost
        for(let part in creep_properties.pattern){
            pattern_cost += BODYPART_COST[creep_properties.pattern[part]];
        }
        // current size limit
        let sizeLimit = Math.floor(energy/pattern_cost);
        // console.log(sizeLimit);

        // check sizeLimit from template
        if(sizeLimit > creep_properties.sizeLimit){
            sizeLimit = creep_properties.sizeLimit;
        }

        if(sizeLimit > 0){
            // create body
            let body = [];
            for(let i = 0; i < sizeLimit; ++i){
                body.push(...creep_properties.pattern);
            }

            // get available spawns in room
            let spawns = Game.rooms[room_name].find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_SPAWN) && !structure.spawning);
                }
            });

            if(spawns){
                let newName = creep_properties.name + room_name + Game.time;
                console.log('Spawning ' + newName);
                Game.spawns[spawns[0].name].spawnCreep(
                    body, newName, {memory: {role: creep_properties.name}});

                Game.rooms[room_name].memory.last_spawn = Game.time;
            }
            else {
                console.log('currently spawning');
            }
        }
    }
}

module.exports = CreepFactory;
