# Bit Manipulation

## Bitwise And

Both bits have to be 1 for the result to be 1

0 & 0 = 0
0 & 1 = 0
1 & 0 = 0
1 & 1 = 1

## Bitwise Or

Only a single bit has to be 1 for the result to be 1

0 | 0 = 0
0 | 1 = 1
1 | 0 = 1
1 | 1 = 1

## Exclusive Or

Result will be 1 if only one of the bits is 1

0 ^ 0 = 0
0 ^ 1 = 1
1 ^ 0 = 1
1 ^ 1 = 0

## Bitshift operation

001 (shortened from 32 digits) = 1
001 << 1 = 010
010 << 1 = 100
100 << 1 = 000 (1 is dropped if its at the end of the 32 bit integer)

Shifting to the left is the same as multiplying by 2
(Like multiplying by 10 in base 10: 543 << 1 = 5430)

Can bitshift to the right
100 >> 1 = 010
010 >> 1 = 001
001 >> 1 = 000
