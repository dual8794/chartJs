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
import { Button, Group, Input } from "@mantine/core";
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
      display: false,
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

export function LineChart() {
  const [startDateParam, setStartDateParam] = useState<string | undefined>(
    "2023-07-20"
  );
  const [endDateParam, setEndDateParam] = useState<string | undefined>(
    "2023-07-22"
  );
  const [startDate, setStartDate] = useState("2023-07-20");
  const [endDate, setEndDate] = useState("2023-07-22");

  const getLabels = async (startDate: any, endDate: any) => {
    const response = await axios({
      method: "GET",
      url: "https://archive-api.open-meteo.com/v1/archive?hourly=temperature_2m",
      params: {
        latitude: 23.8859,
        longitude: 45.0792,
        start_date: startDate,
        end_date: endDate,
      },
    }).then((response) => {
      return response.data.hourly.time;
    });
    return response;
  };

  const getTempratures = async (startDate: any, endDate: any) => {
    const response = await axios({
      method: "GET",
      url: "https://archive-api.open-meteo.com/v1/archive?hourly=temperature_2m",
      params: {
        latitude: 23.8859,
        longitude: 45.0792,
        start_date: startDate,
        end_date: endDate,
      },
    }).then((response) => {
      return response.data.hourly.temperature_2m;
    });
    return response;
  };

  const { data: labels } = useQuery<any[]>(["labels", startDate, endDate], () =>
    getLabels(startDate, endDate)
  );
  const { data: tempratures } = useQuery<any[]>(
    ["tempratures", startDate, endDate],
    () => getTempratures(startDate, endDate)
  );

  const [dataset, setDataset] = useState({
    labels: labels,
    datasets: [
      {
        label: "Dataset 1",
        data: tempratures,
        borderColor: "#4262A9",
        backgroundColor: "#4262A9",
      },
    ],
  });

  useEffect(() => {
    setDataset({
      labels: labels,
      datasets: [
        {
          label: "Dataset 1",
          data: tempratures,
          borderColor: "#4262A9",
          backgroundColor: "#4262A9",
        },
      ],
    });
    console.log("updated dataset", dataset);
  }, [labels, tempratures, endDate, startDate]);

  const handelDateChange = (startDateParam: any, endDateParam: any) => {
    setStartDate(startDateParam);
    setEndDate(endDateParam);
  };

  return (
    <>
      <Group>
        <Input.Wrapper label="start date">
          {/* <DateInput
            valueFormat="YYYY-MM-DD"
            label="Date input"
            placeholder="Date input"
            maw={400}
            mx="auto"
            onChange={(date) => {
              if (date?.getMonth().toString().length === 1) {
                setStartDateParam(
                  date?.getFullYear().toString() +
                    "-" +
                    "0" +
                    date?.getMonth().toString() +
                    "-" +
                    date?.getDate().toString()
                );
                console.log(
                  date?.getFullYear().toString() +
                    "-" +
                    "0" +
                    date?.getMonth().toString() +
                    "-" +
                    date?.getDate().toString()
                );
              } else {
                setStartDateParam(
                  date?.getFullYear().toString() +
                    "-" +
                    date?.getMonth().toString() +
                    "-" +
                    date?.getDate().toString()
                );
                console.log(
                  date?.getFullYear().toString() +
                    "-" +
                    date?.getMonth().toString() +
                    "-" +
                    date?.getDate().toString()
                );
              }
            }}
          /> */}
          <Input
            title={"start date"}
            onChange={(event) => setStartDateParam(event.target.value)}
          />
        </Input.Wrapper>
        <Input.Wrapper label="end date">
          {/* <DateInput
            valueFormat="YYYY-MM-DD"
            label="Date input"
            placeholder="Date input"
            maw={400}
            mx="auto"
            onChange={(date) => {
              if (date?.getMonth().toString().length == 1) {
                setEndDateParam(
                  date?.getFullYear().toString() +
                    "-" +
                    "0" +
                    date?.getMonth().toString() +
                    "-" +
                    date?.getDate().toString()
                );
                console.log(
                  date?.getFullYear().toString() +
                    "-" +
                    "0" +
                    date?.getMonth().toString() +
                    "-" +
                    date?.getDate().toString()
                );
              } else {
                setEndDateParam(
                  date?.getFullYear().toString() +
                    "-" +
                    date?.getMonth().toString() +
                    "-" +
                    date?.getDate().toString()
                );
                console.log(
                  date?.getFullYear().toString() +
                    "-" +
                    date?.getMonth().toString() +
                    "-" +
                    date?.getDate().toString()
                );
              }
            }}
          /> */}
          <Input
            title={"end date"}
            onChange={(event) => setEndDateParam(event.target.value)}
          />
        </Input.Wrapper>
        <Button
          title={"submit"}
          onClick={() => handelDateChange(startDateParam, endDateParam)}
        >
          submit
        </Button>
      </Group>

      <Line options={options} data={dataset} />
    </>
  );
}
