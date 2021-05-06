/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('spawn.builder');
 * mod.thing == 'a thing'; // true
 */

var spawnBuilder = {

    spawn: function() {
        let builder =
            _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

        console.log('builder: ' + builder.length);
        if (builder.length < 3) {
            let newName = 'Builder' + Game.time;
            console.log('Spawning new builder: ' + newName);
            Game.spawns['Spawn1'].spawnCreep(
                [WORK, CARRY, MOVE], newName, {memory: {role: 'builder'}});
        }
    }
}
module.exports = spawnBuilder;
