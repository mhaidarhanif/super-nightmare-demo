# Nightmare.js Test

This demo E2E test is for stable [Ghost] version.

## Setup

**Ghost Instance**

- Download Ghost then setup its `config.js`
- `npm install --production`
- `npm start --production`
- Check <http://localhost:2368/ghost>

**This Testing Suite**

- `npm install`
- `npm install -g nodemon mocha`

## Testing

- `npm test` = Run unit tests with Mocha for `src`, unusued for now
- `npm run test:unit` = Run unit tests with Mocha for `tests/unit`, unusued for now
- `npm run test:e2e` = Run E2E test with Nightmare, Mocha, and Chai for `tests/e2e`
