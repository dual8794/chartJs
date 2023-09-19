import { Chart } from "react-chartjs-2";

interface Props {
  dataset: any;
  chartRef: any;
  chartoptions?: any;
}

export function BarlineCahrt(props: Props) {
  return (
    <>
      <Chart
        options={props.chartoptions}
        ref={props.chartRef}
        type="bar"
        data={props.dataset}
      />
    </>
  );
}
