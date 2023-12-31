import { AppShell, Container, Grid, Header, Navbar } from "@mantine/core";
import MultitypeChart from "../components/MultitypeChart";
import { LineChart } from "../components/LineChert";
import { Test } from "../components/test";

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
      styles={() => ({
        main: {
          width: "90vw",
          backgroundColor: "#EBF0F6",
        },
      })}
    >
      <Container size="md">
        <Grid grow>
          <Grid.Col span={6}>{/* <BarChart /> */}</Grid.Col>
          <Grid.Col span={4}>{/* <DoughnutChart /> */}</Grid.Col>
          <Grid.Col span={6}>
            <MultitypeChart />
          </Grid.Col>
          <Grid.Col span={6}>
            <LineChart />
          </Grid.Col>
          <Grid.Col span={6}>
            <Test />
          </Grid.Col>
        </Grid>
      </Container>
    </AppShell>
  );
}
