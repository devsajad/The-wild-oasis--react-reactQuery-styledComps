import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router";

function useBooking() {
  const { bookingId } = useParams();

  const { isPending: isBookingLoading, data: bookingData } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(Number(bookingId)),
  });

  return { isBookingLoading, bookingData };
}

export default useBooking;
