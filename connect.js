const { MongoClient } = require("mongodb");
const { uri } = require('./config.json');
const mongo = new MongoClient(uri, {useUnifiedTopology: true});
let db, col;

async function run() {
  try {

    await mongo.connect();
    console.log("Déjà connecté au serveur!");

  } catch (err) {
    console.log(err.stack);
  }
  finally {
    // await mongo.close();
  }
}

async function createNewDB(guild) {
  console.log(`creating new db for ${guild}`);

  db = mongo.db('RoninsGearBot');
  col = db.createCollection(guild, {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["discordID", "ap", "aap", "dp", "level", "character", "family", "class", "gearscore", "lastUpdated"],
        properties: {
          discordID: {
            bsonType: "string"
          },
          ap: {
            bsonType: "number",
            minimum: 0,
            maximum: 999
          },
          aap: {
            bsonType: "number",
            minimum: 0,
            maximum: 999
          },
          dp: {
            bsonType: "number",
            minimum: 0,
            maximum: 999
          },
          level: {
            bsonType: "number",
            minimum: 0,
            maximum: 99
          },
          character: {
            bsonType: "string"
          },
          family: {
            bsonType: "string"
          },
          class: {
            bsonType: "string"
          },
          gearscore: {
            bsonType: "number"
          },
          lastUpdated: {
            bsonType: "string"
          },
          pic: {
            bsonType: "string"
          }
        }}}
    });
}

module.exports = {
  mongo: mongo,
  connect: function() {
    run();
  },
  createNewDB: function(guild) {
    createNewDB(guild);
  }
}
