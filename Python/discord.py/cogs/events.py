import discord
from discord.ext import commands


"""A cog with simple commands. Showcased here are some check decorators, and the use of events in cogs.
For a list of inbuilt checks:
http://dischttp://discordpy.readthedocs.io/en/rewrite/ext/commands/api.html#checksordpy.readthedocs.io/en/rewrite/ext/commands/api.html#checks
You could also create your own custom checks. Check out:
https://github.com/Rapptz/discord.py/blob/master/discord/ext/commands/core.py#L689
For a list of events:
http://discordpy.readthedocs.io/en/rewrite/api.html#event-reference
http://discordpy.readthedocs.io/en/rewrite/ext/commands/api.html#event-reference
"""


class EventsCog(commands.Cog):
    """EventsCog"""

    @commands.command(name='me')
    @commands.is_owner()
    async def only_me(self, ctx):
        """Command which only responds to the owner of the bot."""

        await ctx.send(f'Hello {ctx.author.mention}. This command can only be used by you!!')

    @commands.Cog.listener()
    async def on_member_ban(self, guild, user):
        """Event Listener which is called when a user is banned from the guild
        For more info:
        http://discordpy.readthedocs.io/en/rewrite/api.html#discord.on_member_ban
        """

        print(f'{user} was banned from {guild.name}-{guild.id}')

    @commands.Cog.listener()
    async def on_member_join(self, guild, user):
        """Event listener which is called when a user joins the guild
        For more info:
        http://discord.py.readthedocs.io/en/rewrite/api.html#discord.on_member_join
        """

        print(f'{user} joined {guild.name}-{guild.id}')

    @commands.Cog.listener()
    async def on_member_remove(self, guild, user):
        """Event listener which is called when a user leaves the guild
        For more info:
        http://discord.py.readthedocs.io/en/rewrite/api.html#discord.on_member_remove
        """

        print(f'{user} has left {guild.name}-{guild.id}')

# The setup fucntion below is neccesarry. Remember we give bot.add_cog() the name of the class in this case EventsCog.
# When we load the cog, we use the name of the file.
def setup(bot):
    bot.add_cog(EventsCog(bot))
