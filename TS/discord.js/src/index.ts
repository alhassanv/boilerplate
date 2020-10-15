import { Client, Message } from "discord.js";
import dotenv from "dotenv";
import { Commands } from "./commands";

// Load environment variables
dotenv.config();

// Declare globals
const client = new Client();
const token = process.env.TOKEN;
const prefix = process.env.PREFIX;

//connect the bot
client
  .login(token)
  .then(() => console.log("Your bot is online!"))
  .catch((err) => console.error(err));

//message handler
client.on("message", (message: Message) => {
  //bot ignores itself
  if (message.author.id === client.user?.id) {
    return;
  }

  //check for valid command and run it
  if (message.content.startsWith(prefix)) {
    for (const Command of Commands) {
      if (message.content.startsWith(`${prefix}${Command.name}`)) {
        Command.command(message);
        break;
      }
    }
  }
});
