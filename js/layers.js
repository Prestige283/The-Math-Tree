addLayer("B", {
    name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#00C8FF",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "brain cells", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
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
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (hasUpgrade("T",21)) exp=exp.times(1.05)
        if (hasUpgrade("T",22)) exp=exp.times(1.05)
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



addLayer("S", {
    name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#EEFF99",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "story milestones", // Name of prestige currency
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    tooltip() {
    return "Story";
},
    componentStyles: {
    "main-display"() {
        return { "display": "none" };
    }
},
    tabFormat: [
  "main-display",
  "resource-display",
  ["infobox", "chapter1"],
  ["infobox", "chapter2"],
  "upgrades",
],
    infoboxes: {
    chapter1: {
            title: "Chapter 1: The Beginning",
            body() { return "So you've decided to start doing math. You'll first need some practice by doing some basic math problems. This should give you enough experience to improve fairly quickly." },
        },
    chapter2: {
            title: "Chapter 2: A test?",
            body() { return "You just realized that you need to improve your grades by taking tests. However, these tests have an absurd amount of questions. They're worth it, though! Improving your grades gives powerful boosts. *Current Endgame*" },
            unlocked() {return player.T.everUnlocked}
        },
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true}
})



addLayer("T", {
    name: "", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#FFFFBB",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "tests taken", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 2,
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "t", description: "B: Reset for brain cells", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "Get a C in Math 6",
            description: "^1.2 brain cell effect",
            cost: new Decimal(1),
            unlocked() {
                return getBuyableAmount(this.layer,11).gte(1)
            },
        },
        12: {
            title: "Get a B in Math 6",
            description: "^1.25 brain cell effect",
            cost: new Decimal(2),
            unlocked() {
                return getBuyableAmount(this.layer,11).gte(1)
            },
        },
        13: {
            title: "Get an A in Math 6",
            description: "^1.3 brain cell effect",
            cost: new Decimal(4),
            unlocked() {
                return getBuyableAmount(this.layer,11).gte(1)
            },
        },
        21: {
            title: "Get a C in Math 7",
            description: "^1.05 brain cell gain",
            cost: new Decimal(3),
            unlocked() {
                return getBuyableAmount(this.layer,11).gte(2)
            },
        },
        22: {
            title: "Get a B in Math 7",
            description: "^1.05 brain cell gain",
            cost: new Decimal(5),
            unlocked() {
                return getBuyableAmount(this.layer,11).gte(2)
            },
        },
        23: {
            title: "Get an A in Math 7",
            description: "^1.1 brain cell gain",
            cost: new Decimal(7),
            unlocked() {
                return getBuyableAmount(this.layer,11).gte(2)
            },
        },
    },
    buyables: {
    11: {
        title: "Learn harder math",
        cost(x) { return new Decimal(x).add(1).pow(2) },
        display() { return "Unlocking "+getBuyableAmount("T",11)+"/"+this.purchaseLimit+" math classes<br>Cost: "+format(this.cost())+" tests taken" },
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        purchaseLimit: 3,
        buy() {
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
    },
    },
    update(diff) {
  if (player[this.layer].unlocked) {
    player[this.layer].everUnlocked = true;
  }
},

    layerShown(){return hasUpgrade("B",13)||player.T.everUnlocked}
})