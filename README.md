# Bug Squasher for Cats

This is a game I made for my cat using React.js. It is intended to be played on a touch screen, but humans can also play it with a mouse.

## Game Mechanics

### Overview

Small bugs run around the screen. When they are pressed, they get temporarily "squashed," and then then they start moving again. The better the player is at squashing, the more bugs appear on the screen and the longer they take to wake up.

### Scoring

The score is the number of bugs that are currently squashed. This goes up and down, since bugs do not stay squashed forever. The high score is the maximum number of bugs that have been squashed at once during this session.

### Bug Behavior

Each bug behaves according to these rules:

* A new bug is generated whenever there are no active bugs (i.e. the last active bug is squashed or escapes).
* Bugs run around somewhat randomly at a fixed speed without leaving the screen.
* If a bug is nearly squashed, its speed temporarily increases and it runs away from the hit.
* If a bug is hit, it is deactivated for a number of seconds equal to the number of times it has been squashed.
* If a bug is awake for 90 seconds, it "escapes" and disappears.