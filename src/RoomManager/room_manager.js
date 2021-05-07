/**
 * @room manager module
 * checks owned rooms and spawns new creeps
 *
 * @module rooms
 */
const Roles = require('creep_templates');
var CreepFactory = require('creep_factory');

function _spawn(room_name){
            // init state for new rooms
            if(Game.rooms[room_name].memory.state == undefined){
                console.log('init new room ' + room_name);
                Game.rooms[room_name].memory.state = 'default';
                Game.rooms[room_name].memory.spawn_diff = 150;
                Game.rooms[room_name].memory.last_spawn = 0;
            }

            // delay creep spawns
            if((Game.time - Memory.rooms[room_name].last_spawn) >= Memory.rooms[room_name].spawn_diff){
                let harvester =  
                    _.filter(Game.creeps, (creep) => (creep.memory.role == 'harvester' && creep.room == Game.rooms[room_name]));
                let upgrader =
                    _.filter(Game.creeps, (creep) => (creep.memory.role == 'upgrader' && creep.room == Game.rooms[room_name]));
                let builder =
                    _.filter(Game.creeps, (creep) => (creep.memory.role == 'builder' && creep.room == Game.rooms[room_name]));
                let repairer =
                    _.filter(Game.creeps, (creep) => (creep.memory.role == 'repairer' && creep.room == Game.rooms[room_name]));
                let carrier =
                    _.filter(Game.creeps, (creep) => (creep.memory.role == 'carrier' && creep.room == Game.rooms[room_name]));

                // spawn harvester
                let sources = Game.rooms[room_name].find(FIND_SOURCES);
                // spawn carrier
                let container = Game.rooms[room_name].find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER);
                    }
                });
                // spawn builder
                let constructionSites = Game.rooms[room_name].find(FIND_CONSTRUCTION_SITES);

                if(harvester.length < sources.length){
                    //spawn new harvester
                    CreepFactory.spawn(room_name, Roles.harvester);
                }else if((container.length > 0) && (carrier.length < 2)){
                    // spawn carrier
                    CreepFactory.spawn(room_name, Roles.carrier);
                }else if(upgrader.length < 2){
                    //spawn upgrader
                    CreepFactory.spawn(room_name, Roles.upgrader);
                }else if((constructionSites.length > 0) && (builder.length < 2)){
                    //spawn builder
                    CreepFactory.spawn(room_name, Roles.builder);
                }

                // // sppawn repairer
                // if(repairer.length < 2){
                //     // spawn repairer
                //     CreepFactory.spawn(room_name, Roles.repairer);
                // }

            }
}

var RoomManager = {

    /**
     * check rooms and respawn creeps
     * @name spawn
     */
    run: function() {

        /**
         * for every room with owned structures or screeps do
         */
        for(const i in Game.rooms){
                let spawns = Game.rooms[i].find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_SPAWN);
                    }
                });
                
                // only rooms with spawns
                if(spawns){
                    _spawn(Game.rooms[i].name);
                }
            }
        }

    }

module.exports = RoomManager;
