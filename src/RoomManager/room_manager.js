/**
 * @room manager module
 * checks owned rooms and spawns new creeps
 *
 * @module rooms
 */
const Roles = require('../utils/Roles');
var CreepFactory = require('../CreepsSetup/creep_factory');

function _spawn(room_name){
            // init state for new rooms
            if(Memory.rooms[room_name].state == null){
                Memory.rooms[room_name].state = 'default';
                Memory.rooms[room_name].spawn_diff = 20;
                Memory.rooms[room_name].last_spawn = 0;
            }

            // delay creep spawns
            if((Game.time - Memory.rooms[room_name].last_spawn) <= Memory.rooms[room_name].spawn_diff){
                let num_harvester =  
                    _.filter(Game.creeps, (creep) => (creep.memory.role == 'harvester' && creep.room == Game.rooms[room_name]));
                let num_upgrader =
                    _.filter(Game.creeps, (creep) => (creep.memory.role == 'upgrader' && creep.room == Game.rooms[room_name]));
                let num_builder =
                    _.filter(Game.creeps, (creep) => (creep.memory.role == 'builder' && creep.room == Game.rooms[room_name]));
                let num_repairer =
                    _.filter(Game.creeps, (creep) => (creep.memory.role == 'repairer' && creep.room == Game.rooms[room_name]));
                let num_carrier =
                    _.filter(Game.creeps, (creep) => (creep.memory.role == 'carrier' && creep.room == Game.rooms[room_name]));

                // spawn harvester
                let sources = Game.rooms[room_name].find(FIND_SOURCES);
                if(num_harvester < sources.length){
                    //spawn new harvester
                    CreepFactory.spawn(room_name, Roles.harvester);
                }

                // spawn carrier
                let container = Game.rooms[room_name].find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER);
                    }
                });
                if((container.length > 0) && (num_carrier < 2)){
                    // spawn carrier
                    CreepFactory.spawn(room_name, Roles.carrier);
                }

                // spawn upgrader
                if(num_upgrader < 2){
                    //spawn upgrader
                    CreepFactory.spawn(room_name, Roles.upgrader);
                }

                // spawn builder
                let constructionSites = Game.rooms[room_name].find(FIND_CONSTRUCTION_SITES);
                if((constructionSites.length > 0) && (num_builder < 2)){
                    //spawn builder
                    CreepFactory.spawn(room_name, Roles.builder);
                }

                // sppawn repairer
                if(num_repairer < 2){
                    // spawn repairer
                    CreepFactory.spawn(room_name, Roles.repairer);
                }

            }
}

function RoomManager() {

    /**
     * check rooms and respawn creeps
     * @name spawn
     */
    this.run = function() {

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
                if(spawns.length > 0){
                    _spawn(Game.rooms[i].name);
                }
            }
        }

    }

module.exports = RoomManager;
