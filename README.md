# gamesim

Purpose
-------
Creating a functional idle game base which can be used as the basis for further prototyping to find the core fun.
Primarily I focused on getting a solid core together to allow a designer to get a feel for the core mechanics.


Solution
--------

This is a very lightweight solution using PixyJs as a simple renderer & the Brackets editor for development.
There is no particular reason for these technical choices other than size & keeping the project clean. 
Using only these two is hardly ideal for full production as it gives limited control for artists to be involved & does not give much in the way of UI tooling.

In terms of architecture I have aimed for a view/model approach to ensure the simulation has nothing todo with the UI & general gameplay other that state lookup or changes. 
If more time were allowed I'd create an event management layer to further distant these two & further decouple visuals from logic.

One of the primary reasons for keeping them seperate (that is specific to this project) is that you may want to:

*Introduce offers boost online/offline generation for currency or ad placements.
*More complex meta upgrades that boost particular business or activate under certain conditions.

As these options layer on complexity to the generation process it makes sense to keep them as isolated as possible from the general gameplay as they will likely be used offline & online.


>Saving strategy
The save strategy employed in the project is based on my experience with FB instant games in the past, reducing the need to save often and only when player actions occur.
If the player were to open the game for X seconds & undertake no actions, then we don't need to save as offline generation ensures we have correct values on their return.

If the player spends currency or manually collects currency then a save will be triggered.

If short timeouts are in use, then it's worth considering batching save attempts to limit & prevent multiple save games being send to the platform within a short timespan.


Feature overview
--------

>Buy and upgrade businesses
All businesses are treated as the same by this simulation, there is capacity to extend them to support different currencies as exhibited in some idle games.

>Make money from a business.
A user can click to collect currency from a business as soon as it's generation period has completed or automatiically via a manager.

>Offline Generation
Whilst offline the game will continue to process currency generation, however will still need collected.
If the player has a manager purchased for a business it's collection will be automatic.

>Reset 
For sake of convenience you can reset the save data.

>Design values 
These are stored in data/config.json so that a design can take full control of balancing from the get go.
This is quite handy as finding the balance in idle games can be time consuming & usually requires mathematical modelling.

Their is a few notables for a designer:

Business purchase/upgrade cost = baseCost + (basCost* (nextLevel + costIncreasePerLevel)
Business $ Generation = baseGeneration + (baseGeneration * (level * generationIncreasePerLevel)
Business Manager Cost is a one time static cost.
Time for each generation is a static value.

>Prestige mechanic.

Within the design config is 'additivePrestigeEarningBonusPreReset' which is for the prestige mechanic common to idle games wherby you can restart the game with additonal benefits.
In this case it's an additive value used to multiple incoming currency. However there are several values you may want to use for prestige such as a huge starting currency, speed boosts, etc.. as such the availble options could be expanded further.

In this project there are no limits to how often or how much you can prestige.

Other
-----
Availible at https://cakecommander.itch.io/gamesim using the password 'idlegame', this has been tested on the three major browsers & functions reasonably well.

Caveats
-------
As mentioned tooling has not been a huge priority here as I viewed it as a technical prototype for grayboxing gameplay.
First time using PixyJS as a renderer, as such I haven't focused on visuals very much (as might be obvious).
Resource loading has also not been a major focus, as such it's not fantastic, though it makes use of very little.

No special consideration has been given to representing large numbers at this stage, this could be a problem depending on the scope of the game. This can be handled by using a list of regular numbers, bit shifting or a variety of methods.
Hardcode strings are used, so localisation is not supported at this time.
