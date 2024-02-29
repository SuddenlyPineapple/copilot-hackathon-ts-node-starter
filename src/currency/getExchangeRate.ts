import { currencyStore } from "./repository";

export const getExchangeRate = (fromCurrency: string, toCurrency: string, date: string) => {
    const fromCurrencyPrice =  currencyStore.getCurrencyPrice(fromCurrency, date);
    const toCurrencyPrice = currencyStore.getCurrencyPrice(toCurrency, date);
    return fromCurrencyPrice && toCurrencyPrice ? +toCurrencyPrice.price_pln * +fromCurrencyPrice.price_pln : null;
};
