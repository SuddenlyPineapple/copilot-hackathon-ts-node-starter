import { currencyStore } from "./repository";

export const getExchangeRate = (fromCurrency: string, toCurrency: string, date: string) => {
    const fromCurrencyPrice =  currencyStore.getCurrencyPrice(fromCurrency, date);
    const toCurrencyPrice = currencyStore.getCurrencyPrice(toCurrency, date);
    return fromCurrencyPrice && toCurrencyPrice ? +fromCurrencyPrice.price_pln / +toCurrencyPrice.price_pln : null;
};
