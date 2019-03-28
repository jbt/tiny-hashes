# Implementation notes

Here are a few notes that didn't make sense to include as comments directly in the source files. They include a few trade-offs in performance vs. size, and some corners which have been cut, but which don't affect any sensible use-cases.

## Alternative lines

In a few places there are some individual lines left commented out next to functionally-equivalent lines. These are alternatives that achieve the same uncompressed byte-size but which can be swapped in or out in various combinations to appease the gzip gods and reduce the compressed filesize.

## Precomputation

For MD5 and SHA-256 the magic constants are computed based on simple maths. These _could_ be inlined and only the computation used whenever needed (e.g. replacing `k[j]` with the direct `Math`-based computation for the value) - and this would probably result in a slightly smaller overall size. However, these computations are expensive compared to the rest of the operations in the main hash loop (`Math.sin` and fractional `Math.pow`) so these are deliberately computed once outside the main hash function and reused each time around.

## Length bits

The specifications for these hashes use two bytes for length bits. These implementations intentionally don't bother setting the upper byte, because if you have an input that long (>512MB) then the hash is going to be horribly inefficient and you probably shouldn't be using these implementations anyway.

## Integer safety

These implementations heavily ~~abuse~~ rely on the fact that JS numbers can safely be used with up to 53 bits of integer precision. For that reason, most number type variables are deliberately _not_ explicitly clamped to 32 bits unless absolutely necessary.

For example, most places where other implementations would use a "safe-add" function to add 32-bit ints with proper overflow are just simple additions here because the JS number type can handle it. That does mean, however, that the repeated conversion from ints to floats and back again is probably quite inefficient.

The accumulation of hash values (in the `h` array) is one place where numbers may potentially reach values larger than `Number.MAX_SAFE_INTEGER`, but the point at which this is even a possibility is again beyond the usefulness of these implementations (theoretically this shouldn't be possible for any inputs less than 2<sup>21</sup> hash rounds = ~128MB, and even for larger inputs is extremely unlikely).

## `a` reassignment in sha256

Yes, I know how horrible it is to reuse a function name for a local variable. But it saves bytes!

## Other tricks

There are a bunch of other tricks scattered around here for making the code smaller. Here's a few:

* Bit shift operators always modulo the shift amount to be between 0 and 31, so `x >>> 32 - a` can be rewritten as `x >>> -a` and any place that would usually feature a `%` can probably be dropped.
* `~~undefined` evaluates to 0, so the empty slots in `words` between the data and length bits doesn't need to be zero-filled.
