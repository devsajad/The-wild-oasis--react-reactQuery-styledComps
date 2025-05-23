import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../../utils/constants";

function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Pagination
  const page = +searchParams.get("page") || 1;

  // Filtering
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          method: "eq",
          field: "status",
          value: filterValue,
        };

  // Sorting
  const sortByValue = searchParams.get("sortBy");
  let sort;
  if (!sortByValue) {
    sort = null;
  } else {
    const [field, direction] = sortByValue.split("-");
    sort = { field, direction };
  }

  const { isPending: isBookingsLoading, data: { data: bookings, count } = {} } =
    useQuery({
      queryKey: ["bookings", filter, sort, page],
      queryFn: () => getBookings({ filter, sort, page }),
    });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page + 1],
      queryFn: () => getBookings({ filter, sort, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, page - 1],
      queryFn: () => getBookings({ filter, sort, page: page - 1 }),
    });

  return { isBookingsLoading, bookings, count };
}

export default useBookings;
