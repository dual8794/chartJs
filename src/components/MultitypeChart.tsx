import { useEffect, useRef, useState } from "react";
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
import { Badge, Group, Select, Stack, ThemeIcon } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { DateInput } from "@mantine/dates";

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
  const [selectedNighborhood, setSelectedNighborhood] = useState("السليمانية");
  const [selectedProvince, setSelectedProvince] = useState("الرياض");
  const [selectedIndicator, setSelectedIndicator] = useState("yearly");
  const [selectedStartDate, setSelectedStartDate] = useState("2010-01-01");
  const [selectedEndDate, setSelectedEndDate] = useState("2022-12-31");

  const [growthType, setGrowthType] = useState("annual+growth");
  const [measureType, setMeasureType] = useState<any>("total_transactions");

  // const yearList = [
  //   { label: "2010", value: "2010" },
  //   { label: "2011", value: "2011" },
  //   { label: "2012", value: "2012" },
  //   { label: "2013", value: "2013" },
  //   { label: "2014", value: "2014" },
  //   { label: "2015", value: "2015" },
  //   { label: "2016", value: "2016" },
  //   { label: "2017", value: "2017" },
  //   { label: "2018", value: "2018" },
  //   { label: "2019", value: "2019" },
  //   { label: "2020", value: "2020" },
  //   { label: "2021", value: "2021" },
  //   { label: "2022", value: "2022" },
  //   { label: "2023", value: "2023" },
  // ];

  // const monthsList = [
  //   { label: "January", value: "01" },
  //   { label: "February", value: "02" },
  //   { label: "March", value: "03" },
  //   { label: "April", value: "04" },
  //   { label: "May", value: "05" },
  //   { label: "June", value: "06" },
  //   { label: "July", value: "07" },
  //   { label: "August", value: "08" },
  //   { label: "September", value: "09" },
  //   { label: "October", value: "10" },
  //   { label: "November", value: "11" },
  //   { label: "December", value: "12" },
  // ];

  // const quarterList = [
  //   { label: "Q1", value: "01" },
  //   { label: "Q2", value: "02" },
  //   { label: "Q3", value: "03" },
  //   { label: "Q4", value: "04" },
  // ];

  // const queryClient = useQueryClient();

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
    province: string,
    start_date: string,
    end_date: string
    // start_year: string,
    // end_year: string,
    // start_month: string,
    // end_month: string,
    // start_quarter: string,
    // end_quarter: string
  ) {
    return useQuery(
      [
        "metrics",
        indicator,
        metricType,
        neighborhood,
        province,
        start_date,
        end_date,
        // start_year,
        // end_year,
        // start_month,
        // end_month,
        // start_quarter,
        // end_quarter
      ],
      async () => {
        const { data } = await axios.get(
          // `https://misbar-backend-chartjs.azurewebsites.net/api/metricsdetailed?indicator=${indicator}&metrics_type=${metricType}&province_aname=${province}&neighborh_aname=${neighborhood}`
          `https://misbar-backend-chartjs.azurewebsites.net/api/metricsdetailed?indicator=${indicator}&metrics_type=${metricType}&province_aname=${province}
          &neighborh_aname=${neighborhood}&start_date=${start_date}&end_date=${end_date}`
          // &start_year=${start_year}&end_year=${end_year}
          // &start_month=${start_month}&end_month=${end_month}&start_quarter=${start_quarter}&end_quarter=`
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
    selectedProvince,
    selectedStartDate,
    selectedEndDate
  );

  const { data: data2 } = getMetricsDetails(
    growthType,
    selectedChoice,
    selectedNighborhood,
    selectedProvince,
    selectedStartDate,
    selectedEndDate
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
    return metrics.sort();
  }, []);

  const total_transactions = data?.reduce(
    (total: any, { total_transactions }: any) => {
      total = Number(total) + Number(total_transactions);
      return total;
    },
    []
  );

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

  // useEffect(() => {
  //   console.log(PPM);
  //   console.log(PPM2);
  // }, [data, data2]);

  const [dataset, setDataset] = useState<any>();

  useEffect(() => {
    if (selectedIndicator == "yearly") {
      setGrowthType("annual+growth");
    } else if (selectedIndicator == "quarterly") {
      setGrowthType("QoQ");
    } else if (selectedIndicator == "monthly") {
      setGrowthType("MoM");
    }
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
  }, [data, data2, measureType]);

  function convertToInternationalCurrencySystem(labelValue: any) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
      : Math.abs(Number(labelValue));
  }

  return (
    <>
      <Group pb={5}>
        <Select
          label="Metrics type"
          placeholder="pick a metric type"
          defaultValue={selectedChoice}
          data={choicesArray}
          onChange={(value: any | null) => {
            setSelectedChoice(value);
            console.log("value:", value);
          }}
        />
        <Select
          label="Date level"
          placeholder="pick a date level"
          defaultValue={"yearly"}
          data={["yearly", "quarterly", "monthly"]}
          onChange={(value: any | null) => {
            setSelectedIndicator(value);
          }}
        />
        <Select
          label="Measure type"
          placeholder="pick a meaure type"
          defaultValue={measureType}
          value={measureType}
          data={[
            { label: "Total transactions", value: "total_transactions" },
            { label: "Volume", value: "volume" },
          ]}
          onChange={(value: any | null) => {
            setMeasureType(value);
          }}
        />
        <Select
          label="Province"
          placeholder="pick a province"
          defaultValue={selectedProvince}
          data={["الرياض", "جدة"]}
          onChange={(value: any | null) => {
            setSelectedProvince(value);
          }}
        />
        <Select
          label="Neighborhood"
          placeholder="pick a neighborhood"
          defaultValue={selectedNighborhood}
          data={["السليمانية", "الملقا"]}
          onChange={(value: any | null) => {
            setSelectedNighborhood(value);
          }}
        />

        <DateInput
          valueFormat="YYYY-MM-DD"
          label="Start date"
          placeholder="start date"
          maw={400}
          mx="auto"
          onChange={(date) => {
            if (date?.getMonth().toString().length === 1) {
              setSelectedStartDate(
                date?.getFullYear().toString() +
                  "-" +
                  "0" +
                  (date?.getMonth() + 1).toString() +
                  "-" +
                  date?.getDate().toString()
              );
            } else {
              setSelectedStartDate(
                date?.getFullYear().toString() +
                  "-" +
                  date?.getMonth().toString() +
                  "-" +
                  date?.getDate().toString()
              );
            }
          }}
        />
        <DateInput
          valueFormat="YYYY-MM-DD"
          label="End date"
          placeholder="end date"
          maw={400}
          mx="auto"
          onChange={(date) => {
            if (date?.getMonth().toString().length === 1) {
              setSelectedEndDate(
                date?.getFullYear().toString() +
                  "-" +
                  "0" +
                  (date?.getMonth() + 1).toString() +
                  "-" +
                  date?.getDate().toString()
              );
            } else {
              setSelectedEndDate(
                date?.getFullYear().toString() +
                  "-" +
                  date?.getMonth().toString() +
                  "-" +
                  date?.getDate().toString()
              );
            }
          }}
        />
      </Group>
      <ThemeIcon size={150} color="cyan" variant="light">
        <Stack>
          <span> Total transactions </span>
          <Badge className="text-xs" color="cyan">
            {convertToInternationalCurrencySystem(total_transactions)}{" "}
          </Badge>
        </Stack>
      </ThemeIcon>

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
