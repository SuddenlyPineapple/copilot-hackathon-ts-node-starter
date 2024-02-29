import express, { Request, Response } from 'express';
const router = express.Router();

interface CurrencyExchangeRequest {
    from_currency: string;
    to_currency: string;
    amount: number;
    date: string;
}

interface CurrencyExchangeResponse {
    currency: string;
    value: number;
    date: string;
}

interface CurrencyPrice {
    currency: string;
    price_pln: string;
    date: string;
}

interface CurrencyPriceRequest {
    currencies: CurrencyPrice[];
}

interface CurrencyPriceResponse {
    currencies: CurrencyPrice[];
}

router.post('/currencyExchange', (req: Request, res: Response<CurrencyExchangeResponse | { message: string, error: true }>) => {
    const { from_currency, to_currency, amount, date }: CurrencyExchangeRequest = req.body;

    // This is a placeholder. Replace this with your actual function to get the exchange rate.
    const getExchangeRate = (fromCurrency: string, toCurrency: string, date: string) => {
        // Return the exchange rate for the given currencies and date.
        // If the exchange rate is not found, return null.
        return null;
    };

    const exchangeRate = getExchangeRate(from_currency, to_currency, date);

    if (exchangeRate === null) {
        res.status(404).send({ error: true, message: 'Exchange rate for the given date is not available' });
        return;
    }

    const value = amount * exchangeRate;

    res.send({
        currency: to_currency,
        value: value,
        date: date
    });
});

router.post('/currency', (req: Request, res: Response) => {
    const { currencies }: CurrencyPriceRequest = req.body;

    currencies.forEach(({ currency, price_pln, date }) => {
        // This is a placeholder. Replace this with your actual function to save the currency data.
        const saveCurrencyData = (currency: string, pricePln: string, date: string) => {
            // Save the currency data to your database or another storage system.
        };

        saveCurrencyData(currency, price_pln, date);
    });

    res.send({ message: 'Currency data has been successfully saved.' });
});

router.get('/currency', (req: Request, res: Response) => {
    // This is a placeholder. Replace this with your actual function to fetch the currency data.
    const fetchCurrencyData = (): CurrencyPrice[] => {
        // Fetch the currency data from your database or another storage system.
        // Return the data as an array of CurrencyPrice objects.
        return [];
    };

    const currencies = fetchCurrencyData();

    const response: CurrencyPriceResponse = {
        currencies: currencies
    };

    res.send(response);
});

export default router;
