const events = require("events");

class CypressBus extends events.EventEmitter {}

module.exports = new CypressBus();
