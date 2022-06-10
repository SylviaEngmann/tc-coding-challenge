const express = require('express')
const router = express.Router();
const bodyParser = require("body-parser")
const fetch = require("node-fetch")

const URL = "https://api.coingecko.com/api/v3/"

router.use(bodyParser.json());

router.get("/", (req, res) => {
  res.send({message: 'Welcome to the Traders central api server.'});
})

//get base currencies
router.get("/base", async (req, res) => {
  try {
    const result = await fetch(`${URL}coins/list?include_platform=false`);
    const baseCurrencies = await result.json();
    
    res.send(baseCurrencies);
} catch (err) {
  res.status(400).send({ message: err.message });
}
});

//get target currencies
router.get("/target", async (req, res) => {
  try {
    const result = await fetch(`${URL}simple/supported_vs_currencies`);
    const targetCurrencies = await result.json();

    res.send(targetCurrencies);
  }
  catch (err) {
    res.status(400).send({ message: err.message });
  }
});

//get exchange rate
router.get("/xrate", async (req, res) => {
  const { baseCurrency, targetCurrency } = req
  try {
    const result = await fetch(`${URL}simple/price?ids=${baseCurrency}&vs
    _currencies=${targetCurrency}`)
    const exchangeRate = await result.json();

    res.send(exchangeRate)
  } catch (err) {
    res.status(400).send({ message: err.message })
  }
  
})

module.exports = router;