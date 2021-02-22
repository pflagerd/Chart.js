### samples/charts/bar/trading-game.*

trading-game displays a graph of the progress of a game in which 1000 traders "trade" with each other at random.  

Each trader gets $1 to start with.  

Each turn, every trader picks another trader at random with whom to trade.  

In each pair of traders, one trader is randomly assigned "heads", and the other trader is assigned "tails".  

Each pair of traders flips a coin. If the coin lands with heads up, the trader assigned "heads" gets to take \$1 from the trader assigned "tails".  If the coin lands with tails up, the trader assigned "tails" gets to take \$1 from the trader assigned "heads".

When any trader runs out of money, s/he is out of the game.

The graph displays the number of traders (y) having x dollars.