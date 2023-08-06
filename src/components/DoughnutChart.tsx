import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const counter = {
  id: "counter",
  beforeInit: function (chart: any) {
    // Get reference to the original fit function
    const originalFit = chart.legend.fit;
    // Override the fit function
    chart.legend.fit = function fit() {
      // Call original function and bind scope in order to use `this` correctly inside it
      originalFit.bind(chart.legend)();
      this.height += 35;
    };
  },
};

ChartJS.register(counter);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "right" as const,
    },
    counter: {
      fontColor: "#4BB5B2",
      fontSize: "32px",
      text: "Hello",
    },
  },
};

export const data = {
  labels: ["Built", "Not Built"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 3],
      backgroundColor: ["#C6D936", "#4BB5B2"],
      borderColor: ["#C6D936", "#4BB5B2"],
      borderWidth: 1,
    },
  ],
};

export function DoughnutChart() {
  return <Doughnut options={options} data={data} />;
}
