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
| Spoedeisende hulp | RIVM, opgave van de ziekenhuizen | klopt | klopt | klopt |
| Supermarkt, apotheek, huisarts | OpenStreetMap | aannemelijk | aannemelijk | deels |
| AED en drinkwaterpunt | OpenStreetMap | niet gevonden | gevonden | gevonden |

"Aannemelijk" betekent: past bij wat bekend is over de plek, maar niet nagemeten bij een tweede bron.

### Wat fout ging en waarom

- **Spoedeisende hulp uit OpenStreetMap was niet bruikbaar.** In Rotterdam stond het Sophia Kinderziekenhuis bovenaan, waar een volwassene niet terechtkan. In Zutphen ontbrak het ziekenhuis in de stad zelf, omdat het in OpenStreetMap niet als spoedeisende hulp is gemarkeerd; het handboek stuurde je naar Deventer, 17 km verder.
- **Opgelost met de lijst van het RIVM.** Het RIVM publiceert de antwoorden van alle ziekenhuizen op de vragenlijst "Aanbod SEH's en Acute Verloskunde 2026" als open data zonder gebruiksbeperking (versie 7 juli 2026). `handbook/scripts/seh_from_rivm.py` maakt daarvan `handbook/data/seh-nl.json`: 79 locaties, elk op het eigen adres geplaatst via PDOK, waarvan 3 niet dag en nacht open zijn (Amstelveen, Schiedam, Zutphen). Het handboek toont de snelst bereikbare locatie; is die 's nachts dicht, dan staat dat erbij en is de tweede regel de snelst bereikbare die altijd open is. Na deze wijziging: Rotterdam geeft Erasmus MC en Franciscus Gasthuis, Zutphen geeft Gelre Zutphen ('s nachts dicht) en Deventer.
- **PDOK kiest stil een ander huisnummer** als het gevraagde niet bestaat. De opdracht waarschuwt daar nu voor; de adrescheck moet het adres laten bevestigen.
- **Hoogte onder een gebouw bestaat niet.** Het hoogtemodel heeft geen waarde onder bebouwing en een adrespunt ligt op het gebouw. De code meet nu een ring van punten op 15 tot 40 meter en neemt de middelste waarde.
- **De Overpass-servers van OpenStreetMap lagen de hele middag plat.** De code gebruikt nu de kaart-API van OpenStreetMap voor alles binnen een kilometer en zoekdiensten (Photon, Nominatim) voor wat verder weg ligt. Dit bevestigt het plan: voor verkoop moeten de punten in eigen beheer staan.
- **AED's staan maar deels in OpenStreetMap.** Op het platteland vond de proef er geen. De landelijke AED-registratie is niet openbaar; dit onderdeel belooft dus "AED's die in OpenStreetMap staan", niet "de dichtstbijzijnde AED".
- **"Supermarkt" in OpenStreetMap is ruim.** In Zutphen kwam een natuurwinkel als dichtstbijzijnde supermarkt uit de bus.
- **Verwachte waterdiepte ontbreekt nog.** De dienst van LIWO reageerde niet. Wel bewezen: of een adres in een aangewezen overstromingsrisicogebied ligt, en van welk type.

### Oordeel

De tien feiten op de pagina zijn nu automatisch op te halen en kloppen voor de drie testadressen. Drie daarvan (hoogte, supermarkt en huisarts) zijn aannemelijk maar niet bij een tweede bron nagemeten. Fase 0 heeft daarmee bewezen wat het moest bewijzen, met twee open punten die het plan al noemde:

1. De waterdiepte van LIWO opnieuw proberen, of de kaarten als bestand ophalen. Tot die tijd zegt het handboek alleen of je in een overstromingsrisicogebied woont.
2. De tabel met rampenzenders aanvullen van 2 naar 25 veiligheidsregio's.

De lijst van het RIVM verschijnt jaarlijks; de tabel krijgt dus een jaarlijkse verversing, en tussentijdse sluitingen moeten apart gevolgd worden.

## Pagina 2: het eerste uur (17 november 2026)

Op verzoek toegevoegd: concrete eerste stappen, met infographics. De pagina staat in `handbook/pages/first-hour.mjs`; de cijfers en de bron per stap staan in `handbook/data/first-hour-sources.json`.

| Blok | Wat erop staat | Persoonlijk |
|---|---|---|
| De stroom valt uit | acht stappen, tekening van een bad met de flessen drinkwater ernaast, balkjes voor koelkast en vriezer | aantal flessen en liters, naam van de rampenzender |
| Er komt geen water uit de kraan | vier stappen, 6 liter per spoelbeurt, 3 minuten koken | liters per dag en voor 72 uur |
| Het water komt | zes stappen, tekening van hoe weinig water al gevaarlijk is | alleen voor adressen in overstromingsrisicogebied, met de eigen maaiveldhoogte |
| NL-Alert: ramen en deuren dicht | vijf stappen, tekening van een dicht huis | voor alle andere adressen |
| Je moet weg | afvinklijst voor de tas | bedrag aan contant geld, regels voor kinderen en huisdieren |

### Wat de bronnen wel en niet dekken

Alle adviezen zijn nagelopen bij officiële bronnen (Denk Vooruit, Rijksoverheid, overstroomik.nl, Voedingscentrum, Rode Kruis, brandweer.nl, waterbedrijven, netbeheerders, Drinkwaterbesluit). Wat daaruit kwam:

- **"Vul direct je bad" staat nergens als advies bij stroomuitval.** Wel officieel: de waterdruk kan wegvallen (Denk Vooruit), boven de derde verdieping valt de pomp in een flat uit (Vitens, NIPV), en het bad vullen wordt geadviseerd bij een dreigende overstroming (Rijksoverheid) en een aangekondigde wateronderbreking (Dunea). De stap staat er daarom in, met die reden erbij. Waterbedrijven moeten zelf tien dagen zonder stroom kunnen leveren; de stap is dus vooral van belang in hoogbouw.
- **Geschrapt omdat geen officiële bron het zegt:** één lamp aan laten, sms'en in plaats van bellen, water uit de boiler of de stortbak drinken, kaarsen afraden (ze staan juist op de officiële lijsten; de brandweer geeft wel regels).
- **Waterdiepte:** de bekende cijfers 15, 30 en 60 cm komen van de Amerikaanse weerdienst en kloppen niet met de Nederlandse bronnen. Op de pagina staan alleen de Nederlandse: enkelhoog stromend water kan je omver trekken (Rode Kruis), bij 15 cm kan een auto niet meer rijden (overstroomik.nl).
- **Koelkast 4 uur, vriezer 24 tot 48 uur** zijn schattingen van het Voedingscentrum; dat staat erbij.
- **Noodwater:** drie liter per persoon per dag staat in het Drinkwaterbesluit; de 24 uur komt van Denk Vooruit en de Rijksoverheid.

De opmaak wordt bij het bouwen gecontroleerd: het pdf moet precies vier vellen zijn, anders geeft de opdracht een waarschuwing.

## Pagina 3 en 4: slimme trucs en het noodplan (17 november 2026)

De eigenaar wil niet alleen officieel advies: juist de trucs die de overheid niet noemt maken de gids anders dan een folder. Daarom staat het officiële advies op pagina 2 en staan de trucs apart op pagina 3, met erbij dat het geen officieel advies is.

**Pagina 3, slimme trucs** (`handbook/pages/hacks.mjs`, inhoud in `handbook/data/hacks-nl.json`): vier getekende trucs (flessen invriezen, lamp van een fles, doorkoken in een dekbed, munt op een bevroren beker) en ruim twintig trucs in vijf thema's, plus een thema dat van het adres afhangt (hoogwater, of weggaan). Per truc staat in het databestand waar de toets op rust: een instantie, verslagen van lange storingen, of gewone natuurkunde.

**Pagina 4, jouw noodplan** (`handbook/pages/plan.mjs`): acht bekende trucs die je niet moet doen, invulvelden voor mensen en voor waar alles in huis zit, en een lijst om elk halfjaar na te lopen met de datum van de volgende keer.

### De toets

Elke truc moest twee vragen doorstaan: werkt het, en kan het kwaad als je het doet zoals het er staat. Een onderzoek liep 46 trucs na uit preppergemeenschappen en verslagen uit Texas (2021), Oekraïne en Spanje (2025).

- **Aangepast door de toets:** de munt op een bevroren beker bewijst maar één kant op (onderin is ontdooid geweest; bovenop zegt niets). Doorkoken in een dekbed kreeg de regel dat je het binnen een paar uur eet of eerst opkookt, omdat de pan na vijf uur rond de 50 graden zit.
- **Weggelaten:** eten op het balkon bewaren (de Amerikaanse voedselautoriteit raadt het af; zonder thermometer weet je het niet), dekens over de vriezer (weinig winst), water uit een elektrische boiler tappen (kan, maar te bewerkelijk om veilig in één regel te zetten), drinken uit de stortbak (bronnen spreken elkaar tegen), en een dosering voor bleek (te makkelijk verkeerd te lezen; het handboek zegt koken).
- **Naar "doe dit niet":** de bloempotkachel, het fornuis als kachel, verbranding binnen, de motor in de garage, een aggregaat op een stopcontact, spullen in de vaatwasser, drinken uit cv of regenton, en eten keuren op geur.

Wat niet bij een instantie te toetsen viel staat er als ervaring van anderen in; dat geldt onder meer voor de breekstaafjes, de vaste plek voor lampen en het briefje op de deur.

## Verdienmodel: gratis handboek, betaald door partners (17 november 2026)

De eigenaar wil geen producten verkopen en verwacht niet dat consumenten voor het handboek betalen. Besloten richting: het handboek is gratis in ruil voor een e-mailadres, en de opbrengst komt van partners die betalen als een lezer via ons iets afsluit of aanvraagt. Losse persoonsgegevens verkopen doen we niet: het levert weinig op, vraagt aparte toestemming per doel, en een lijst met adressen waar geld en voorraad in huis ligt mag nooit rondgaan.

### Wat is nagezocht

Een onderzoek liep de Nederlandse programma's na (107 pagina's geopend); daarnaast is in het Awin-account zelf gezocht.

| Categorie | Programma | Netwerk | Openbare vergoeding | Hoe het werkt |
|---|---|---|---|---|
| Woonverzekering | Univé | Awin | tot € 90 per afgesloten verzekering | doorklikken; geen vooringevulde gegevens |
| Woonverzekering | Centraal Beheer, FBTO, Interpolis, ANWB, ABN AMRO, a.s.r., InShared, Allianz Direct | Awin | pas zichtbaar na toelating | gesloten programma's met screening |
| Offertes (zonnepanelen, isolatie) | Slimster | Daisycon of eigen programma | € 3 tot 20 per offerteaanvraag | enige die aanvragen uit ons eigen formulier aanneemt |
| Offertes | Offertevergelijker | Daisycon | tot € 31,50 | doorklikken |
| Beveiliging | WoonVeilig | Daisycon | tot € 70 | voorwaarden achter de inlog |
| Beveiliging | Verisure NL | Daisycon | tot € 20 | terugbelverzoek |
| Personenalarm | Nederlandse Senioren Alarmering | Daisycon | tot € 52,50 | voorwaarden achter de inlog |
| Noodstroom | EcoFlow NL, ALLPOWERS NL | Awin | 5 % van de aankoop | productverkoop |
| Energie | Overstappen, Independer Energie, Gaslicht.com | Awin | € 20 per contract (Overstappen) | doorklikken |

### Wat dit verandert aan het idee

- **Bijna niemand betaalt voor een vinkje in ons handboek.** Vrijwel alle programma's betalen pas als de lezer doorklikt en bij de partner zelf afsluit. Alleen Slimster neemt aanvragen uit ons eigen formulier aan.
- **Overstroming door een dijkdoorbraak is niet te verzekeren.** Schade door zee of grote rivieren is voor vrijwel alle huishoudens niet gedekt; schade door kleine rivieren, kanalen en extreme regen meestal wel (Verbond van Verzekeraars, Consumentenbond). Het aanbod "dekt je verzekering een overstroming?" kan dus alleen eerlijk als uitleg, met daarna een gewone vergelijking van woonverzekeringen.
- **Een thuisbatterij werkt meestal niet bij een stroomstoring** (Milieu Centraal). Voor batterij-offertes is geen Nederlandse vergoeding per aanvraag gevonden. Het eerlijke aanbod is noodstroom die wel werkt: een powerstation.
- **Regels.** Per aanbod een eigen, niet vooraf aangevinkt vakje, de ontvanger bij naam, en het handboek mag er niet van afhangen. Wie gebeld gaat worden moet daar sinds 1 juli 2026 uitdrukkelijk mee instemmen (ACM). Verzekeraars eisen dat de site zich aan de regels van de AFM houdt.

### Rekensom, bijgesteld

De eerdere schatting van € 1,40 per handboek ging uit van een vinkje dat direct geld oplevert. Met doorklikken ligt het lager. Een eigen inschatting, niet gemeten: € 0,50 tot € 1 per handboek als er een offerteformulier in de stroom zit, anders eerder € 0,10 tot € 0,30. Voor € 10.000 per maand zijn dat 10.000 tot 20.000 handboeken per maand in het gunstige geval.

### Awin

Kit-72 is toegevoegd als tweede site aan Awin-account 2996923; de Britse watersite in dat account is niet aangeraakt. De aanvraag bij ration1.de staat nog open. Beide Awin-accounts hebben het Verenigd Koninkrijk als hoofdregio en een beschrijving van de watersite; Nederlandse adverteerders zien dat bij hun beoordeling.

Aangemeld op 17 november 2026, alle vier in afwachting van goedkeuring: Univé NL, EcoFlow NL, ALLPOWERS NL en Overstappen NL. Voor Slimster, WoonVeilig en het personenalarm is een Daisycon-account nodig; dat is er nog niet.

