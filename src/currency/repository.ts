import { CurrencyPrice } from "./types";

class CurrencyStore {
    private store: Map<string, Map<string, CurrencyPrice>>;

    constructor() {
        this.store = new Map();
    }

    addCurrencyPrice(currencyPrice: CurrencyPrice) {
        let currencyData = this.store.get(currencyPrice.date);
        if (!currencyData) {
            currencyData = new Map();
            this.store.set(currencyPrice.date, currencyData);
        }
        currencyData.set(currencyPrice.currency, currencyPrice);
    }

    getCurrencyPrice(currency: string, date: string): CurrencyPrice | undefined {
        if (currency === "PLN") {
            return {
                currency: "PLN",
                price_pln: "1",
                date: date
            };
        }
        const currencyData = this.store.get(date);
        return currencyData ? currencyData.get(currency) : undefined;
    }

    flush() {
        this.store.clear();
    }

    getCurrencies(): CurrencyPrice[] {
        const currencies = Array.from(this.store.values()).flatMap(dateMap => Array.from(dateMap.values()));
        return currencies.sort((a, b) => a.currency.localeCompare(b.currency));
    }
}

export const currencyStore = new CurrencyStore();
