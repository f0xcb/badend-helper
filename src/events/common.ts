import type {ArgsOf, Client} from "discordx";
import {Discord, On} from "discordx";
import {MessageEmbed} from "discord.js";

@Discord()
export class MessageDelete {
    @On("messageDelete")
    onMessage([message]: ArgsOf<"messageDelete">, client: Client): void {
        console.log("Message Deleted", client.user?.username, message.content);
    }
}

@Discord()
export class GuildMemberJoin {
    @On("guildMemberAdd")
    onGuildMemberAdd([member]: ArgsOf<"guildMemberAdd">, client: Client): void {
    }
}
