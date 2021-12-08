This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Objasnjenje

Firebase nudi pomoc za prijavu preko raznih drustvenih mreza. Nije mi funkcionirao facebook login bez firebase-a kao posrednika.
Firebase takoder nudi besplatno 1GiB NoSQL bazu podataka, pa sam nju iskoristio za pohranu korisnickih podataka.
Aplikacija se moze pokrenuti u dev modu ovako:
  1. instalirati npm
  2. pokrenuti `npm install` sto ce instalirati sve _dependencije_ 
  3. u root direktoriju pokrenuti `npm start`
To ce otvoriti aplikaciju u default browseru. Ja sam radio u Google Chrome.

Moguce je pregledavati podatke o filmovima dohvacenih s https://www.themoviedb.org/ i recenzije filmova dohvacene s https://developer.nytimes.com/.
Potrebno je unijeti neki search string.

Ti podaci se mogu dohvacati samo po 20 komada odjednom (ograniceno od strane API-a). 

Mogao bih spajati rezenzije s filmovima samo preko naslova filma jer recenzije ne pruzaju nikakav drugi kljuc. 
Nisam uspio osmisliti kako iskoristiti ove podatke pa ih nisam niti spremao u bazu, dakle samo se dohvacaju s API-a i prikazuju na klijentu.

U `src/components/app/App.js` je vecinom ponasanje UI-a.


U `src/service/nyt-api.js` i `src/service/tmdb_api.js` je logika za dohvacanje podataka sa 2 API-a. Zanemarite omdb_api.

U `src/config/firebase-config.js` je konfiguracija za komuniciranje s Firebase-om.

U `src/config/authMethods.js` je konfiguracija za autentifikaciju preko Facebook Logina.

U `src/config/firebase-config.js` je konfiguracija za komuniciranje s Firebase-om.

