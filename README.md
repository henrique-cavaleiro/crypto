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
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── src/
│       ├── App.js
│       └── components/
│           ├── Portfolio.js
│           └── Examen.js
├── backend/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── package.json
│   ├── package-lock.json
│   ├── .env
│   └── server.js
└── database/
    └── docker-compose.yml
```
