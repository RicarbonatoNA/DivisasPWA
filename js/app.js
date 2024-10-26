// Cargar tasas de cambio desde localStorage o establecer valores predeterminados
const exchangeRates = JSON.parse(localStorage.getItem('exchangeRates')) || {
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

// Función para mostrar las tasas de cambio en la lista de monedas
function displayExchangeRates() {
    const currencyTable = document.getElementById('currencyTable');
    currencyTable.innerHTML = ''; // Limpiar lista antes de renderizar
    for (const fromCurrency in exchangeRates) {
        for (const toCurrency in exchangeRates[fromCurrency]) {
            const listItem = document.createElement('li');
            listItem.textContent = `1 ${fromCurrency} = ${exchangeRates[fromCurrency][toCurrency]} ${toCurrency}`;
            currencyTable.appendChild(listItem);
        }
    }
}

// Actualizar selectores de monedas en convert.html
function updateCurrencySelectors() {
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');

    // Limpiar los selectores antes de agregar opciones
    fromCurrencySelect.innerHTML = '';
    toCurrencySelect.innerHTML = '';

    for (const currency in exchangeRates) {
        const optionFrom = document.createElement('option');
        const optionTo = document.createElement('option');

        optionFrom.value = currency;
        optionFrom.textContent = currency;

        optionTo.value = currency;
        optionTo.textContent = currency;

        fromCurrencySelect.appendChild(optionFrom);
        toCurrencySelect.appendChild(optionTo);
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

// Guardar tasas de cambio en localStorage
function saveExchangeRates() {
    localStorage.setItem('exchangeRates', JSON.stringify(exchangeRates));
}

// Agregar nueva moneda
function addCurrency() {
    const newCurrency = document.getElementById('newCurrency').value.toUpperCase();
    const rateToUSD = parseFloat(document.getElementById('rateToUSD').value);
    const rateToEUR = parseFloat(document.getElementById('rateToEUR').value);
    const rateToGBP = parseFloat(document.getElementById('rateToGBP').value);

    if (!newCurrency || isNaN(rateToUSD) || isNaN(rateToEUR) || isNaN(rateToGBP)) {
        alert('Por favor, completa todos los campos correctamente.');
        return;
    }

    // Verificar si la moneda ya existe
    if (exchangeRates[newCurrency]) {
        alert('La moneda ya existe. Por favor, elige otra.');
        return;
    }

    // Agregar nueva moneda al objeto exchangeRates
    exchangeRates[newCurrency] = {
        "USD": rateToUSD,
        "EUR": rateToEUR,
        "GBP": rateToGBP
    };

    // Actualizar tasas inversas en otras monedas
    exchangeRates["USD"][newCurrency] = 1 / rateToUSD;
    exchangeRates["EUR"][newCurrency] = 1 / rateToEUR;
    exchangeRates["GBP"][newCurrency] = 1 / rateToGBP;

    saveExchangeRates(); // Guardar tasas en localStorage
    displayExchangeRates(); // Refrescar la lista de monedas
    updateCurrencySelectors(); // Refrescar los selectores en convert.html
    alert(`Moneda ${newCurrency} agregada exitosamente.`);
}

// Eliminar moneda existente
function deleteCurrency() {
    const deleteCurrency = document.getElementById('deleteCurrency').value.toUpperCase();

    // Verificar que la moneda a eliminar exista
    if (!deleteCurrency || !(deleteCurrency in exchangeRates)) {
        alert('Moneda no encontrada.');
        return;
    }

    // Eliminar la moneda del objeto exchangeRates
    delete exchangeRates[deleteCurrency];

    // Eliminar las tasas inversas en las demás monedas
    for (let currency in exchangeRates) {
        if (exchangeRates[currency][deleteCurrency]) {
            delete exchangeRates[currency][deleteCurrency];
        }
    }

    saveExchangeRates(); // Guardar tasas en localStorage
    displayExchangeRates(); // Refrescar la lista de monedas
    updateCurrencySelectors(); // Refrescar los selectores en convert.html
    alert(`Moneda ${deleteCurrency} eliminada exitosamente.`);
}




// Llamar a la función para mostrar las tasas de cambio al cargar la página
window.onload = function () {
    displayExchangeRates();
    updateCurrencySelectors(); // Cargar selectores al iniciar la página
};
