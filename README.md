# JavaScript Hash Functions

Some JavaScript implementations of common hash functions (MD5, SHA-1 and SHA-256) designed to be
compressed into the smallest size possible.

I can't entirely guarantee that they'll absolutely always work exactly as they should, so it's
probably not the best idea to use them in anything absolutely mission-critical. That said, they
do seem to work fine for me wherever I use them. And if you do find something wrong, open an issue
[on GitHub](https://github.com/jbt/js-crypto/issues) and I'll do my best to fix it.

## Licence and Usage

These scripts are licensed under [the ☺ licence](http://licence.visualidiot.com/), so basically
you're free to use them however you please - feel free to use or modify them in whatever way you like.
You don't have to explicitly credit me (but if you do then I won't complain), but just don't pass
them off as entirely your own, ok? That's just not cool.

## But Why?

To begin with, because I needed a smallish MD5 that wasn't poorly written (lots of the others out there
leaked globals), but nowadays it's pretty much just because I can.

## And How?

Well, I started out with a mashup of the pseudocode on the respective wikipedia pages for the functions
along with helper functions I found somewhere on the internet for converting strings to byte arrays etc,
then bashed them every which-way I could with functionally-equivalent rearrangements to make the size
smaller however I could think. Just don't try to get me to explain what any of it does any more.