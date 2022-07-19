import type {SimpleCommandMessage} from "discordx";
import {
    ButtonComponent,
    Client,
    Discord,
    SimpleCommand, SimpleCommandOption, SimpleCommandOptionType
} from "discordx";
import {ButtonInteraction, MessageActionRow, MessageButton, MessageEmbed} from "discord.js";

@Discord()
export class Verify {
    @SimpleCommand("verify", {aliases: ["v"]})
    verify(
        @SimpleCommandOption("create", {type: SimpleCommandOptionType.String})
            create: any,
        command: SimpleCommandMessage,
        client: Client
    ): void {
        let isAdmin = command.message.member?.roles.cache.has('904365748787478568');

        if (!isAdmin) {
            command.message.reply({content: 'You do not have permission to use the function.'});
            return;
        }

        if (create) {
            let verifyEmbed = new MessageEmbed()
                .setColor(9676198)
                .setTitle(`BADEND Admin-Team`)
                .setDescription('Please read all Terms in this channel. Accept our terms with a ✅ reaction to this message.')
                .setThumbnail("https://cdn-longterm.mee6.xyz/plugins/reaction_roles/images/904365017539956796/3158b048b0ee2332c44aa87dfb92c7986339644d031b8f4253c19ed7268f1368.png");

            let verifyButton = new MessageButton()
                .setEmoji("✅")
                .setStyle("PRIMARY")
                .setCustomId("verify-button");

            let messageActionRow = new MessageActionRow().addComponents(verifyButton);

            command.message.channel.send(
                {embeds: [verifyEmbed]}
            ).then(function (message) {
                message.edit({components: [messageActionRow]});
            });

            return;
        }

        command.message.channel.send(`Use \`${client.prefix}verify\` <\`create\`>`);
    }

    @ButtonComponent('verify-button')
    verified(interaction: ButtonInteraction): void {
        let memberToVerify = interaction.member?.roles;

        // @ts-ignore
        if (memberToVerify.cache.get('904376379863359570') !== undefined) {
            interaction.reply({content: 'You are already verified!', ephemeral: true});
            return;
        }

        // @ts-ignore
        memberToVerify.add(['904376379863359570']);
        interaction.reply({content: 'You got verified!', ephemeral: true});
        return;
    }
}
