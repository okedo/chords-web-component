## Warning!

``` <single-chord></single-chord> ``` tag and *chord* attribute is deprecated in 0.0.2. 
Now use ```<chord-creator></<chord-creator>``` and *chords*

### Attributes:

_All attributes are not case-sensiteve_

## chords

Component requires **chords** attribute:

```
<chord-creator chords="C"></chord-creator>
```

Chord list includes these chords ["F", "F7", "Fm", "C", "C7", "Cm", "D", "D7", "Dm", "E", "E7", "Em", "G", "G7", "Gm", "A", "A7", "Am", "B", "Bm", "B7"];

from version 0.0.2 you can use ```<chord-creator></<chord-creator>``` for diplaying multiple chords with the same style.

Just pass all chords into **chords** attribute as string. Chords must be separated by *commas*, *dots* or *whitespaces*. 

All another attributes will be set for all passed chords.

```
<chord-creator chords="Am, B7, C, Fm"></chord-creator>
```

## size

Chords size can be managed by size attribute
There are tree general sizes: **small**, **medium** and **large**.
Also you can use float numbers for size setup (**1** equals **medium** size):

```
    <chord-creator chords="F" size="small"></chord-creator>
    <chord-creator chords="B" size="large"></chord-creator>
    <chord-creator chords="B7" size="1.2"></chord-creator>
```

## theme

There are two color themes for chord: **light** - default and **dark**

```
    <chord-creator chords="B7" theme="dark"></chord-creator>
    <chord-creator chords="B7" theme="light"></chord-creator>
```

## reflect

Chords by default are shown in convenient form for me.

You can reflect it as you wish.
You can write down axis for reflection or reflection direction. It can be one axis or two separated by comma, dot or whitespace:

```
    <chord-creator chords="B7" reflect="X,Y"></chord-creator>
    <chord-creator chords="B7" reflect="vertical, horizontal"></chord-creator>
    <chord-creator chords="B7" reflect="horizontal"></chord-creator>
    <chord-creator chords="B7" reflect="Y"></chord-creator>
    <chord-creator chords="B7" reflect="Y, horizontal"></chord-creator>
```

## chord

Deprecated!
