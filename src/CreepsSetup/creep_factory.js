
function CreepFactory(){
    this.spawn = function(room_name, creep_properties){
        console.log('Debug');
        console.log(room_name);
        let energy = Game.rooms[room_name].energyAvailable;

        let pattern_cost = 0;
        // calculate pattern cost
        for(const part in creep_properties.pattern){
            pattern_cost += BODYPART_COST[part];
        }
        // current size limit
        let sizeLimit = Math.floor(energy/pattern_cost);

        // check sizeLimit from template
        if(sizeLimit > creep_properties.sizeLimit){
            sizeLimit = creep_properties.sizeLimit;
        }

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

        let newName = creep_properties.name + room_name + Game.time;
        console.log('Spawning ' + newName);
        Game.spawns[spawns[0].name].spawnCreep(
            body, newName, {memory: {role: creep_properties.name}});

    }
}

module.exports = CreepFactory;
