import { getConfig } from "../utils/config";
import { showMetrics } from "../utils/format";
import { DCAImproved } from "../strategies/DCA_improved";
import { formateData, getData } from "../utils/data";

// Load the existing configuration
const config = await getConfig();

// Fetch data based on the configuration
const jsonItem = await getData({
  token: config.token,
  startDate: new Date(config.start_date),
  endDate: new Date(config.end_date),
});
const data = formateData(jsonItem, config.interval);

// Run the DCA Improved strategy
const { config: updatedConfig } = await DCAImproved({ config, data });

// Log the metrics
showMetrics({
  config: updatedConfig,
  data,
  endDate: new Date(data[data.length - 1].timestamp),
  startDate: new Date(data[0].timestamp),
});
