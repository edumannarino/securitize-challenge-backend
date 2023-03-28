export interface IRatesService {
  getRates(): Promise<Rate>;
}

export type Rate = {
  ethereum: {
    usd: number,
    eur: number
  }
}

export const COINGECKO_API = 'CoinGeckoAPI'
