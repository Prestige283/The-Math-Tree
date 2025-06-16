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
        return new Decimal(1)
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
                return player.B.points.add(1).pow(0.2)
            },
            effectDisplay() {
                return "x"+format(this.effect())
            },
        },
        13: {
            title: "A new beginning...",
            description: "Unlock a new layer",
            cost: new Decimal(250),
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

    },
    update(diff) {
  if (player[this.layer].unlocked) {
    player[this.layer].everUnlocked = true;
  }
},

    layerShown(){return hasUpgrade("B",13)||player.T.everUnlocked}
})