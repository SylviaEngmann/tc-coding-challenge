import React , { useEffect, useState } from 'react';
import './App.css';
import { Card, Button} from 'react-bootstrap';

const URL = "127.0.0.1:5000"

const cardStyling = {
  backgroundColor: "white",
  color: "black",
  border: "5px solid black",
  borderRadius: "2px",
  width: "50rem",
  height: "150px",
  margin: "10px"
}

const buttonStyling = {
  backgroundColor: "grey",
  width: "10rem",
}

const App = () => {
  let [baseCurrencies, setBaseCurrencies] = useState([]);
  let [targetCurrencies, setTargetCurrencies] = useState([]);
  //let [selectedBase]
  let [exchangeRate, setExchangeRate] = useState({})
  let [amountToConvert, setAmountToConvert] = useState([]);

  useEffect(() => {
    //getBaseCurrency();
    //getTargetCurrency();
  }, []);

   async function getBaseCurrency () {
    try {
      let response = await fetch(`${URL}/base`);
      if (response.ok) {
        let base =  await response.json();
        setBaseCurrencies(base);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

   async function getTargetCurrency() {
    try {
      let response = fetch(`${URL}/target`);
      if (response.ok) {
        let target =  response.json();
        setTargetCurrencies(target);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

  async function getExchangeRate (baseCurrency, targetCurrency) {
    try {
      let response = await fetch(`${URL}/xrate`);
      if (response.ok) {
        let exchangerate =  await response.json();
        setExchangeRate(exchangerate);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Network error: ${err.message}`);
    }
  }

   function convertAmount() {
     //getExchangeRate(baseCurrency, targetCurrency);
     convertedAmount(exchangeRate, amountToConvert)
  }
  let convertedAmount = (exchangeRate, amount ) => {return exchangeRate * amount }

  const selectBaseValues = baseCurrencies.map((e) => 
   <option key={e.id}>{e.symbol}</option>
  )

  const selectTargetValues = targetCurrencies.map((e) => 
   <option key={e}>{e}</option>
  )
  return (
    <div className="App">
      <h2>Crypto Currency Converter</h2>
      <Card style={cardStyling}>
        <p>Select the Base Currency</p>
        <select>{selectBaseValues}</select>
        
      </Card>

      <Card style={cardStyling}>
        <p>Select the Target Currency</p>
        <select>{selectTargetValues}</select>
      </Card>

      <Card style={cardStyling}>
        <p>How much do you want to convert?</p>
        <input type="number"/>

        <Button style={buttonStyling} onClick="convertAmount()"> Convert </Button>
      </Card>

      <Card>Converted Amount is {}</Card>
    </div>
  );
}

export default App;
