export interface Jet {
  id: string;
  name: string;
  fullName: string;
  manufacturer: string;
  origin: 'US' | 'Europe';
  introductionYear: number;
  description: string;
  imageUrl: string;
}

// Gebruik van een krachtige image proxy om Wikimedia redirects en CORB te omzeilen.
// We gebruiken Special:FilePath voor de meest directe toegang tot het bestand.
const wiki = (filename: string) => `https://images.weserv.nl/?url=https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}&w=800&q=80`;

export const jets: Jet[] = [
  // --- 1940s ---
  {
    id: 'p-59',
    name: 'P-59 Airacomet',
    fullName: 'Bell P-59 Airacomet',
    manufacturer: 'Bell Aircraft',
    origin: 'US',
    introductionYear: 1944,
    description: 'Het allereerste Amerikaanse straalvliegtuig, voornamelijk gebruikt voor training en evaluatie.',
    imageUrl: wiki('Bell P-59 Airacomet.jpg')
  },
  {
    id: 'gloster-meteor',
    name: 'Gloster Meteor',
    fullName: 'Gloster Meteor',
    manufacturer: 'Gloster Aircraft Company',
    origin: 'Europe',
    introductionYear: 1944,
    description: 'De enige geallieerde jet die tijdens de Tweede Wereldoorlog operationele status bereikte.',
    imageUrl: wiki('Gloster Meteor F.8 being prepared for flight.jpg')
  },
  {
    id: 'p-80',
    name: 'P-80 Shooting Star',
    fullName: 'Lockheed P-80 Shooting Star',
    manufacturer: 'Lockheed',
    origin: 'US',
    introductionYear: 1945,
    description: 'De eerste succesvolle Amerikaanse operationele jet, ingezet in de Koreaanse Oorlog.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/18/P80-1_300.jpg'
  },
  {
    id: 'vampire',
    name: 'DH.100 Vampire',
    fullName: 'de Havilland Vampire',
    manufacturer: 'de Havilland',
    origin: 'Europe',
    introductionYear: 1946,
    description: 'Een Britse jet met een unieke dubbele staartboom en een romp deels van hout.',
    imageUrl: wiki('De Havilland Vampire 1.jpg')
  },
  {
    id: 'fh-1',
    name: 'FH-1 Phantom',
    fullName: 'McDonnell FH-1 Phantom',
    manufacturer: 'McDonnell Aircraft',
    origin: 'US',
    introductionYear: 1947,
    description: 'Het eerste straalvliegtuig dat vanaf een Amerikaans vliegdekschip opereerde.',
    imageUrl: wiki('FH-1 Phantom in flight in February 1948 cropped.jpg')
  },
  {
    id: 'f-84',
    name: 'F-84 Thunderjet',
    fullName: 'Republic F-84 Thunderjet',
    manufacturer: 'Republic Aviation',
    origin: 'US',
    introductionYear: 1947,
    description: 'Een robuuste jachtbommenwerper die de ruggengraat vormde van vele vroege NAVO-luchtmachten.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/F-84E_of_9th_Fighter-Bomber_Squadron_in_Korea.jpg'
  },
  {
    id: 'f-86',
    name: 'F-86 Sabre',
    fullName: 'North American F-86 Sabre',
    manufacturer: 'North American Aviation',
    origin: 'US',
    introductionYear: 1949,
    description: 'De beroemde "Sabrejet", legendarisch door zijn luchtgevechten boven de "MiG Alley" in Korea.',
    imageUrl: wiki('F-86 Sabre in flight.jpg')
  },
  {
    id: 'saab-21r',
    name: 'Saab 21R',
    fullName: 'Saab 21R',
    manufacturer: 'Saab',
    origin: 'Europe',
    introductionYear: 1950,
    description: 'Zweeds toestel dat werd omgebouwd van zuigermotor naar straalmotor.',
    imageUrl: wiki('Saab 21R 3.jpg')
  },
  {
    id: 'saab-29',
    name: 'Saab 29 Tunnan',
    fullName: 'Saab 29 Tunnan',
    manufacturer: 'Saab',
    origin: 'Europe',
    introductionYear: 1951,
    description: 'Het "Vliegende Vat", de eerste naoorlogse Europese jet met pijlvleugels.',
    imageUrl: wiki('Saab_J_29F_Tunnan_29670_SE-DXB_på_uppvisning_i_Karlstad_2025_(cropped).jpg')
  },
  {
    id: 'f-89',
    name: 'F-89 Scorpion',
    fullName: 'Northrop F-89 Scorpion',
    manufacturer: 'Northrop',
    origin: 'US',
    introductionYear: 1950,
    description: 'Een zware onderscheppingsjager voor alle weersomstandigheden, uitgerust met raketten.',
    imageUrl: wiki('Northrop F-89J Scorpion.jpg')
  },
  {
    id: 'ouragan',
    name: 'MD.450 Ouragan',
    fullName: 'Dassault MD.450 Ouragan',
    manufacturer: 'Dassault',
    origin: 'Europe',
    introductionYear: 1952,
    description: 'De eerste in Frankrijk ontworpen straaljager die in serieproductie ging.',
    imageUrl: wiki('Dassault Ouragan.jpg')
  },
  {
    id: 'f7u',
    name: 'F7U Cutlass',
    fullName: 'Vought F7U Cutlass',
    manufacturer: 'Vought',
    origin: 'US',
    introductionYear: 1951,
    description: 'Een onconventionele staartloze jet van de US Navy, bekend om zijn futuristische uiterlijk.',
    imageUrl: wiki('F7U cutlass 1954.jpg')
  },
  {
    id: 'hunter',
    name: 'Hawker Hunter',
    fullName: 'Hawker Hunter',
    manufacturer: 'Hawker Siddeley',
    origin: 'Europe',
    introductionYear: 1954,
    description: 'Een van de meest elegante en succesvolle Britse straaljagers ooit gebouwd.',
    imageUrl: wiki('Hunter_-_Shuttleworth_Military_Pageant_June_2013_(9187713516).jpg')
  },
  {
    id: 'f-100',
    name: 'F-100 Super Sabre',
    fullName: 'North American F-100 Super Sabre',
    manufacturer: 'North American Aviation',
    origin: 'US',
    introductionYear: 1954,
    description: 'De eerste van de "Century Series", de eerste US jager die supersonisch ging in horizontale vlucht.',
    imageUrl: wiki('F-100_Airventure_2015.jpg')
  },
  {
    id: 'mystere-iv',
    name: 'Mystère IV',
    fullName: 'Dassault Mystère IV',
    manufacturer: 'Dassault',
    origin: 'Europe',
    introductionYear: 1955,
    description: 'Een Franse jachtbommenwerper die grote successen kende in diverse conflicten.',
    imageUrl: wiki('Dassault Mystère IV.jpg')
  },
  {
    id: 'f-101',
    name: 'F-101 Voodoo',
    fullName: 'McDonnell F-101 Voodoo',
    manufacturer: 'McDonnell Aircraft',
    origin: 'US',
    introductionYear: 1954,
    description: 'Oorspronkelijk ontworpen als escortjager voor lange afstand, later een krachtige interceptor.',
    imageUrl: wiki('F-101B_New_York_ANG_in_flight_1978.jpeg')
  },
  {
    id: 'f-102',
    name: 'F-102 Delta Dagger',
    fullName: 'Convair F-102 Delta Dagger',
    manufacturer: 'Convair',
    origin: 'US',
    introductionYear: 1956,
    description: 'De eerste delta-vleugel interceptor van de USAF voor alle weersomstandigheden.',
    imageUrl: wiki('Convair_YF-102_FC-782.jpg')
  },
  {
    id: 'super-mystere',
    name: 'Super Mystère',
    fullName: 'Dassault Super Mystère B2',
    manufacturer: 'Dassault',
    origin: 'Europe',
    introductionYear: 1957,
    description: 'De eerste West-Europese jet die supersonisch kon vliegen in horizontale vlucht.',
    imageUrl: wiki('Dassault Super Mystère B2.jpg')
  },
  {
    id: 'f-8',
    name: 'F-8 Crusader',
    fullName: 'Vought F-8 Crusader',
    manufacturer: 'Vought',
    origin: 'US',
    introductionYear: 1957,
    description: 'Bekend als de "Last of the Gunfighters", de laatste US jager met kanonnen als primair wapen.',
    imageUrl: wiki('Vought F-8 Crusader 2.JPG')
  },
  {
    id: 'f-104',
    name: 'F-104 Starfighter',
    fullName: 'Lockheed F-104 Starfighter',
    manufacturer: 'Lockheed',
    origin: 'US',
    introductionYear: 1958,
    description: 'De "Missile with a Man in It", beroemd om zijn snelheid en slanke ontwerp.',
    imageUrl: wiki('Lockheed F-104 Starfighter.jpg')
  },
  {
    id: 'f-105',
    name: 'F-105 Thunderchief',
    fullName: 'Republic F-105 Thunderchief',
    manufacturer: 'Republic Aviation',
    origin: 'US',
    introductionYear: 1958,
    description: 'De "Thud", een massieve supersonische jachtbommenwerper die intensief werd gebruikt in Vietnam.',
    imageUrl: wiki('Republic F-105 Thunderchief - Vietnam War 1966.jpg')
  },
  {
    id: 'g-91',
    name: 'Fiat G.91',
    fullName: 'Fiat G.91',
    manufacturer: 'Fiat Aviazione',
    origin: 'Europe',
    introductionYear: 1958,
    description: 'De winnaar van de NAVO-competitie voor een lichte tactische jager.',
    imageUrl: wiki('FIAT G-91 PAN.jpg')
  },
  {
    id: 'lightning',
    name: 'EE Lightning',
    fullName: 'English Electric Lightning',
    manufacturer: 'English Electric',
    origin: 'Europe',
    introductionYear: 1959,
    description: 'Een iconische Britse interceptor met unieke verticaal gestapelde motoren.',
    imageUrl: wiki('English Electric Lightning F6, UK - Air Force AN1409778.jpg')
  },
  {
    id: 'f-106',
    name: 'F-106 Delta Dart',
    fullName: 'Convair F-106 Delta Dart',
    manufacturer: 'Convair',
    origin: 'US',
    introductionYear: 1959,
    description: 'Beschouwd als de ultieme interceptor van de USAF, met een zeer hoge topsnelheid.',
    imageUrl: wiki('F-106A_Chase_Dart.JPEG')
  },
  {
    id: 'f-4',
    name: 'F-4 Phantom II',
    fullName: 'McDonnell Douglas F-4 Phantom II',
    manufacturer: 'McDonnell Douglas',
    origin: 'US',
    introductionYear: 1960,
    description: 'Een legendarische multi-role jager die diende bij de Navy, Air Force en vele bondgenoten.',
    imageUrl: wiki('F-4D Phantom II.jpg')
  },
  {
    id: 'draken',
    name: 'Saab 35 Draken',
    fullName: 'Saab 35 Draken',
    manufacturer: 'Saab',
    origin: 'Europe',
    introductionYear: 1960,
    description: 'Een Zweeds meesterwerk met een dubbele delta-vleugel, gebouwd voor snelheid en wendbaarheid.',
    imageUrl: wiki('Saab 35 Draken.jpg')
  },
  {
    id: 'mirage-iii',
    name: 'Mirage III',
    fullName: 'Dassault Mirage III',
    manufacturer: 'Dassault',
    origin: 'Europe',
    introductionYear: 1961,
    description: 'Een van de meest succesvolle export-jagers ter wereld, symbool van de Franse luchtvaart.',
    imageUrl: wiki('Mirage III 6.JPEG')
  },
  {
    id: 'f-5',
    name: 'F-5 Freedom Fighter',
    fullName: 'Northrop F-5 Freedom Fighter',
    manufacturer: 'Northrop',
    origin: 'US',
    introductionYear: 1962,
    description: 'Een compacte, goedkope en zeer effectieve lichte jager voor internationale bondgenoten.',
    imageUrl: wiki('3039,_AFB_Volkel_(NL),_NF-5A_Freedom_Fighter,_Turkey,_Turkish_Stars_P1010236.jpg')
  },
  {
    id: 'f-111',
    name: 'F-111 Aardvark',
    fullName: 'General Dynamics F-111 Aardvark',
    manufacturer: 'General Dynamics',
    origin: 'US',
    introductionYear: 1967,
    description: 'De pionier van de zwenkvleugel-technologie en krachtige precisie-bombardementen.',
    imageUrl: wiki('AFR_F-111_air_to_air_refueling.jpg')
  },
  {
    id: 'harrier',
    name: 'Harrier',
    fullName: 'Hawker Siddeley Harrier',
    manufacturer: 'Hawker Siddeley',
    origin: 'Europe',
    introductionYear: 1969,
    description: 'De wereldberoemde "Jump Jet", in staat tot verticaal opstijgen en landen (VTOL).',
    imageUrl: wiki('Spanish_Hawker_Siddeley_AV-8S_Matador_in_flight_over_the_Mediterranean_Sea,_1_June_1988_(6430231).jpg')
  },
  {
    id: 'viggen',
    name: 'Saab 37 Viggen',
    fullName: 'Saab 37 Viggen',
    manufacturer: 'Saab',
    origin: 'Europe',
    introductionYear: 1971,
    description: 'Een krachtige Zweedse jager met canard-vleugels en een indrukwekkend STOL-vermogen.',
    imageUrl: wiki('Saab 37 Viggen 37301 001.jpg')
  },
  {
    id: 'mirage-f1',
    name: 'Mirage F1',
    fullName: 'Dassault Mirage F1',
    manufacturer: 'Dassault',
    origin: 'Europe',
    introductionYear: 1973,
    description: 'Een Franse jager die terugkeerde naar een conventionele pijlvleugel voor betere handling op lage snelheid.',
    imageUrl: wiki("French_Air_Force_Mirage_F1_returns_to_it's_mission_after_receiving_fuel_from_a_KC-10_Extender.jpg")
  },
  {
    id: 'f-14',
    name: 'F-14 Tomcat',
    fullName: 'Grumman F-14 Tomcat',
    manufacturer: 'Grumman',
    origin: 'US',
    introductionYear: 1974,
    description: 'De zware onderscheppingsjager van de Navy met zwenkvleugels, beroemd uit de film Top Gun.',
    imageUrl: wiki('Grumman F-14 Tomcat 2.JPG')
  },
  {
    id: 'f-15',
    name: 'F-15 Eagle',
    fullName: 'McDonnell Douglas F-15 Eagle',
    manufacturer: 'McDonnell Douglas',
    origin: 'US',
    introductionYear: 1976,
    description: 'Onbetwiste koning van het luchtruim met meer dan 100 overwinningen en 0 nederlagen in gevecht.',
    imageUrl: wiki('F-15C_Eagle_from_the_44th_Fighter_Squadron_flies_during_a_routine_training_exercise_April_15,_2019.jpg')
  },
  {
    id: 'f-16',
    name: 'F-16 Fighting Falcon',
    fullName: 'General Dynamics F-16 Fighting Falcon',
    manufacturer: 'General Dynamics',
    origin: 'US',
    introductionYear: 1978,
    description: 'De wendbare "Viper", nog steeds een van de meest gebruikte jagers ter wereld.',
    imageUrl: wiki('F-16 Fighting Falcon.jpg')
  },
  {
    id: 'etendard',
    name: 'Super Étendard',
    fullName: 'Dassault Super Étendard',
    manufacturer: 'Dassault',
    origin: 'Europe',
    introductionYear: 1978,
    description: 'Een Franse aanvalsjager voor vliegdekschepen, beroemd om zijn Exocet raketten.',
    imageUrl: wiki('Dassault Super Etendard, France - Air Force JP7619285.jpg')
  },
  {
    id: 'tornado',
    name: 'Panavia Tornado',
    fullName: 'Panavia Tornado IDS',
    manufacturer: 'Panavia',
    origin: 'Europe',
    introductionYear: 1979,
    description: 'Een gezamenlijk Europees project voor een zwenkvleugel aanvalsjager voor alle weersomstandigheden.',
    imageUrl: wiki('Panavia Tornado USAF.jpg')
  },
  {
    id: 'sea-harrier',
    name: 'Sea Harrier',
    fullName: 'BAE Sea Harrier',
    manufacturer: 'BAE Systems',
    origin: 'Europe',
    introductionYear: 1980,
    description: 'De marineversie van de Harrier, held van de Fokkerlandoorlog.',
    imageUrl: wiki('BAe Sea Harrier FA2.JPG')
  },
  {
    id: 'f-18',
    name: 'F/A-18 Hornet',
    fullName: 'McDonnell Douglas F/A-18 Hornet',
    manufacturer: 'McDonnell Douglas',
    origin: 'US',
    introductionYear: 1983,
    description: 'Een veelzijdige jager en aanvalsvliegtuig, ruggengraat van de moderne US Navy.',
    imageUrl: wiki('Swiss FA-18 Hornet.jpg')
  },
  {
    id: 'f-117',
    name: 'F-117 Nighthawk',
    fullName: 'Lockheed F-117 Nighthawk',
    manufacturer: 'Lockheed',
    origin: 'US',
    introductionYear: 1983,
    description: 'De eerste operationele stealth-jager ter wereld, ontworpen om onzichtbaar te blijven voor radar.',
    imageUrl: wiki('Lockheed F-117A Nighthawk USAF.jpg')
  },
  {
    id: 'mirage-2000',
    name: 'Mirage 2000',
    fullName: 'Dassault Mirage 2000',
    manufacturer: 'Dassault',
    origin: 'Europe',
    introductionYear: 1984,
    description: 'Een hoogtechnologische opvolger van de Mirage III met uitstekende klimprestaties.',
    imageUrl: wiki('Dassault Mirage 2000.jpg')
  },
  {
    id: 'amx',
    name: 'AMX',
    fullName: 'AMX International AMX',
    manufacturer: 'AMX International',
    origin: 'Europe',
    introductionYear: 1989,
    description: 'Een gezamenlijk Italiaans-Braziliaans project voor grondsteun en verkenning.',
    imageUrl: wiki('Alenia-Aermacchi-Embraer_AMX,_Italy_-_Air_Force_JP7721735.jpg')
  },
  {
    id: 'gripen',
    name: 'JAS 39 Gripen',
    fullName: 'Saab JAS 39 Gripen',
    manufacturer: 'Saab',
    origin: 'Europe',
    introductionYear: 1996,
    description: 'Een ultra-modern, multifunctioneel gevechtsvliegtuig uit Zweden.',
    imageUrl: wiki('Saab JAS 39 Gripen 39-2 002.jpg')
  },
  {
    id: 'super-hornet',
    name: 'F/A-18E Super Hornet',
    fullName: 'Boeing F/A-18E/F Super Hornet',
    manufacturer: 'Boeing',
    origin: 'US',
    introductionYear: 1999,
    description: 'Een aanzienlijk grotere en modernere versie van de oorspronkelijke Hornet.',
    imageUrl: wiki('McDonnell Douglas FA-18F Super Hornet.jpg')
  },
  {
    id: 'rafale',
    name: 'Dassault Rafale',
    fullName: 'Dassault Rafale',
    manufacturer: 'Dassault',
    origin: 'Europe',
    introductionYear: 2001,
    description: 'De omnirole-jager van Frankrijk, in staat tot nagenoeg elke gevechtsmissie.',
    imageUrl: wiki('Rafale_-_RIAT_2009_(3751416421).jpg')
  },
  {
    id: 'typhoon',
    name: 'Eurofighter Typhoon',
    fullName: 'Eurofighter Typhoon',
    manufacturer: 'Eurofighter GmbH',
    origin: 'Europe',
    introductionYear: 2003,
    description: 'Een zeer wendbare multi-role jager, ontwikkeld door vier Europese naties.',
    imageUrl: wiki('RAF Eurofighter Typhoon.jpg')
  },
  {
    id: 'f-22',
    name: 'F-22 Raptor',
    fullName: 'Lockheed Martin F-22 Raptor',
    manufacturer: 'Lockheed Martin',
    origin: 'US',
    introductionYear: 2005,
    description: 'De eerste vijfde-generatie jager, onverslaanbaar in stealth en luchtmanoeuvrabiliteit.',
    imageUrl: wiki('Lockheed Martin F-22.jpg')
  },
  {
    id: 'f-35',
    name: 'F-35 Lightning II',
    fullName: 'Lockheed Martin F-35 Lightning II',
    manufacturer: 'Lockheed Martin',
    origin: 'US',
    introductionYear: 2015,
    description: 'De modernste multi-role stealth-jager, ontworpen om de ruggengraat van vele luchtmachten te worden.',
    imageUrl: wiki('F-35 Lightning II.jpg')
  }
].sort((a, b) => a.introductionYear - b.introductionYear) as Jet[];
