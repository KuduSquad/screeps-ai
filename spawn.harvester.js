/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawn.harvester');
 * mod.thing == 'a thing'; // true
 */

var spawnHarvester = {

    spawn: function() {
        let harvester =
            _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');

        console.log('harvester: ' + harvester.length);
        if (harvester.length < 3) {
            let newName = 'Harvester' + Game.time;
            console.log('Spawning new harvester: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(
                [WORK, CARRY, MOVE], newName, {memory: {role: 'harvester'}});
        }
    }
}
module.exports = spawnHarvester;
