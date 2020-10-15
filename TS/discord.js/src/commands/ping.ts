import { CommandInt } from "../interfaces/commandInt";
import { Message } from "discord.js";

export const ping: CommandInt = {
  name: "ping",
  description: "Pings the bot.",
  command: (message: Message) => {
    message.channel.send("PONG!");
  },
};
