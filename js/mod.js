let modInfo = {
	name: "The Math Tree",
	author: "Prestige283",
	id: "timestree1",
	pointsName: "math problems solved",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.2",
	name: "Planning ahead",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1.2: "Planning ahead"</h3><br>
		- Added 3 T upgrades.<br>
		- Made T upgrades cheaper<br>
		- Each T upgrade increases the cost of the others.<br><br>
	<h3>v0.1.1: "Grades"</h3><br>
		- Added 2 more B upgrades.<br>
		- Added 6 T upgrades.<br><br>
	<h3>v0.1: "The first test"</h3><br>
		- Added 2 more B upgrades.<br>
		- Added T layer.<br>
		- Added 2nd story entry.<br><br>
	<h3>v0.0: "Absolutely nothing"</h3><br>
		- Added B layer and 1 upgrade.<br>
		- Added story.`

let winText = `Congratulations! You have solved all of the math problems in existence.`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade("B",21)) gain=gain.times(upgradeEffect("B",21))
	if (hasUpgrade("T",31)) gain=gain.times(upgradeEffect("T",31))
	gain=gain.times(tmp.B.effect)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return layers.T.upgrades[33].cost().eq(14)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}