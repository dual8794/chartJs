import { useEffect, useMemo, useRef, useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  //   InteractionItem,
} from "chart.js/auto"; // no need to register if ech elemnt if we use chart.js/auto in import
import {
  Chart,
  //   getDatasetAtEvent,
  //   getElementAtEvent,
  //   getElementsAtEvent,
} from "react-chartjs-2";
import axios from "axios";
import { Group, Select } from "@mantine/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

export const options = {
  responsive: true,
  scales: {
    y: {
      position: "right",

      grid: {
        display: false,
      },
    },
    y1: {
      grid: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
      display: true,
    },
    title: {
      display: true,
      text: "Transactions growth over time",
    },
    tooltip: {
      bodyFont: {
        weight: "italic",
      },
    },
  },
};

export default function MultitypeChart() {
  const chartRef = useRef<ChartJS>(null);

  const [selectedChoice, setSelectedChoice] = useState<any>("أرض+تجاري");
  const [selectedNighborhood] = useState("السليمانية");
  const [selectedProvince] = useState("الرياض");
  const [selectedIndicator, setSelectedIndicator] = useState("yearly");
  const [growthType, setGrowthType] = useState("annual+growth");
  const [measureType, setMeasureType] = useState<any>("total_transactions");

  const queryClient = useQueryClient();

  //   function getMetricsDetails(indicator: string) {
  //     return useQuery(["metrics", indicator], async () => {
  //       const { data } = await axios.get(
  //         `http://127.0.0.1:8000/api/metricsdetailed?indicator=${indicator}`
  //       );
  //       return data;
  //     });
  //   }

  function getMetricsDetails(
    indicator: string,
    metricType: string,
    neighborhood: string,
    province: string
  ) {
    return useQuery(
      ["metrics", indicator, metricType, neighborhood, province],
      async () => {
        const { data } = await axios.get(
          `https://misbar-backend-chartjs.azurewebsites.net/api/metricsdetailed?indicator=${indicator}&metrics_type=${metricType}&province_aname=${province}&neighborh_aname=${neighborhood}`
        );
        return data;
      },
      { refetchOnWindowFocus: false }
    );
  }

  const { data } = getMetricsDetails(
    selectedIndicator,
    selectedChoice,
    selectedNighborhood,
    selectedProvince
  );

  const { data: data2 } = getMetricsDetails(
    growthType,
    selectedChoice,
    selectedNighborhood,
    selectedProvince
  );

  const PPM = data?.reduce(
    (metrics: any, { total_transactions, volume }: any) => {
      if (measureType == "total_transactions") {
        metrics.push(total_transactions);
      } else if (measureType == "volume") {
        metrics.push(volume);
      }
      return metrics;
    },
    []
  );

  const labels = data?.reduce((metrics: any, { metrics_batch_date }: any) => {
    if (selectedIndicator == "yearly") {
      metrics.push(metrics_batch_date.split("-")[0]);
    } else {
      metrics.push(metrics_batch_date);
    }
    return metrics;
  }, []);

  const PPM2 = data2?.reduce(
    (metrics2: any, { total_transactions, volume }: any) => {
      if (measureType == "total_transactions") {
        metrics2.push(total_transactions);
      } else if (measureType == "volume") {
        metrics2.push(volume);
      }
      return metrics2;
    },
    []
  );

  const choicesArray = [
    { label: "أرض تجاري", value: "أرض+تجاري" },
    { label: "أرض سكني", value: "أرض+سكني" },
    { label: "أرض تجاري سكني", value: "أرض+تجاري+سكني" },
    { label: "شقق", value: "شقق" },
    { label: "فلل", value: "فلل" },
    { label: "مبنى تجاري", value: "مبنى+تجاري" },
    { label: "مبنى تجاري سكني", value: "مبنى+تجاري+سكني" },
    { label: "مرافق", value: "مرافق" },
    { label: "الكل", value: "الكل" },
  ];

  //   useEffect(() => {
  //     console.log("1", PPM);
  //     //   console.log(labels);
  //   }, [data]);

  //   useEffect(() => {
  //     console.log("2", data2);
  //   }, [data2]);

  useEffect(() => {
    console.log(PPM);
    console.log(PPM2);
  }, [data, data2]);

  const [dataset, setDataset] = useState<any>();

  useEffect(() => {
    if (selectedIndicator == "yearly") {
      setGrowthType("annual+growth");
    } else if (selectedIndicator == "quarterly") {
      setGrowthType("QoQ");
    }
    console.log("helllooo");

    setDataset({
      labels: labels,
      datasets: [
        {
          type: "line" as const,
          label: "Growth",
          backgroundColor: "#C6D936",
          borderColor: "#C6D936",
          borderWidth: 2,
          fill: false,
          data: PPM2,
          yAxisID: "y",
        },
        {
          type: "bar" as const,
          label: measureType,
          backgroundColor: "#37BADB",
          borderWidth: 0,
          borderRadius: 10,
          data: PPM,
          borderColor: "#37BADB",
          fill: false,

          yAxisID: "y1",
        },
      ],
      scales: {
        y: {
          type: "linear" as const,
          position: "left" as const,
          display: true,

          grid: {
            display: false,
          },
        },
        y1: {
          type: "bar" as const,
          position: "right" as const,
          display: true,

          grid: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    });
  }, [data, data2]);

  return (
    <>
      <Group>
        <Select
          label="Choose metrics type"
          placeholder="pick a metric type"
          defaultValue={selectedChoice}
          data={choicesArray}
          onChange={(value: any | null) => {
            setSelectedChoice(value);
            console.log("value:", value);
          }}
        />
        <Select
          label="Choose date level"
          placeholder="pick a date level"
          defaultValue={"yearly"}
          data={["yearly", "quarterly"]}
          onChange={(value: any | null) => {
            setSelectedIndicator(value);
          }}
        />
        <Select
          label="Choose meaure type"
          placeholder="pick a meaure type"
          defaultValue={measureType}
          value={measureType}
          data={[
            { label: "Total transactions", value: "total_transactions" },
            { label: "Volume", value: "volume" },
          ]}
          onChange={(value: any | null) => {
            setMeasureType(value);
            console.log(measureType);
          }}
        />
      </Group>
      {dataset && (
        <Chart
          ref={chartRef}
          type="bar"
          data={dataset}
          //   onClick={onClick}
          options={options}
        />
      )}
    </>
  );
}
