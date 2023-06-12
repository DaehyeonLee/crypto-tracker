import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
const Chart = ({ coinId }: ChartProps) => {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  console.log(data);
  return (
    <div>
      {isLoading ? (
        "Loading... Chart"
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => Number(price.close)) as number[],
            },
          ]}
          options={{
            grid: { show: false },
            theme: { mode: "dark" },
            chart: { height: 300, width: 500, background: "transparent" },
            stroke: { curve: "smooth", width: 3 },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toUTCString()
              ),
              type: "datetime",
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              colors: ["#0fbcf9"],
            },
            tooltip: { y: { formatter: (value) => `$ ${value.toFixed(3)}` } },
          }}
        ></ApexChart>
      )}
    </div>
  );
};
export default Chart;
