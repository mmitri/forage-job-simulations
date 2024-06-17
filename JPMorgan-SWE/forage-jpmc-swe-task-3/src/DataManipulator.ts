import { ServerRespond } from './DataStreamer';

export interface Row {
  timestamp: Date,
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
  price_abc: number,
  price_def: number,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row{
    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    const ratio = priceABC/priceDEF;
    const upperBound = 1 + 0.1;
    const lowerBound = 1 - 0.1;
    return {
      price_abc: priceABC,
      price_def: priceDEF,
      lower_bound: lowerBound,
      upper_bound: upperBound,
      ratio,
      timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp,
      trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio: undefined,
    };
  }
}
