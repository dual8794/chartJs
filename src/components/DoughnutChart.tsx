import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

interface Props {
  dataset: any;
  total?: any;
}

ChartJS.register(ArcElement, Tooltip, Legend);
// ChartJS.register(ChartDataLabels);

export function DoughnutChart(props: Props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  };

  const textCenter = {
    id: "textCenter",
    beforeDatasetDraw(chart: any) {
      const { ctx } = chart;
      ctx.save();
      ctx.font = "bolder 20px sans-serif";
      ctx.fillStyle = "#4262A9";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        // `  ${data.datasets[0].data[0]}`,
        `${props.total}`,

        chart.getDatasetMeta(0).data[0]?.x,
        chart.getDatasetMeta(0).data[0]?.y
      );
    },
  };

  return (
    <Doughnut
      // ref={chartRef}
      options={options}
      data={props.dataset}
      plugins={[textCenter]}
    />
  );
}
