import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router";
import { subDays } from "date-fns";

function useRecentBookings() {
  const [searchParams] = useSearchParams();
  // Get the number of days we want (before today) for example last 7 day
  const numDays = Number(searchParams.get("last")) || 7;
  // Convert date of that day exp. date of last 7 day
  const queryDate = subDays(new Date(), numDays).toISOString();

  // Query to get the bookings after that day
  const { data: bookings, isPending: isBookingsLoading } = useQuery({
    queryKey: ["bookings", numDays],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { bookings, isBookingsLoading , numDays };
}

export default useRecentBookings;
