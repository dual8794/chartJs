import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { useEffect, useState } from "react";
import { Group, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    y: {
      grid: {
        display: false,
      },
      scaleLabel: { display: true, labelString: "temperature" },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      position: "right" as const,
      display: true,
    },
    title: {
      display: true,
      text: "Weather forecast",
    },
    tooltip: {
      bodyFont: {
        weight: "italic",
      },
    },
  },
};

export function Test() {
  // const [startDateParam, setStartDateParam] = useState<string | undefined>(
  //   "2023-07-20"
  // );
  // const [endDateParam, setEndDateParam] = useState<string | undefined>(
  //   "2023-07-22"
  // );
  // const [startDate, setStartDate] = useState("2023-07-20");
  // const [endDate, setEndDate] = useState("2023-07-22");
  // const [elevation, setElevation] = useState(0);
  const [array1, setArray1] = useState({});

  const getData = async () => {
    const response = await axios({
      method: "GET",
      url: "https://api.open-meteo.com/v1/dwd-icon?hourly=temperature_2m,rain,windspeed_10m,is_day&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto",
      params: {
        latitude: 25.0,
        longitude: 45.0,
        //   start_date: startDate,
        //   end_date: endDate,
      },
    }).then((response) => {
      return response.data;
    });
    return response;
  };

  const { data: data } = useQuery<any>(["labels"], () => getData());

  const [dataset, setDataset] = useState({
    labels: data?.hourly.time,
    datasets: [
      {
        label: "temperature_2m",
        data: data?.hourly.temperature_2m,
        borderColor: "#4262A9",
        backgroundColor: "#4262A9",
      },
      {
        label: "temperature_2m",
        data: data?.hourly.windspeed_10m,
        borderColor: "#37BADB",
        backgroundColor: "#37BADB",
      },
    ],
  });

  useEffect(() => {
    setDataset({
      labels: data?.hourly.time,
      datasets: [
        {
          label: "temperature_2m",
          data: data?.hourly.temperature_2m,
          borderColor: "#4262A9",
          backgroundColor: "#4262A9",
        },
        {
          label: "windspeed_10m",
          data: data?.hourly.windspeed_10m,
          borderColor: "#37BADB",
          backgroundColor: "#37BADB",
        },
      ],
    });

    setArray1(
      data?.daily.time.map((day: any, i: any) =>
        Object.assign({}, day, data?.daily.temperature_2m_max[i])
      )
    );
    // console.log("updated dataset", dataset);
  }, [data]);

  //   const handelDateChange = (startDateParam: any, endDateParam: any) => {
  //     setStartDate(startDateParam);
  //     setEndDate(endDateParam);
  //   };
  console.log(array1);

  return (
    <>
      <Group>
        <Text fz="xs">Elevation: {data?.elevation}</Text>
        <Text fz="xs">max tempratures: </Text>
        {/* data.daily.temperature_2m_max */}
      </Group>

      <Line options={options} data={dataset} />
    </>
  );
}
