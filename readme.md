The whole repository is in a state of flux as I decide how best to organize and ultimately present everything to the end user.

Early-ish stages of a suite of random number generators and helpers.

I eventually plan to spin off the random number generators into their own repo with NPM/Yarn access, but I need to make sure everything works properly first. Unfortunately most of the random number generators don't work properly in my testing. This applies mostly to XOR generators. I'm assuming it's because I'm testing with smaller bit ranges without triples and the like. I'm not sure why, but the one using Math is odd-heavy instead of evenly distributed.