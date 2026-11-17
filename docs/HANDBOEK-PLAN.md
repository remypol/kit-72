# Persoonlijk noodhandboek: plan

Geschreven op 17 november 2026. Status: plan, er is nog niets gebouwd.

## Het idee

Iemand vult een adres en een paar gegevens over het huishouden in en krijgt een handboek dat alleen voor dat adres klopt: hoe hoog het huis ligt, waar de dichtstbijzijnde spoedeisende hulp is, welke zender je aanzet, waar je water en medicijnen haalt, hoeveel je in huis moet hebben. Als pdf om te printen en op de telefoon te bewaren. Richtprijs € 19,99.

## Oordeel vooraf

Het idee is goed, en beter dan een algemeen e-book van € 9,99: een algemeen handboek concurreert met de gratis folder van de overheid, een handboek voor jouw adres niet. Drie dingen moeten wel eerlijk gezegd worden.

1. **De data is niet de moat.** Alles is openbaar. De moat zit in het samenvoegen, het controleren per land en het ontwerp. Dat is werk dat een concurrent ook kan doen, maar het is veel werk.
2. **Bunkers zijn er niet.** Nederland heeft geen werkende openbare schuilkelders en is volgens het ministerie niet van plan ze te maken. Duitsland heeft er nog 579, die niet inzetbaar zijn. Dat onderdeel kan dus niet worden wat je voor ogen hebt; het wordt "schuilen in huis" plus wat de gemeente aanwijst zodra dat bestaat.
3. **Verkeer blijft de bottleneck.** De site krijgt nu ongeveer 55 bezoekers per maand uit Google. Het plan hieronder bevat daarom een gratis onderdeel dat zelf verkeer moet opleveren.

## Wat ik heb getest

Met een neutraal testadres (Coolsingel 40, Rotterdam), vandaag, vanaf mijn machine:

| Onderdeel | Bron | Resultaat |
|---|---|---|
| Adres naar coördinaten, gemeente, wijk, waterschap | PDOK Locatieserver | Werkt, 0,3 s |
| Hoogte van het maaiveld | AHN via PDOK | Werkt: 0,44 m boven NAP, 0,2 s |
| Veiligheidsregio en GGD-regio | CBS gebiedsindelingen via PDOK | Lagen beschikbaar |
| Supermarkt, apotheek, AED, drinkwaterpunt, politie, brandweer | OpenStreetMap (Overpass) | Werkt, maar **34 s** voor één adres |
| Looproute en afstand | OSRM | Werkt, 0,3 s |
| Adres in Spanje | CartoCiudad | Werkt, 1,2 s |
| Adres in Duitsland | Photon (OpenStreetMap) | Werkt, 0,3 s |
| Hoogte buiten Nederland | EU-DEM via OpenTopoData | Werkt, maar gaf 8,5 m waar AHN 0,44 m meet |
| Maximale waterdiepte bij overstroming | LIWO (Rijkswaterstaat) | **Niet bereikbaar** vanaf hier; de kaart bestaat en voedt overstroomik.nl |

Wat dit leert:

- **Live opvragen kan niet voor alles.** OpenStreetMap live bevragen duurt te lang. De punten moeten vooraf in een eigen bestand of database staan en periodiek ververst worden. "Real time" betekent dan: gegenereerd op het moment van bestellen, met data van hooguit een paar weken oud.
- **Ziekenhuizen uit OpenStreetMap zijn niet betrouwbaar genoeg.** De drie dichtstbijzijnde "ziekenhuizen" bij het testadres waren een oogziekenhuis en een gezichtskliniek. Nederland heeft 79 locaties met een spoedeisende hulp (RIVM, 2026); die lijst moet met de hand worden bijgehouden.
- **Hoogte buiten Nederland vraagt nationale hoogtemodellen.** De Europese noodoplossing zit er in een stad meters naast.
- **Overstromingsdiepte is het sterkste gegeven en nog niet bewezen.** Dat is de eerste taak.

## Wat er in het handboek staat

| Pagina | Persoonlijk? | Bron |
|---|---|---|
| Voorblad: adres, huishouden, datum, geldig tot | ja | invoer |
| Jouw adres in cijfers: hoogte, verwachte waterdiepte, veiligheidsregio, waterschap | ja | AHN, LIWO, PDOK |
| Kaart van de buurt: supermarkt, apotheek, AED, drinkwater, politie, brandweer | ja | OpenStreetMap |
| Naar de spoedeisende hulp: de dichtstbijzijnde twee, met route | ja | eigen lijst (RIVM), OSRM |
| Hoger gelegen grond: waar ga je heen als het water komt, en wanneer blijf je boven | ja | AHN |
| Wie bel je, waar luister je: rampenzender van je regio, storingsnummer van je netbeheerder, waterbedrijf, huisartsenpost | ja, per regio | eigen tabellen per veiligheidsregio |
| Jouw voorraad: water, eten, licht, geld, medicijnen, baby, huisdier | ja | bestaande rekenregels van de site |
| Noodplan om in te vullen: verzamelplek, wie haalt de kinderen, contactpersonen | deels | vaste opzet |
| Vier situatiekaarten: stroom, water, overstroming, evacuatie | nee | vaste infographics |
| Controleschema met data | ja | invoer |

De vaste infographics zijn herbruikbaar. De persoonlijke pagina's maken het product.

## Hoe het zichzelf verspreidt

1. **Gratis adrescheck.** Adres invullen, direct drie feiten: hoogte, veiligheidsregio, afstand tot de spoedeisende hulp. Daaronder een onscherpe voorvertoning van het handboek met een koopknop. Dit is ook de test of mensen het willen.
2. **Deelbaar plaatje.** "Mijn huis ligt 0,4 m boven NAP" als afbeelding. Zonder adres erop.
3. **Een pagina per gemeente.** Nederland heeft 342 gemeenten. Uit dezelfde data ontstaat per gemeente een pagina met de risico's, de spoedeisende hulp en de rampenzender. Dat is zoekverkeer waar nu niemand op mikt, en het lost de bottleneck op waar de rest van de site ook last van heeft.
4. **Cadeau.** "Voor je ouders" is een reëel koopmotief; kant-en-klare pakketten worden om dezelfde reden gekocht.

## Rekensom

| | |
|---|---|
| Prijs inclusief btw | € 19,99 |
| Exclusief 21 % btw | € 16,52 |
| Na betaalkosten (schatting) | ongeveer € 15 |
| Kosten per handboek | centen, als de data in eigen beheer staat |
| Nodig voor € 10.000 per maand | ongeveer 670 verkopen |

Bij een aanname van 2 % kopers onder gebruikers van de adrescheck zijn dat ruim 33.000 adreschecks per maand. Dat percentage is een aanname; de adrescheck is er om het te meten. Een jaarlijkse update tegen een lager bedrag zou er terugkerende omzet van maken, omdat data en houdbaarheid veranderen.

## Techniek in het kort

- Adrescheck: formulier op de site, een serverfunctie die PDOK en AHN bevraagt en de punten uit een eigen, vooraf opgebouwd bestand haalt.
- Betalen: iDEAL is in Nederland onmisbaar. Keuze tussen een betaalprovider (zelf btw afdragen per land van de koper) en een tussenpartij die als verkoper optreedt en de btw afhandelt.
- Genereren: na betaling een taak die de pagina's als HTML opbouwt in het ontwerp van de site en omzet naar pdf, met kaarten uit OpenStreetMap-tegels. Het resultaat staat tijdelijk in afgeschermde opslag; de koper krijgt een link per e-mail.
- Bijhouden: de handmatige tabellen (spoedeisende hulp, zenders, storingsnummers) krijgen elk een controledatum, zoals de prijzen op de vergelijkingspagina's.

Welke onderdelen van Vercel hiervoor het handigst zijn, bepaal ik in de eerste fase aan de hand van hun actuele documentatie.

## Wat geregeld moet worden

- **Privacy.** Een adres is een persoonsgegeven. Alleen gebruiken om het handboek te maken, het pdf-bestand na een vaste termijn verwijderen, het adres niet bewaren.
- **Herroepingsrecht.** Bij digitale inhoud moet de koper uitdrukkelijk instemmen met directe levering en afstand doen van de bedenktijd.
- **Aansprakelijkheid.** Het handboek vervangt geen aanwijzingen van hulpdiensten; elke gegevensbron krijgt een datum. Een fout in "dichtstbijzijnde spoedeisende hulp" is het grootste risico, vandaar de handmatige lijst.
- **Licenties.** OpenStreetMap vraagt naamsvermelding; de voorwaarden van AHN, LIWO en de kaarttegels controleer ik voordat er iets verkocht wordt.
- **Toon.** Een overstromingsdiepte bij je eigen adres is confronterend. Feitelijk brengen, met wat je ermee doet, past bij de site.

## Fasering

| Fase | Wat | Klaar als |
|---|---|---|
| 0. Bewijs | Nederlands adres naar één pagina pdf met tien feiten. LIWO-koppeling bewijzen, lijst spoedeisende hulp opbouwen, kaartweergave kiezen | het pdf voor drie testadressen klopt bij handmatige controle |
| 1. Adrescheck | Gratis adrescheck live, met voorvertoning en koopknop naar een wachtlijst met prijs | we weten welk deel op "kopen" klikt |
| 2. Verkoop | Betalen, genereren, bezorgen, voor Nederland | de eerste betaalde handboeken zijn geleverd zonder handwerk |
| 3. Gemeentepagina's | 342 pagina's uit dezelfde data | ze zijn geïndexeerd |
| 4. Duitsland, daarna Spanje | Per land eigen bronnen voor hoogte, overstroming en spoedeisende hulp | per land dezelfde controle als in fase 0 |

Doorgaan na fase 1 alleen als de adrescheck laat zien dat mensen willen betalen. Duitsland is lastiger dan Nederland: overstromingskaarten en hoogtemodellen zijn daar per deelstaat geregeld.

## Beslissingen die bij jou liggen

1. Betaalprovider of tussenpartij die de btw afhandelt.
2. Prijs: € 19,99 als start, of testen met € 14,99 en € 24,99.
3. Wie beantwoordt vragen van kopers.
4. Eerst alleen Nederland (mijn advies), of meteen drie landen.
