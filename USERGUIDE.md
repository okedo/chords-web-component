### Attributes:

_All attributes ara not case-sensiteve_

## chord

Component requires **chord** attribute:

```
<single-chord chord="C"></single-chord>
```

Chord list includes these chords ["F", "F7", "Fm", "C", "C7", "Cm", "D", "D7", "Dm", "E", "E7", "Em", "G", "G7", "Gm", "A", "A7", "Am", "B", "Bm", "B7"];

## size

Chords size can be managed by size attribute
There are tree general sizes: **small**, **medium** and **large**.
Also you can use float numbers for size setup (**1** equals **medium** size):

```
    <single-chord chord="F" size="small"></single-chord>
    <single-chord chord="B" size="large"></single-chord>
    <single-chord chord="B7" size="1.2"></single-chord>
```

## theme

There are two color themes for chord: **light** - default and **dark**

```
    <single-chord chord="B7" theme="dark"></single-chord>
    <single-chord chord="B7" theme="light"></single-chord>
```

## reflect

Chords by default are shown in convenient form for me.

You can reflect it as you wish.
You can write down axis for reflection or reflection direction. It can be one axis or two separated by comma, dot or whitespace:

```
    <single-chord chord="B7" reflect="X,Y"></single-chord>
    <single-chord chord="B7" reflect="vertical, horizontal"></single-chord>
    <single-chord chord="B7" reflect="horizontal"></single-chord>
    <single-chord chord="B7" reflect="Y"></single-chord>
    <single-chord chord="B7" reflect="Y, horizontal"></single-chord>
```
