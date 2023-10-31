# Buy Orders Generator

Tämä ohjelma generoi satunnaisia ostotilauksia CSV-, JSON- ja HTML-tiedostoiksi. Jokainen ostotilaus sisältää satunnaisia asiakastietoja, tuotteita ja tilaustietoja.

## Käyttö

1. Asenna tarvittavat riippuvuudet:

```bash
   npm install
```

2. Suorita ohjelma
```
  node index.js
```
Ohjelma kysyy sinulta, kuinka monta satunnaista ostotilausta haluat generoida.


## Generoidut tiedostot
Ohjelma generoi seuraavat tiedostot:

**buy_orders.csv:** CSV-tiedosto ostotilauksille.
**buy_orders.json:** JSON-tiedosto ostotilauksille.
**buy_orders.html:** HTML-tiedosto ostotilausten esittämiseen taulukkomuodossa.


## Parametrt

Voit säätää seuraavia parametreja ohjelman alussa:
```
    etunimet: Satunnaiset etunimet.
    sukunimet: Satunnaiset sukunimet.
    kadunnimet: Satunnaiset katuosoitteet.
    kaupungit: Satunnaiset kaupungit.
    postinumerot: Satunnaiset postinumerot.
    PuhelinNumerot: Satunnaiset puhelinnumerot.
    emailProviders: Sähköpostipalveluntarjoajat.
    Sukupuoli: Satunnainen sukupuoli (Mies/Nainen).
    Maksutapa: Satunnainen maksutapa.
    Toimitustapa: Satunnainen toimitustapa.
    products: Satunnaiset tuotteet ja hinnat.
```


## Lisätiedot
Ohjelma lisää jokaiselle tilaukselle veron (24%) ja satunnaisen tilausstatussen.
Taulukkotyylin voit mukauttaa tiedostossa buy_orders.html.