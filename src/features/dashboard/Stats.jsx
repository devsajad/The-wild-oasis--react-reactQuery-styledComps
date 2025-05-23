import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1.
  const numBookings = bookings.length;

  // 2. Sales
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  //   3.
  const checkins = confirmedStays.length;

  // Stat 4)
  // We will use a trick to calculate occupancy rate. It's not 100% accurate, but we want to keep it simple. We know we can have a total of 'numDays * cabinCount' days to occupy, and we also know how many days were actually booked. From this, we can compute the percentage
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  return (
    <>
      <>
        <Stat
          icon={<HiOutlineBriefcase />}
          title="Bookings"
          value={numBookings}
          color="blue"
        />
        <Stat
          icon={<HiOutlineBanknotes />}
          title="Sales"
          value={formatCurrency(sales)}
          color="green"
        />
        <Stat
          icon={<HiOutlineCalendarDays />}
          title="Check ins"
          value={checkins}
          color="indigo"
        />
        <Stat
          icon={<HiOutlineChartBar />}
          title="Occupancy rate"
          value={Math.round(occupation * 100) + "%"}
          color="yellow"
        />
      </>
    </>
  );
}

export default Stats;
