import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useSearchParams } from "react-router";
import { subDays } from "date-fns";

function useRecentStays() {
  const [searchParams] = useSearchParams();
  // Get the number of days we want (before today) for example last 7 day
  const numDays = Number(searchParams.get("last")) || 7;
  // Convert date of that day exp. date of last 7 day
  const queryDate = subDays(new Date(), numDays).toISOString();

  // Query to get the bookings after that day
  const { data: stays, isPending: isStaysLoading } = useQuery({
    queryKey: ["stays", numDays],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  //   filter just checked-in & checked-out stays
  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { stays, isStaysLoading, confirmedStays };
}

export default useRecentStays;
