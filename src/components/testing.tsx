import { useEffect, useRef, useState, MouseEvent } from "react";
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
import { Bar, Chart, Line, getElementAtEvent } from "react-chartjs-2";
import {
  Text,
  Group,
  Select,
  Space,
  Stack,
  Divider,
  ColorSwatch,
  Container,
  Grid,
  Card,
} from "@mantine/core";

import {
  useTransactionsGrowthQuery,
  useNeighborhoodsQuery,
  usePropertyTypesQuery,
  useProvincesQuery,
  useRegionsQuery,
  usePropertyTypeChartQuery,
} from "../queries/metrics.query";

import { useKPIsQuery } from "../queries/kpis.query";
import { usePricesQuery } from "../queries/price.query";
import { DateInput } from "@mantine/dates";
import { TableChart } from "./TableChart";
import { useTop10Query } from "../queries/top5.query";
import { useKpisStore } from "../stores/useKpisStore";
import { useOptionsStore } from "../stores/useOptionsStore";
import { useFiltersStore } from "../stores/useFiltersStore";
import { useAreasQuery } from "../queries/areas.query";
import { useBuildingQuery } from "../queries/building.query";
import { DoughnutChart } from "./DoughnutChart";
import BarChart from "./BarChart";
import { useSakaniQuery } from "../queries/sakani.query";

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

export const options = {
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

export const options3 = {
  devicePixelRatio: 2,
  scales: {
    y: {
      title: {
        display: true,
        text: "Transactions Count",
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

export const options4 = {
  devicePixelRatio: 2,

  responsive: true,
  scales: {
    y: {
      grid: {
        display: false,
      },
      scaleLabel: {
        display: true,
        labelString: "avg_price_per_meter",
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
      position: "right" as const,
      display: false,
    },
    title: {
      display: true,
      // text: "Weather forecast",
    },
    tooltip: {
      bodyFont: {
        weight: "italic",
      },
    },
  },
};

export default function Testing() {
  const chartRef = useRef<ChartJS>(null);
  const chartRef2 = useRef<ChartJS | any>();
  const chartRef3 = useRef<ChartJS | any>();

  const filtersStore = useFiltersStore();
  const optionsStore = useOptionsStore();
  const currentOptions = optionsStore.options;

  console.log(currentOptions);
  console.log("orginal:", options);

  const onChange = (value: string | null, name: string) => {
    filtersStore.setFilterValues({
      ...filtersStore.filterValues,
      [name]: value ?? "",
    });
  };

  const [predctionYear, setPredictionYear] = useState("2020");

  // const onDateLevelChanege = (value: string, name: string) => {
  //   if (filterValues.date_level === "year") {
  //     onChange(value, name);
  //   } else if (filterValues.date_level === "month") {
  //     if (name.split("_")[0] === "start") {
  //       onChange(value.split("-")[0], "start_year");
  //       console.log("start_year:", value.split("-")[0].length);
  //     } else {
  //       onChange(value.split("-")[0], "end_year");
  //       console.log("end_year", value.split("-")[0]);
  //     }
  //     onChange(value.split("-")[1], name);
  //     console.log(value.split("-")[1], name);
  //   } else if (filterValues.date_level === "quarter") {
  //     if (name.split("_")[0] === "start") {
  //       onChange(value.split("-")[0], "start_year");
  //     } else {
  //       onChange(value.split("-")[0], "end_year");
  //     }
  //   }
  // };

  const [measureType, setMeasureType] = useState<any>("total_transactions");

  // const queryClient = useQueryClient();

  const regionsData = useRegionsQuery();
  const propertyTypesData = usePropertyTypesQuery();
  const provincesData = useProvincesQuery(
    filtersStore?.filterValues?.region_id
  );
  const neighborhoodsData = useNeighborhoodsQuery(
    filtersStore?.filterValues?.province_id
  );

  const { data: transactions } = useTransactionsGrowthQuery(
    filtersStore?.filterValues
  );

  const { data: kpis } = useKPIsQuery(filtersStore?.filterValues);

  const { data: property_type_chart } = usePropertyTypeChartQuery(
    filtersStore?.filterValues?.date_level,
    filtersStore?.filterValues?.region_id,
    filtersStore?.filterValues?.province_id,
    filtersStore?.filterValues?.neighborhood_id,
    filtersStore?.filterValues?.start_date,
    filtersStore?.filterValues?.end_date
  );

  const { data: avg_price_per_meter_chart } = usePricesQuery(
    filtersStore?.filterValues
  );

  const { data: top_10_chart } = useTop10Query(filtersStore?.filterValues);

  const { data: areas_chart } = useAreasQuery(filtersStore?.filterValues);

  const { data: predictions_chart } = useBuildingQuery(
    filtersStore?.filterValues?.neighborhood_id,
    predctionYear
  );

  const { data: sakani_chart } = useSakaniQuery(
    filtersStore?.filterValues?.date_level,
    filtersStore?.filterValues?.region_id,
    filtersStore?.filterValues?.province_id,
    filtersStore?.filterValues?.neighborhood_id,
    filtersStore?.filterValues?.start_date,
    filtersStore?.filterValues?.end_date
  );

  const sakani_transaction_count = sakani_chart?.reduce(
    (count: any, { transactions_count }: any) => {
      count.push(transactions_count);
      return count;
    },
    []
  );

  const sakani_count = sakani_chart?.reduce(
    (count: number, { transactions_count }: any) => {
      count += Number(transactions_count);
      return count;
    },
    0
  );

  const labels10 = sakani_chart?.reduce(
    (properties: any, { property_type_id }: any) => {
      propertyTypesData.data?.map((types) => {
        if (types.id == property_type_id) {
          properties.push(types.name_ar);
        }
      });
      return properties;
    },
    []
  );

  const parcels_predition_count = predictions_chart?.reduce(
    (predictions: any, { parcel_count }: any) => {
      predictions.push(parcel_count);
      return predictions;
    },
    []
  );

  const parcel_count = predictions_chart?.reduce(
    (predictions: number, { parcel_count }: any) => {
      predictions += Number(parcel_count);
      return predictions;
    },
    0
  );

  const labels4 = predictions_chart?.reduce(
    (predictions: any, { building }: any) => {
      if (building == 0) {
        predictions.push("Unbuilt");
      } else {
        predictions.push("Built");
      }
      return predictions;
    },
    []
  );

  const transaction_number_count_per_area = areas_chart?.reduce(
    (metrics: any, { transactions_count }: any) => {
      metrics.push(transactions_count);
      return metrics;
    },
    []
  );

  const labels3 = areas_chart?.reduce((categories: any, { category }: any) => {
    categories.push(category);
    return categories;
  }, []);

  const property_type_avg_price_meter = property_type_chart?.reduce(
    (metrics: any, { avg_price_per_meter }: any) => {
      metrics.push(avg_price_per_meter);
      return metrics;
    },
    []
  );

  const avg_price_per_meter = avg_price_per_meter_chart?.reduce(
    (metrics: any, { avg_price_per_meter }: any) => {
      metrics.push(avg_price_per_meter);
      return metrics;
    },
    []
  );

  const property_type_count = property_type_chart?.reduce(
    (metrics: any, { transactions_count }: any) => {
      metrics.push(transactions_count);

      return metrics;
    },
    []
  );

  const Measure = transactions?.reduce(
    (metrics: any, { total_transactions, transactions_count }: any) => {
      if (measureType == "total_transactions") {
        metrics.push(transactions_count);
      } else if (measureType == "volume") {
        metrics.push(total_transactions);
      }
      return metrics;
    },
    []
  );

  const labels2 = property_type_chart?.reduce(
    (properties: any, { property_type_id }: any) => {
      propertyTypesData.data?.map((types) => {
        if (types.id == property_type_id) {
          properties.push(types.name_ar);
        }
      });
      return properties;
    },
    []
  );

  const labels1 = transactions?.reduce(
    (metrics: any, { year, Quarter, Month }: any) => {
      if (filtersStore?.filterValues?.date_level == "year") {
        metrics.push(year);
      } else if (filtersStore?.filterValues?.date_level == "quarter") {
        metrics.push(year.toString() + "-Q" + Quarter.toString());
      } else if (filtersStore?.filterValues?.date_level == "month") {
        metrics.push(year.toString() + "-" + Month.toString());
      }
      return metrics;
    },
    []
  );

  const Growth = transactions?.reduce(
    (
      metrics2: any,
      { total_transactions_growth, transactions_count_growth }: any
    ) => {
      if (measureType == "total_transactions") {
        metrics2.push(transactions_count_growth);
      } else if (measureType == "volume") {
        metrics2.push(total_transactions_growth);
      }
      return metrics2;
    },
    []
  );

  const [regionsArr, setReionsArr] = useState<any | undefined>([]);
  const [provincesArr, setProvincesArr] = useState<any | undefined>([]);
  const [neighborhoodsArr, setNeighborhoodsArr] = useState<any | undefined>([]);
  const [propertyTypesArr, setPropertyTypesArr] = useState<any | undefined>([]);
  const kpisStore = useKpisStore();
  // const [stratPeriod, setStartPeriod] = useState<any | undefined>();
  // const [endPeriod, setEndPeriod] = useState<any | undefined>();
  // const [periodData, setPeriodData] = useState<any | undefined>([]);

  // const [yearMonthList, setYearMonthList] = useState<any | undefined>([]);
  // const [yearQuarterList, setYearQuarterList] = useState<any | undefined>([]);

  useEffect(() => {
    setPredictionYear("2020");

    if (kpis) {
      kpisStore.setKpis(kpis);
    }

    if (regionsData.data) {
      const newRgionsArr = regionsData.data?.map((region) => ({
        label: region.name_ar,
        value: region.id.toString(),
      }));
      setReionsArr(newRgionsArr);
    }
    if (provincesData.data) {
      const newProvincesArr = provincesData.data?.map((province) => ({
        label: province.name_ar,
        value: province.id.toString(),
      }));
      setProvincesArr(newProvincesArr);
    }
    if (neighborhoodsData.data) {
      const newNeighborhoodsArr = neighborhoodsData.data?.map(
        (neighborhood) => ({
          label: neighborhood.name_ar,
          value: neighborhood.id.toString(),
        })
      );
      setNeighborhoodsArr(newNeighborhoodsArr);
    }
    if (propertyTypesData.data) {
      const newTypesArr = propertyTypesData.data?.map((types) => ({
        label: types.name_ar,
        value: types.id.toString(),
      }));
      newTypesArr.push({ label: "الكل", value: "" });
      setPropertyTypesArr(newTypesArr);
    }

    // if (dateList.data) {
    //   if (filterValues.date_level === "month") {
    //     const MonthListArr = dateList.data?.map((obj: any) => ({
    //       label: obj.year.toString() + "-" + obj.Month.toString(),
    //       value: obj.year.toString() + "-" + obj.Month.toString(),
    //     }));
    //     setYearMonthList(MonthListArr);
    //   }
    // }
    // if (dateList.data) {
    //   if (filterValues.date_level === "quarter") {
    //     const QuarterListArr = dateList.data?.map((obj: any) => ({
    //       label: obj.year.toString() + "-Q" + obj.Quarter.toString(),
    //       value: obj.year.toString() + "-Q" + obj.Quarter.toString(),
    //     }));
    //     setYearQuarterList(QuarterListArr);
    //   }
    // }

    // if (filterValues.date_level == "year") {
    //   setStartPeriod("start_year");
    //   setEndPeriod("end_year");
    //   setPeriodData(yearList);
    // } else if (filterValues.date_level == "month") {
    //   setStartPeriod("start_month");
    //   setEndPeriod("end_month");
    //   setPeriodData(yearMonthList);
    // } else if (filterValues.date_level == "quarter") {
    //   setStartPeriod("start_quarter");
    //   setEndPeriod("end_quarter");
    //   setPeriodData(yearQuarterList);
    // }
  }, [
    regionsData.data,
    provincesData.data,
    neighborhoodsData.data,
    propertyTypesData.data,
    // top_10,
    kpis,
  ]);

  const top_10 = top_10_chart?.reduce(
    (
      metrics: any,
      { transaction_number, price, area, price_per_meter, region_id }: any
    ) => {
      const regionName = regionsArr.map((region: any) => {
        if (region.value == region_id.toString()) {
          return region.label;
        }
      });
      metrics.push({
        number: transaction_number,
        value: price,
        area: area,
        price: price_per_meter,
        location: regionName,
      });
      return metrics;
    },
    []
  );

  // console.log(top_10);
  const [dataset, setDataset] = useState<any>();
  const [dataset2, setDataset2] = useState<any>();
  const [dataset3, setDataset3] = useState<any>();
  const [dataset4, setDataset4] = useState<any>();
  const [dataset5, setDataset5] = useState<any>();
  const [dataset6, setDataset6] = useState<any>();
  const [dataset7, setDataset7] = useState<any>();

  const [transBarColors, setTransBarColors] = useState<string[]>(
    Array(labels2?.length).fill("#4BB5B2")
  );
  const [avgBarColors, setAvgBarColors] = useState<string[]>(
    Array(labels2?.length).fill("#4262A9")
  );

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

  useEffect(() => {
    setDataset({
      labels: labels1,
      datasets: [
        {
          type: "line" as const,
          label: "Growth",
          backgroundColor: "#C6D936",
          borderColor: "#C6D936",
          borderWidth: 2,
          fill: false,
          data: Growth,
          yAxisID: "y",
        },
        {
          type: "bar" as const,
          label: measureType,
          backgroundColor: "#37BADB",
          borderWidth: 0,
          borderRadius: 10,
          data: Measure,
          borderColor: "#37BADB",
          fill: false,

          yAxisID: "y1",
        },
      ],
      scales: {
        y: {
          type: "linear" as const,
          position: "left" as const,
          display: true,

          grid: {
            display: false,
          },
        },
        y1: {
          type: "bar" as const,
          position: "right" as const,
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
    });

    setDataset2({
      labels: labels2,
      datasets: [
        {
          label: "avg price per meter",
          data: property_type_avg_price_meter,
          backgroundColor: avgBarColors,
          borderRadius: 10,
        },
      ],
    });
    setDataset3({
      labels: labels2,
      datasets: [
        {
          label: "transactions count",
          data: property_type_count,
          backgroundColor: transBarColors,
          borderRadius: 10,
        },
      ],
    });

    setDataset4({
      labels: labels1,
      datasets: [
        {
          label: "Avg price per meter",
          data: avg_price_per_meter,
          borderColor: "#4262A9",
          backgroundColor: "#4262A9",
        },
      ],
    });

    setDataset5({
      labels: labels3,
      datasets: [
        {
          label: "areas transactions",
          data: transaction_number_count_per_area,
          borderColor: "#4262A9",
          backgroundColor: "#4262A9",
          borderRadius: 10,
        },
      ],
    });

    setDataset6({
      labels: labels4,
      datasets: [
        {
          label: "parcels predictions",
          data: parcels_predition_count,
          backgroundColor: ["#C6D936", "#4BB5B2"],
          borderColor: ["#C6D936", "#4BB5B2"],
          borderWidth: 1,
        },
      ],
      text: parcels_predition_count,
    });

    setDataset7({
      labels: labels10,
      datasets: [
        {
          label: "saksni transaction count",
          data: sakani_transaction_count,
          backgroundColor: ["#C6D936", "#d9aa1e", "#4BB5B2"],
          borderColor: ["#C6D936", "#d9aa1e", "#4BB5B2"],
          borderWidth: 1,
        },
      ],
      text: sakani_transaction_count,
    });
  }, [
    transactions,
    measureType,
    property_type_chart,
    avg_price_per_meter_chart,
    top_10_chart,
    areas_chart,
    predictions_chart,
    sakani_chart,
    transBarColors,
    avgBarColors,
  ]);

  function convertToInternationalCurrencySystem(labelValue: any) {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
      : Math.abs(Number(labelValue));
  }

  const [propertyValue, setPropertyValue] = useState<string | null>("4");

  const elementOnClickEvent = (element: InteractionItem[], dataset: any) => {
    const newColors = Array(dataset.labels.length).fill("#4BB5B2");
    const newColors2 = Array(dataset.labels.length).fill("#4262A9");

    setPropertyValue("");
    onChange("", "property_type_id");

    if (element.length > 0) {
      const { index } = element[0];
      newColors[index] = "#C6D936";
      newColors2[index] = "#C6D936";

      console.log("labels:", dataset.labels);
      console.log("the clicked index", dataset.labels[index]);
      propertyTypesArr.map((prop: any) => {
        if (prop.label === dataset.labels[index]) {
          setPropertyValue(prop.value);
          onChange(prop.value, "property_type_id");
        }
      });
    }
    setTransBarColors(newColors);
    setAvgBarColors(newColors2);
  };

  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef3;
    if (!chart) {
      return;
    }
    elementOnClickEvent(getElementAtEvent(chart, event), dataset2);
  };

  const onClick2 = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef2;

    if (!chart) {
      return;
    }
    elementOnClickEvent(getElementAtEvent(chart, event), dataset3);
  };

  return (
    <>
      <Group position="center" spacing="xs" px={100}>
        <Select
          label="Property type"
          placeholder="pick a property type"
          defaultValue={"4"}
          value={propertyValue}
          data={propertyTypesArr}
          onChange={(value: string | null) => {
            setPropertyValue(value);
            onChange(value, "property_type_id");
          }}
        />

        <Select
          label="Measure type"
          placeholder="pick a meaure type"
          defaultValue={measureType}
          value={measureType}
          data={[
            { label: "Total transactions", value: "total_transactions" },
            { label: "Volume", value: "volume" },
          ]}
          onChange={(value: any | null) => {
            setMeasureType(value);
          }}
        />
        <Select
          label="Region"
          placeholder="pick a region"
          defaultValue={"10"}
          data={regionsArr}
          onChange={(value: string | null) => {
            onChange(value, "region_id");
          }}
        />
        <Select
          label="Province"
          placeholder="pick a province"
          defaultValue={"101000"}
          data={provincesArr}
          onChange={(value: string | null) => {
            onChange(value, "province_id");
          }}
        />
        <Select
          label="Neighborhood"
          placeholder="pick a neighborhood"
          defaultValue={"101000666"}
          data={neighborhoodsArr}
          onChange={(value: string | null) => {
            onChange(value, "neighborhood_id");
          }}
        />
        <Select
          label="Date level"
          placeholder="pick a date level"
          defaultValue={"year"}
          data={["year", "quarter", "month"]}
          onChange={(value: string | null) => {
            onChange(value, "date_level");
          }}
        />
        <DateInput
          valueFormat="YYYY-MM-DD"
          label="Start date"
          placeholder="start date"
          // maw={400}
          // mx="auto"
          onChange={(date) => {
            if (date?.getMonth().toString().length === 1) {
              onChange(
                date?.getFullYear().toString() +
                  "-" +
                  "0" +
                  (date?.getMonth() + 1).toString() +
                  "-" +
                  date?.getDate().toString(),
                "start_date"
              );
            } else {
              onChange(
                date?.getFullYear().toString() +
                  "-" +
                  date?.getMonth().toString() +
                  "-" +
                  date?.getDate().toString(),
                "start_date"
              );
            }
          }}
        />
        <DateInput
          valueFormat="YYYY-MM-DD"
          label="End date"
          placeholder="end date"
          // maw={400}
          // mx="auto"
          onChange={(date) => {
            if (date?.getMonth().toString().length === 1) {
              onChange(
                date?.getFullYear().toString() +
                  "-" +
                  "0" +
                  (date?.getMonth() + 1).toString() +
                  "-" +
                  date?.getDate().toString(),
                "end_date"
              );
            } else {
              onChange(
                date?.getFullYear().toString() +
                  "-" +
                  date?.getMonth().toString() +
                  "-" +
                  date?.getDate().toString(),
                "end_date"
              );
            }
          }}
        />
        {/* <Select
          label="start year"
          placeholder="pick a period start"
          defaultValue={"2010"}
          data={yearList}
          onChange={(value: string | null) => {
            onChange(value, "start_year");
          }}
        />

        <Select
          label="end year"
          placeholder="pick a period end"
          defaultValue={"2023"}
          data={yearList}
          onChange={(value: string | null) => {
            onChange(value, "end_year");
          }}
        /> */}
      </Group>
      <Space h="xl" />
      <Group position="center">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack>
            <Text c="#4262A9"> Total Transactions </Text>
            <Text c="#4262A9" fw={700} ta="center">
              {/* {convertToInternationalCurrencySystem(total_transactions)}{" "} */}
              {convertToInternationalCurrencySystem(
                kpisStore.kpis?.total_transactions
              )}
            </Text>
          </Stack>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack>
            <Text c="#4262A9"> Transactions Count </Text>
            <Text c="#4262A9" fw={700} ta="center">
              {convertToInternationalCurrencySystem(
                kpisStore.kpis?.transactions_count
              )}
            </Text>
          </Stack>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack>
            <Text c="#4262A9"> Avg price/meter </Text>
            <Text c="#4262A9" fw={700} ta="center">
              {convertToInternationalCurrencySystem(
                kpisStore.kpis?.avg_price_per_meter
              )}
            </Text>
          </Stack>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack>
            <Text c="#4262A9"> Avg price/unit </Text>
            <Text c="#4262A9" fw={700} ta="center">
              {convertToInternationalCurrencySystem(
                kpisStore.kpis?.avg_price_per_unit
              )}
            </Text>
          </Stack>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack>
            <Text c="#4262A9"> Avg area/unit </Text>
            <Text c="#4262A9" fw={700} ta="center">
              {convertToInternationalCurrencySystem(
                kpisStore.kpis?.avg_area_per_unit
              )}
            </Text>
          </Stack>
        </Card>
      </Group>
      <Space h="xl" />

      <Space h="xl" />

      <Grid grow>
        <Grid.Col span={5}>
          {dataset2 && (
            <>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Stack align="stretch" justify="center" spacing={0}>
                  <Group position="apart" spacing="xl" p={10}>
                    <Text size="md" fw={700} ta="center">
                      Avg price per meter for property type
                    </Text>
                    <Stack align="flex-start">
                      <Group spacing={4}>
                        <ColorSwatch color={"#4262A9"} size={15} />{" "}
                        <Text size="xs"> Avg price per meter</Text>
                      </Group>
                      <Group spacing={4}>
                        <ColorSwatch color={"#4BB5B2"} size={15} />{" "}
                        <Text size="xs"> Transactions count</Text>
                      </Group>
                    </Stack>
                  </Group>
                  <Bar
                    ref={chartRef3}
                    options={options2}
                    data={dataset2}
                    onClick={onClick}
                  />
                  <Divider my={0}></Divider>

                  <Bar
                    ref={chartRef2}
                    options={options3}
                    onClick={onClick2}
                    data={dataset3}
                  />
                </Stack>
              </Card>
            </>
          )}
          <Space h="xl" />

          {predictions_chart && (
            <>
              <Stack>
                <Card shadow="sm" padding={40} radius="md" withBorder>
                  {" "}
                  <Container size={300}>
                    <Text size="md" fw={700} ta="center">
                      parcels predictions{" "}
                    </Text>
                    {/* <Space h="xl" /> */}
                    <DoughnutChart dataset={dataset6} total={parcel_count} />
                  </Container>
                </Card>
                <Card shadow="sm" padding={40} radius="md" withBorder>
                  <Container size={400}>
                    <Text size="md" fw={700} ta="center">
                      sakani/commercial{" "}
                    </Text>
                    {/* <Space h="xl" /> */}
                    <DoughnutChart
                      dataset={dataset7}
                      total={convertToInternationalCurrencySystem(sakani_count)}
                    />
                  </Container>
                </Card>
              </Stack>
            </>
          )}
        </Grid.Col>
        <Grid.Col span={5}>
          {dataset && (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Group position="apart" spacing="xl" p={10}>
                <Text size="md" fw={700} ta="center">
                  Transactions growth over time
                </Text>
                <Stack align="flex-start">
                  <Group spacing={4}>
                    <ColorSwatch color={"#37BADB"} size={15} />
                    <Text size="xs"> {measureType}</Text>
                  </Group>
                  <Group spacing={4}>
                    <ColorSwatch color={"#C6D936"} size={15} />
                    <Text size="xs"> Growth</Text>
                  </Group>
                </Stack>
              </Group>

              <Chart
                ref={chartRef}
                type="bar"
                data={dataset}
                // onClick={onClick}
                options={options}
              />
            </Card>
          )}
          {dataset3 && (
            <>
              <Space h="xl" />
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text size="md" fw={700} ta="center">
                  Avg price per sequare meter{" "}
                </Text>
                <Line options={options4} data={dataset4} />
              </Card>
            </>
          )}
          <Space h="xl" />
          {areas_chart && (
            <>
              <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Text size="md" fw={700} ta="center">
                  transaction count per area
                </Text>
                <BarChart dataset={dataset5} labels={true} />
                {/* <Bar
                  // ref={chartRef2}
                  options={options3}
                  // onClick={onClick2}
                  data={dataset5}
                /> */}
              </Card>
            </>
          )}
          <Space h="xl" />

          {top_10 && (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text size="md" fw={700} ta="center">
                Top 10 transactions
              </Text>
              <Space h="xl" />
              <TableChart list={top_10}></TableChart>{" "}
            </Card>
          )}
        </Grid.Col>
        <Grid.Col xs={4}></Grid.Col>
      </Grid>
    </>
  );
}
