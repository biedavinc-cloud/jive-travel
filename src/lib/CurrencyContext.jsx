import React, { createContext, useContext, useState } from "react";
import { CURRENCIES } from "@/lib/currencies";

const CurrencyContext = createContext({ currency: "USD", setCurrency: () => {}, list: CURRENCIES });

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("USD");
  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, list: CURRENCIES }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}