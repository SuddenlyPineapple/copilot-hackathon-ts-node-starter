import { currencyStore } from './repository';
import { getExchangeRate } from "./getExchangeRate";

jest.mock('./repository', () => ({
    currencyStore: {
        getCurrencyPrice: jest.fn(),
    },
}));

describe('getExchangeRate', () => {
    it('should return the exchange rate', () => {
        (currencyStore.getCurrencyPrice as jest.Mock).mockImplementation((currency: string, date: string) => {
            if (currency === 'USD') return { price_pln: '2' };
            return { price_pln: '4' };
        });

        const result = getExchangeRate('USD', 'EUR', '2022-01-01');
        expect(result).toEqual(0.5);
    });
});
