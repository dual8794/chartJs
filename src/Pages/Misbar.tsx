import { Box } from "@mantine/core";

import Testing from "../components/testing";

export default function Misbar() {
  return (
    // <AppShell
    //   fixed
    //   // padding="md"
    //   navbar={
    //     <Navbar width={{ base: 100 }} height={"h-screen"} p="xs">
    //       {/* Navbar content */}
    //     </Navbar>
    //   }
    //   header={
    //     <Header height={60} p="xs" className="text-center">
    //       Chart js examples
    //     </Header>
    //   }
    //   styles={() => ({
    //     main: {
    //       width: "100%",
    //       backgroundColor: "#EBF0F6",
    //     },
    //   })}
    // >
    <Box
      py={50}
      px={200}
      sx={() => ({
        backgroundColor: "#EBF0F6",
      })}
    >
      <Testing />
    </Box>
    // </AppShell>
  );
}
