import { AppShell, Container, Header, Navbar } from "@mantine/core";

import MultitypeChart from "../components/MultitypeChart";
// import Testing from "../components/testing";

export default function Misbar() {
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
        <MultitypeChart />
        {/* <Testing /> */}
      </Container>
    </AppShell>
  );
}
