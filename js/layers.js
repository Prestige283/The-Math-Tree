addLayer("B", {
    name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "O", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ff8800",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "brain cells", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    effect() {
        let boost=player.B.points.add(1).log(10).add(1)
        if (hasUpgrade('B', 11)) boost = boost.pow(2)
        if (hasUpgrade('T', 11)) boost = boost.pow(1.2)
        if (hasUpgrade('T', 12)) boost = boost.pow(1.25)
        if (hasUpgrade('T', 13)) boost = boost.pow(1.3)
        return boost
    },
    effectDescription() {
    return "multiplying problems solved by " + format(tmp[this.layer].effect);
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('B', 12)) mult=mult.times(upgradeEffect("B",12))
        if (hasUpgrade("T",32)) mult=mult.times(upgradeEffect("T",32))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (hasUpgrade("T",21)) exp=exp.times(1.05)
        if (hasUpgrade("T",22)) exp=exp.times(1.075)
        if (hasUpgrade("T",23)) exp=exp.times(1.1)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for brain cells", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "Connect the brain cells",
            description: "Brain cells boost is squared",
            cost: new Decimal(15),
        },
        12: {
            title: "Think harder",
            description: "Brain cells boost themselves",
            cost: new Decimal(50),
            effect() {
                boost= player.B.points.add(1).pow(0.2)
                if (hasUpgrade(this.layer,22)) boost=boost.pow(1.2)
                return boost
            },
            effectDisplay() {
                return "x"+format(this.effect())
            },
        },
        13: {
            title: "A new beginning...",
            description: "Unlock a new layer (and some upgrades)",
            cost: new Decimal(250),
        },
        21: {
            title: "Learn from the math",
            description: "Points boost themselves",
            cost: new Decimal(500),
            effect() {
                boost= player.points.add(1).pow(0.1)
                if (hasUpgrade(this.layer,22)) boost=boost.pow(1.2)
                return boost
            },
            effectDisplay() {
                return "x"+format(this.effect())
            },
            unlocked(){
                return player.T.everUnlocked && hasUpgrade(this.layer,13)
            },
        },
        22: {
            title: "Intense training",
            description: "^1.2 to B upgrades 12 and 21",
            cost: new Decimal(4000),
            unlocked(){
                return player.T.everUnlocked && hasUpgrade(this.layer,13)
            },
        },
    },
    layerShown(){return true}
})