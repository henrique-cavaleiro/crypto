# **Gebruikershandleiding - Cryptoportfolio Manager**

## 1. **Beschrijving**

Deze applicatie toont een **Hello World** van zowel de frontend als de backend en geeft de **realtime prijs van Bitcoin (BTC) en andere Crypto coins(ETH,DOGE)** via de **Coinbase API**. De applicatie maakt gebruik van **React.js** voor de frontend, **Express.js** voor de backend, en **PostgreSQL**. Het project draait binnen **Docker**-containers met behulp van **Docker Compose**.

## 2. **Technologieën**

* **Frontend**: React.js
* **Backend**: Express.js + Node.js
* **Database**: PostgreSQL (voor uitbreiding)
* **Docker & Docker Compose** voor containerisatie en netwerkbeheer
* **Macvlan** voor de ip addressen te verdelen (Optioneel)

## 3. **Installatie**

Volg de onderstaande stappen om de applicatie lokaal te draaien.

### Benodigdheden:

* **Docker** en **Docker Compose** moeten geïnstalleerd zijn op je machine.

  * [Installatie-instructies voor Docker](https://docs.docker.com/get-docker/)
  * [Installatie-instructies voor Docker Compose](https://docs.docker.com/compose/install/)

### Stap 1: Clone de repository

```bash
git clone https://github.com/henrique-cavaleiro/crypto.git
cd crypto
```

### Stap 2: Pas IP-adressen en mappen aan

* Pas de IP-adressen aan in de configuratiebestanden, indien nodig.
* Pas de mapstructuur aan in je `docker-compose.yml` bestanden volgens de standaard structuur of je eigen vereisten.

### Stap 3: Installeer afhankelijkheden

* Ga naar de backend- en frontend-mappen en installeer de Node.js-afhankelijkheden:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### Stap 4: Start de Docker containers

* **Backend en database container**:

```bash
cd ../express-docker
docker-compose up -d --build
```

* **Frontend container**:

```bash
cd ../react-docker
docker-compose up -d --build
```

* **Database container (indien van toepassing)**:

```bash
cd ../postgresql
docker-compose up -d
```

### Stap 5: Controleer de werking van de applicatie

* **Frontend**: Open de browser en ga naar [http://IP-FRONTEND:3000](http://IP-FRONTEND:3000) om de applicatie te zien.
* **Backend API**:

  * **Hello World route**: [http://IP-BACKEND:3500/api/hello](http://IP-BACKEND:3500/api/hello)
  * **Realtime BTC prijs**: [http://IP-BACKEND:3500/api/btc](http://IP-BACKEND:3500/api/btc)
  * **Realtime crypto prijzen**: [http://IP-BACKEND:3500/api/prices](http://IP-BACKEND:3500/api/prices)
  * **geschiedenis crypto prijzen**: [http://IP-BACKEND:3500/api/history](http://IP-BACKEND:3500/api/history)

## 4. **Structuur van de Applicatie**

De structuur van het project is als volgt:

```bash
crypto/
├── README.md
├── .gitignore
├── config/
│   ├── express-docker/
│   │   └── docker-compose.yml
│   ├── postgresql/
│   │   └── docker-compose.yml
│   └── react-docker/
│       └── docker-compose.yml
├── express-docker/
│   ├── src/
│   │   ├── cryptoAPI.js
│   │   └── db.js
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
└── react-docker/
    └── frontend/
        ├── public/
        │   ├── favicon.ico
        │   ├── index.html
        │   ├── logo192.png
        │   ├── logo512.png
        │   ├── manifest.json
        │   └── robots.txt
        ├── src/
        │   ├── components/
        │   │   ├── CryptoChart.js
        │   │   ├── Portfolio.js
        │   │   └── examen-voorbereiding.js
        │   ├── App.css
        │   ├── App.js
        │   ├── App.test.js
        │   ├── index.css
        │   ├── index.js
        │   ├── logo.svg
        │   ├── reportWebVitals.js
        │   └── setupTests.js
        ├── Dockerfile
        ├── README.md
        ├── package.json
        └── package-lock.json
```

## 5. **Voor wie is de applicatie bedoeld?**

Deze applicatie is bedoeld voor:

* **Crypto-investeerders** die de prijs van Bitcoin willen volgen in realtime.
* **Webontwikkelaars** die willen leren werken met **React.js**, **Express.js**, en **Docker**.
* **Studenten** die hun kennis van **webtechnologieën** en **blockchain** willen vergroten.

---
