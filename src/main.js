/**
 * @file Main Loop for screeps-ai
 * 
 * @module main
 * @requires module:harvester
 *
 */

// List of modules needed for main loop
var Harvester = require('harvester');
var Upgrader = require('upgrader');
var Builder = require('builder');
var Repairer = require('repairer');
var Carrier = require('carrier');

var RoomManager = require('room_manager');

module.exports.loop = function () {
    
    /**
     * Delete memory from dead creeps
     */
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    for(let name in Memory.rooms) {
        let flag = Game.rooms[name];
        if(!flag) {
            delete Memory.rooms[name];
            console.log('Clearing room memory:', name);
        }
    }
    
    // spawn new creeps in owned rooms
    RoomManager.run();

    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            Harvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            Upgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            Builder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            Repairer.run(creep);
        }
        if(creep.memory.role == 'carrier') {
            Carrier.run(creep);
        }
    }
}
