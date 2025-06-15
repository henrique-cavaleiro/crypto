# crypto

## Gemaakt door
Henrique Cavaleiro – 6DATA

## Beschrijving
Deze app toont een Hello World van frontend en backend én de realtime prijs van Bitcoin (BTC/USD) via de Coinbase API.

## Technologieën
- Frontend: React.js
- Backend: Express.js + Node.js
- Database: PostgreSQL (voor uitbreiding)
- Docker & Docker Compose

## Installatie
1. Clone deze repository: https://github.com/henrique-cavaleiro/crypto.git
2. Pas IP addressen aan.
3. Pas folder structuur aan.
4. ga naar de back/front-end directory en doe `npm install`
5. cd backend && docker compose up -d --build
6. cd ../frontend && docker compose up -d --build
7. cd ../database && docker compose up -d
## Structuur

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
        │   │   └── examen.js
        │   ├── App.css
        │   ├── App.js
        │   ├── App.test.js
        │   ├── index.css
        │   ├── index.js
        │   ├── logo.svg
        │   ├── reportWebVitals.js
        │   └── setupTests.js
        ├── Dockerfile
        ├── READ.ME
        ├── package.json
        └── package-lock.json

```
