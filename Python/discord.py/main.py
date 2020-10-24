import discord
from discord.ext import commands, tasks
from config import TOKEN, PREFIX
from itertools import cycle

intents = discord.Intents(messages= True, guilds= True)
"""https://discordpy.readthedocs.io/en/latest/intents.html"""
# Above are the essential intents. If working with reactions add:
# intents.reactions = True

if len(PREFIX)==0:
    PREFIX = '_'

bot = commands.Bot(command_prefix = PREFIX, intents=intents)

# cog paths
ls_cog= ['cogs.events',
         'cogs.owner',
         'cogs.commands']
# status cyclic list
STATUS = cycle([
    "help",
    "with bots",
    "xyz",
    "with xyz"])


@bot.event
async def on_ready():
    """
    On ready event listener
    http://discordpy.readthedocs.io/en/rewrite/api.html#discord.on_ready
    """
    print(f'\n\nSuccessfully Logged in as: {bot.user}\n')
    # starts status_changer task
    change_status.start()


@tasks.loop(seconds=600)
async def change_status():
    """
    Task for changing the activity status.
    loops through the cycle of the STATUS list and sets that as bot presence
    """
    await bot.change_presence(activity=discord.Game(next(STATUS)))
    # NOTE- There are other methods, that can be utilised instead of just 'playing'

# Here we load our extensions(cogs) listed above in [ls_cog].
if __name__ == '__main__':
    for extension in ls_cog:
        bot.load_extension(extension)


# runs the bot
bot.run(TOKEN)
