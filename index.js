const discord = require("discord.js")
const client = new discord.Client()
const config = require("./config.json")

if (!config.botToken) {
  throw new Error("No Token has been given in Config")
}

if (!config.guildID) {
  throw new Error("No Guild has been given in Config")
}

if (!config.roleIDs) {
  throw new Error("No Role ID has been given in Config")
}

if (!Array.isArray(config.roleIDs)) {
  throw new Error("Role IDs is not an Array")
}

if (!config.interval) {
  throw new Error("No Interval has been given in Config")
}

let interval = parseInt(config.interval)

if (interval === NaN) {
  throw new Error("Invalid Interval has been given in Config")
}

client.on("ready", async () => {
  
  console.log(`Logged in as ${client.user.tag}\nCheckout our Official GitHub Repo:\nhttps://github.com/Rocky-Discord/rainbow-role`)
  
  setInterval(() => {
  
  let guild = client.guilds.cache.get(config.guildID)
  
  if (!guild) {
    throw new Error("Invalid Guild ID has been given in Config")
  }
  
  for (let i = 0; i < config.roleIDs.length; i++) {
    
    let role = guild.roles.cache.get(config.roleIDs[i])
    
    if (!role) {
      throw new Error(`Role ID ${config.roleIDs[i]} is Invalid in Config`)
    }
    
    else {
      
      role.setColor("RANDOM").catch(() => {
        throw new Error(`Failed to Change Color for Role ${role.name}`)
      })
      
    }
  }
  
  }, interval)
  
})

client.login(config.botToken)