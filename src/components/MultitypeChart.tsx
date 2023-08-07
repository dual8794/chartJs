import { MouseEvent, useRef } from "react";
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
  InteractionItem,
} from "chart.js/auto"; // no need to register if ech elemnt if we use chart.js/auto in import
import {
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from "react-chartjs-2";
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

export const options = {
  responsive: true,
  scales: {
    y: {
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
};

export const data = {
  labels,
  scales: {
    y: {
      min: -100,
      max: 1000,
      position: "right",
      grid: {
        display: false,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
    // y1: { min: 0, max: 1000, position: "left" },
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
      //   borderColor: "white",
      fill: false,

      borderWidth: 2,
      //   yAxisID: "y1",
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
  const printDatasetAtEvent = (dataset: InteractionItem[]) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;

    console.log(data.datasets[datasetIndex].label);
  };

  const printElementAtEvent = (element: InteractionItem[]) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];

    console.log(data.labels[index], data.datasets[datasetIndex].data[index]);
  };

  const printElementsAtEvent = (elements: InteractionItem[]) => {
    if (!elements.length) return;
  };

  const chartRef = useRef<ChartJS>(null);

  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };
  return (
    <Chart
      ref={chartRef}
      type="bar"
      data={data}
      onClick={onClick}
      options={options}
    />
  );
}
