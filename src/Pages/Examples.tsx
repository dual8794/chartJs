import {
  AppShell,
  Container,
  Grid,
  Group,
  Header,
  Navbar,
} from "@mantine/core";
import BarChart from "../components/BarChart";
import { DoughnutChart } from "../components/DoughnutChart";
import { MultitypeChart } from "../components/MultitypeChart";
import { LineChart } from "../components/LineChert";

export default function Examples() {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 150 }} height={"h-screen"} p="xs">
          {/* Navbar content */}
        </Navbar>
      }
      header={
        <Header height={60} p="xs" className="text-center">
          Chart js examples
        </Header>
      }
      styles={(theme) => ({
        main: {
          width: "90vw",
          backgroundColor: "#EBF0F6",
        },
      })}
    >
      <Container size="md">
        <Grid grow>
          <Grid.Col span={6}>
            <BarChart />
          </Grid.Col>
          <Grid.Col span={4}>
            <DoughnutChart />
          </Grid.Col>
          <Grid.Col span={6}>
            <MultitypeChart />
          </Grid.Col>
          <Grid.Col span={6}>
            <LineChart />
          </Grid.Col>
        </Grid>
      </Container>
    </AppShell>
  );
}
