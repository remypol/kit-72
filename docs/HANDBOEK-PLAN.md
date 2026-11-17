# Persoonlijk noodhandboek: plan

Geschreven op 17 november 2026. Status: fase 0 is gebouwd en getest op drie adressen; de uitkomst staat onderaan. Er wordt nog niets verkocht.

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

## Fase 0: uitkomst (17 november 2026)

Gebouwd in `handbook/`. Eén opdracht maakt van een adres een pdf van één pagina:

```bash
node handbook/build.mjs "Coolsingel 40, Rotterdam" --adults 2 --children 1 --pets 0
```

De uitvoer komt in `handbook/out/` en staat niet in git, omdat er adressen in staan. Een eerste run duurt ongeveer 35 seconden; antwoorden van de bronnen worden lokaal bewaard, daarna gaat het in een paar seconden.

### Met de hand gecontroleerd

Drie adressen: een landelijk adres in de gemeente Apeldoorn, Coolsingel 40 in Rotterdam en 's Gravenhof 2 in Zutphen.

| Feit | Bron | Landelijk | Rotterdam | Zutphen |
|---|---|---|---|---|
| Adres, gemeente, waterschap | PDOK Locatieserver | klopt | klopt | klopt |
| Hoogte van het maaiveld | AHN via PDOK | 16,5 m, aannemelijk | 0,4 m, aannemelijk | 10,5 m, aannemelijk |
| In overstromingsrisicogebied | Rijkswaterstaat via PDOK | nee, klopt | ja, achter de dijk, klopt | ja, achter de dijk, klopt |
| Veiligheidsregio en rampenzender | CBS via PDOK, eigen tabel | klopt | klopt | klopt |
| Storingsnummer stroom en gas | Netbeheer Nederland | klopt | klopt | klopt |
| Spoedeisende hulp | OpenStreetMap | klopt | **fout** | **fout** |
| Supermarkt, apotheek, huisarts | OpenStreetMap | aannemelijk | aannemelijk | deels |
| AED en drinkwaterpunt | OpenStreetMap | niet gevonden | gevonden | gevonden |

"Aannemelijk" betekent: past bij wat bekend is over de plek, maar niet nagemeten bij een tweede bron.

### Wat fout ging en waarom

- **Spoedeisende hulp uit OpenStreetMap is niet bruikbaar.** In Rotterdam staat het Sophia Kinderziekenhuis bovenaan, waar een volwassene niet terechtkan. In Zutphen ontbreekt het ziekenhuis in de stad zelf, omdat het in OpenStreetMap niet als spoedeisende hulp is gemarkeerd; het handboek stuurt je naar Deventer, 17 km verder. Die spoedeisende hulp in Zutphen is volgens een antwoord van de minister uit 2024 open van 8 tot 21 uur. Het handboek moet dus ook openingstijden kennen, en de dichtstbijzijnde locatie die dag en nacht open is apart noemen.
- **De bron die dit oplost bestaat.** Het RIVM publiceert de antwoorden van alle ziekenhuizen op de vragenlijst "Aanbod SEH's en Acute Verloskunde 2026" als open data zonder gebruiksbeperking (data.rivm.nl, record `afbdf4b9-00f0-4d4e-a67e-fd3bbc8c833c`, een zip van 107 kB). Nog niet gedownload en verwerkt.
- **Hoogte onder een gebouw bestaat niet.** Het hoogtemodel heeft geen waarde onder bebouwing en een adrespunt ligt op het gebouw. De code meet nu een ring van punten op 15 tot 40 meter en neemt de middelste waarde.
- **De Overpass-servers van OpenStreetMap lagen de hele middag plat.** De code gebruikt nu de kaart-API van OpenStreetMap voor alles binnen een kilometer en zoekdiensten (Photon, Nominatim) voor wat verder weg ligt. Dit bevestigt het plan: voor verkoop moeten de punten in eigen beheer staan.
- **AED's staan maar deels in OpenStreetMap.** Op het platteland vond de proef er geen. De landelijke AED-registratie is niet openbaar; dit onderdeel belooft dus "AED's die in OpenStreetMap staan", niet "de dichtstbijzijnde AED".
- **"Supermarkt" in OpenStreetMap is ruim.** In Zutphen kwam een natuurwinkel als dichtstbijzijnde supermarkt uit de bus.
- **Verwachte waterdiepte ontbreekt nog.** De dienst van LIWO reageerde niet. Wel bewezen: of een adres in een aangewezen overstromingsrisicogebied ligt, en van welk type.

### Oordeel

Negen van de tien feiten zijn automatisch en juist op te halen. Het tiende, de spoedeisende hulp, is precies het feit waar een fout het meeste kwaad doet, en dat is met deze bron in twee van de drie gevallen fout. Fase 0 is daarmee niet af volgens het eigen criterium. Wat nog moet:

1. De lijst van het RIVM verwerken tot een eigen tabel met locatie, openingstijden en controledatum, en de drie adressen opnieuw controleren.
2. De waterdiepte van LIWO opnieuw proberen, of de kaarten als bestand ophalen.
3. De tabel met rampenzenders aanvullen van 2 naar 25 veiligheidsregio's.
