# Quick and dirty node script to bruteforce ST key 0014

https://www.satoshistreasure.xyz/14

### Install

Clone repo then:

````
yarn install
````

messages.txt contains crypted html.
combis.txt contains each letter that must be tried - 45 lines

### Run

Once combis.txt updated run:

````
node --max-old-space-size=8192 app.js
````

or more memory if needed...