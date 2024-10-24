const exchangeRates = {
    "USD": {
        "EUR": 0.85,
        "GBP": 0.75,
        "MXN": 18.50
    },
    "EUR": {
        "USD": 1.18,
        "GBP": 0.88,
        "MXN": 21.75
    },
    "GBP": {
        "USD": 1.33,
        "EUR": 1.14,
        "MXN": 25.00
    },
    "MXN": {
        "USD": 0.054,
        "EUR": 0.046,
        "GBP": 0.040
    }
};

// Mostrar tasas de cambio en la pantalla
function displayExchangeRates() {
    const exchangeRatesList = document.getElementById('exchangeRates');
    for (const fromCurrency in exchangeRates) {
        for (const toCurrency in exchangeRates[fromCurrency]) {
            const listItem = document.createElement('li');
            listItem.textContent = `1 ${fromCurrency} = ${exchangeRates[fromCurrency][toCurrency]} ${toCurrency}`;
            exchangeRatesList.appendChild(listItem);
        }
    }
}

// Convertir divisa
function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
    const resultDiv = document.getElementById('result');

    if (fromCurrency === toCurrency) {
        resultDiv.textContent = `La conversión no es necesaria. 1 ${fromCurrency} = 1 ${toCurrency}.`;
        return;
    }

    const rate = exchangeRates[fromCurrency][toCurrency];
    const result = amount * rate;
    resultDiv.textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
}

// Llamar a la función para mostrar las tasas de cambio al cargar la página
window.onload = function () {
    displayExchangeRates();
};