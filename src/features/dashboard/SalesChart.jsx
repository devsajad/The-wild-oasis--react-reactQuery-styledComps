import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useDarkMode from "../../hooks/useDarkMode";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as={"h2"}>
        Sales from {format(allDates.at(0), "MMM dd yyyy")} to{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}
      </Heading>

      {/* Make the Chart container responsive by this comp and with 100% */}
      <ResponsiveContainer width={"100%"} height={400}>
        {/* Data Array */}
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="4" />

          {/* X axis will be value of the dataKey */}
          <XAxis
            dataKey="label"
            // change color of X axis texts (pass normal css in object)
            tick={{ fill: colors.text }}
            // change color of x axis line above texts
            tickLine={{ stroke: colors.text }}
          />

          {/* Add Y axis */}
          <YAxis
            unit={" $"}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />

          {/* Add tooltip when hover on Chart */}
          <Tooltip
            // Change Style of tooltip
            contentStyle={{ backgroundColor: colors.background }}
          />

          {/* Y axis will be value of the dataKey */}
          <Area
            type="monotone"
            dataKey="totalSales"
            strokeWidth={2}
            // Change color of the area strok and fill
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            //
            name="Total Sales"
            unit={" $"}
          />

          <Area
            type="monotone"
            dataKey="extrasSales"
            strokeWidth={2}
            // Change color of the area strok and fill
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            //
            name="Total Sales"
            unit={" $"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
