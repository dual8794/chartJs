import { Table } from "@mantine/core";

interface Props {
  list: any | undefined;
}

export function TableChart(props: Props) {
  const rows = props.list.map((element: any, index: number) => (
    <tr key={element.number}>
      <td>{element.location}</td>
      <td>{element.value}</td>
      <td>{element.area}</td>
      <td>{element.price}</td>
      <td>{index + 1}</td>
    </tr>
  ));

  return (
    <Table
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        // textAlign: "center",
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        cursor: "pointer",

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[5]
              : theme.colors.gray[1],
        },
      })}
    >
      <thead>
        <tr>
          <th>Transaction Location</th>
          <th>Total Value</th>
          <th>Total Area</th>
          <th>Meter Price</th>
          <th>Rank</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
