export function BarlineOptions() {
  return {
    devicePixelRatio: 2,
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
        display: false,
      },
      title: {
        display: false,
        text: "Transactions growth over time",
      },
      tooltip: {
        bodyFont: {
          weight: "italic",
        },
      },
    },
  };
}
