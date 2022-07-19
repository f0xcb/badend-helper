import "reflect-metadata";

import {dirname, importx} from "@discordx/importer";
import type {Interaction, Message} from "discord.js";
import {Intents} from "discord.js";
import {Client} from "discordx";

export const bot = new Client({
    botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
    silent: false,
    simpleCommand: {
        prefix: "!",
    },
});

bot.once("ready", async () => {
    await bot.guilds.fetch();
    await bot.initApplicationCommands();

    // To clear all guild commands, uncomment this line,
    // This is useful when moving from guild commands to global commands
    // It must only be executed once
    //
    //  await bot.clearApplicationCommands(
    //    ...bot.guilds.cache.map((g) => g.id)
    //  );

    console.log("Bot started");
});

bot.on("interactionCreate", (interaction: Interaction) => {
    bot.executeInteraction(interaction);
});

bot.on("messageCreate", (message: Message) => {
    bot.executeCommand(message);
});

async function run() {
    // commonjs environment
    // await importx(__dirname + "/{events,commands}/**/*.{ts,js}");

    // ECMAScript environment
    await importx(dirname(import.meta.url) + "/{events,commands}/**/*.{ts,js}");

    if (!process.env.BOT_TOKEN) {
        throw Error("Could not find BOT_TOKEN in your environment");
    }

    // Log in with your bot token
    await bot.login(process.env.BOT_TOKEN);
}

run();
