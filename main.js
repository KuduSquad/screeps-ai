var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var spawnHarvester = require('spawn.harvester');
var spawnBuilder = require('spawn.builder');
var spawnUpgrader = require('spawn.upgrader');
var spawnRepairer = require('spawn.repairer');

module.exports.loop = function () {
    
    for(let name in Memory.creeps) {
        Game.constructionSites;
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    let energie = Game.rooms['W24S42'].energyAvailable;
    if(energie >= 150){
        console.log('current energie: ' + energie);
        spawnHarvester.spawn();
        spawnUpgrader.spawn();
        spawnBuilder.spawn();
        spawnRepairer.spawn();
    }

    for(let name in Game.creeps) {
        let creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }
}
