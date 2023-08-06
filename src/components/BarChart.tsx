import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Plugin,
  ChartType,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

declare module "chart.js" {
  interface PluginOptionsByType<TType extends ChartType> {
    customCanvasBackgroundColor?: {
      color?: string;
    };
  }
}

export const plugin = {};

export const options = {
  scales: {
    y: { min: 0, max: 1000, display: true },
  },
  elements: {
    bar: {
      borderWidth: 0,
    },
  },
  responsive: true,
  //   aspectRatio: 0.5,
  stacked: false,

  plugins: {
    customCanvasBackgroundColor: {
      color: "#FFFFFF",
    },
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "#4BB5B2",
      borderRadius: 10,
    },
    {
      label: "Dataset 2",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 800 })),
      backgroundColor: "#4262A9",
      borderRadius: 10,
    },
  ],
};

export default function BarChart() {
  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
}
