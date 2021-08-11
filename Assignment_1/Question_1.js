const battles = require('./battles.json')

const attackerKing = {};
const defenderKing = {};
const region = {};
const name = {};

const attackOutcome = {
    win: 0,
    loss: 0
};

const battleTypes = [];

const defenderSize = {
    average: 0,
    count: 0,
    max: Number.NEGATIVE_INFINITY,
    min: Number.POSITIVE_INFINITY
};

const battleName ={};

battles.forEach(battle => {
    if(battle.attacker_king in attackerKing) {
        attackerKing[battle.attacker_king] += 1;
    } else if(battle.attacker_king) {
        attackerKing[battle.attacker_king] = 0;
    }

    if(battle.defender_king in defenderKing) {
        defenderKing[battle.defender_king] += 1;
    } else if(battle.defender_king) {
        defenderKing[battle.defender_king] = 0;
    }

    if(battle.region in region) {
        region[battle.region] += 1;
    } else if(battle.region) {
        region[battle.region] = 0;
    }

    if(battle.attacker_outcome === "win") {
        attackOutcome.win += 1;
    } else if(battle.attacker_outcome === "loss"){
        attackOutcome.loss += 1;
    }

    if(!(battleTypes.includes(battle.battle_type))) {
        if(battle.battle_type)
            battleTypes.push(battle.battle_type);
    }

    defenderSize.average += battle.defender_size;
    defenderSize.count += 1;

    if(defenderSize.max < battle.defender_size && battle.defender_size)
            defenderSize.max = battle.defender_size;
    
    if(battle.defender_size < defenderSize.min && battle.defender_size)
        defenderSize.min = battle.defender_size;


    if(battle.name in battleName) {
        battleName[battle.name] += 1;
    } else if(battle.name) {
        battleName[battle.name] = 0;
    }
});


defenderSize.average /= defenderSize.count;

let flag = 0;
let finalName = "";

for(const name in battleName) {
    if(battleName.name > 1) {
        flag = 1;
        break;
    }
}

if(flag === 0) {
    finalName = "All battle names are unique";
}

let resultObj = {
    most_active: {
        attacker_king: Object.keys(attackerKing).reduce((a, b) => attackerKing[a] > attackerKing[b] ? a : b),
        defender_king: Object.keys(defenderKing).reduce((a, b) => defenderKing[a] > defenderKing[b] ? a : b),
        region: Object.keys(region).reduce((a, b) => region[a] > region[b] ? a : b),
        name: finalName
    },
    attacker_outcome: {
        win: attackOutcome.win,
        loss: attackOutcome.loss
    },
    battle_types: battleTypes,
    defender_size: {
        average: defenderSize.average,
        min: defenderSize.min,
        max: defenderSize.max
    }
}

console.log(resultObj);
console.log(JSON.stringify(resultObj));