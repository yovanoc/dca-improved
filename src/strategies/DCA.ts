import { buy, deposit } from "../transaction";
import type { Config, Data } from "../types";

export async function DCA({ config, data }: { config: Config; data: Data[] }) {
  for (const d of data) {
    if (!d.useInStrategy) {
      continue;
    }

    const date = new Date(d.timestamp);
    deposit({
      amountUSD: config.DCA_Value,
      date,
      transactions: config.transactions,
    });
    buy({ amountUSD: config.DCA_Value, price: d.close, date, config });
  }

  return {
    config,
    data,
  };
}
