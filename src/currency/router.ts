import express, { Request, Response } from 'express';
import {
    CurrencyExchangeRequest,
    CurrencyExchangeResponse,
    CurrencyPriceRequest,
    CurrencyPriceResponse
} from "./types";
import { currencyStore } from "./repository";
import { getExchangeRate } from "./getExchangeRate";
const router = express.Router();


router.post('/currencyExchange', (req: Request, res: Response<CurrencyExchangeResponse | { message: string, error: true }>) => {
    const { from_currency, to_currency, amount, date }: CurrencyExchangeRequest = req.body;

    const exchangeRate = getExchangeRate(from_currency, to_currency, date);

    if (exchangeRate === null) {
        res.status(404).send({ error: true, message: 'Exchange rate for the given date is not available' });
        return;
    }

    const value = +amount * exchangeRate;

    res.send({
        currency: to_currency,
        value: value,
        date: date
    });
});

router.post('/currency', (req: Request, res: Response) => {
    const { currencies }: CurrencyPriceRequest = req.body;
    currencies.forEach((currency) => {
        currencyStore.addCurrencyPrice(currency);
    });

    res.status(201).send({ message: 'Currency data has been successfully saved.' });
});

router.get('/currency', (req: Request, res: Response) => {
    const currencies = currencyStore.getCurrencies();

    const response: CurrencyPriceResponse = {
        currencies: currencies
    };

    res.send(response);
});

router.post('/currencyFlush', (req: Request, res: Response) => {
    currencyStore.flush();

    res.send({ message: 'Currency store has been successfully flushed.' });
});

export default router;
