import { ICurrency } from "core/types";

export function getCurrenyLabel(
    chargeCurrencyId: number,
    chargeCurrencyAmount: number,
    currencies: ICurrency[],
) {
    const targetCurrency = currencies.find(
        (currency) => currency.id === chargeCurrencyId,
    );
    return `${chargeCurrencyAmount} ${targetCurrency?.code}`;
}
