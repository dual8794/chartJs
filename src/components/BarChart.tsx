import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

import { MouseEvent } from "react";

export const options = {
  devicePixelRatio: 2,
  scales: {
    y: {
      title: {
        display: true,
      },
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

  elements: {
    bar: {
      borderWidth: 0,
    },
  },
  responsive: true,
  stacked: true,
  plugins: {
    customCanvasBackgroundColor: {
      color: "#FFFFFF",
    },
    legend: { display: false },
    title: {
      display: false,
    },
  },
};

const options2 = {
  devicePixelRatio: 2,
  scales: {
    y: {
      display: true,
      title: {
        display: true,
        text: "Avg price/ meter",
      },
      grid: {
        display: false,
      },
    },
    x: {
      display: false,
      grid: {
        display: false,
      },
    },
  },

  elements: {
    bar: {
      borderWidth: 0,
    },
  },
  responsive: true,
  plugins: {
    customCanvasBackgroundColor: {
      color: "#FFFFFF",
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Avg price/meter per property type chart",
    },
  },
};

interface Props {
  dataset: any;
  ref?: any;
  onClick?: (event: MouseEvent<HTMLCanvasElement>) => void;
  labels?: boolean;
}
export default function BarChart(props: Props) {
  return (
    <>
      <Bar
        ref={props.ref}
        options={props.labels ? options : options2}
        data={props.dataset}
        onClick={props.onClick}
      />
    </>
  );
}
