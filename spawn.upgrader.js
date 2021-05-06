/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawn.upgrader');
 * mod.thing == 'a thing'; // true
 */

var spawnUpgrader = {

    spawn: function() {
        let upgrader =
            _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');

        console.log('upgrader: ' + upgrader.length);
        if (upgrader.length < 3) {
            let newName = 'Upgrader' + Game.time;
            console.log('Spawning new Upgrader: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(
                [WORK, CARRY, MOVE], newName, {memory: {role: 'upgrader'}});
        }
    }
}
module.exports = spawnUpgrader;
