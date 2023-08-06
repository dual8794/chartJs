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
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

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

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  scales: {
    y: { min: -100, max: 1000, position: "right" },
    y1: { min: 0, max: 1000, position: "left" },
  },
  datasets: [
    {
      type: "line" as const,
      label: "Dataset 1",
      borderColor: "#C6D936",
      borderWidth: 2,
      fill: false,
      data: labels.map(() => faker.datatype.number({ min: -100, max: 1000 })),
      yAxisID: "y",
    },
    {
      type: "bar" as const,
      label: "Dataset 2",
      backgroundColor: "#37BADB",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "white",
      borderWidth: 2,
      yAxisID: "y1",
    },
    // {
    //   type: "bar" as const,
    //   label: "Dataset 3",
    //   backgroundColor: "#4262A9",
    //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
    // },
  ],
};

export function MultitypeChart() {
  return <Chart type="bar" data={data} />;
}
