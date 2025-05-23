import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import useCheckin from "./useCheckin";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();

  const { isBookingLoading, bookingData } = useBooking();
  const [payConfirmed, setPayConfirmed] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { checkin, isCheckinLoading } = useCheckin();
  const { settings, isSettingsLoading } = useSettings();

  useEffect(() => {
    if (bookingData) {
      setPayConfirmed(bookingData.isPaid);
    }
  }, [bookingData]);

  function handleCheckinClick() {
    if (!payConfirmed) return;

    if (addBreakfast)
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: optionalBreakfastPrice + totalPrice,
        },
      });
    else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  if (isBookingLoading || isSettingsLoading || isCheckinLoading)
    return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    // isPaid,
  } = bookingData;

  const optionalBreakfastPrice = settings.breakfast * numGuests * numNights;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={bookingData} />
      {hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setPayConfirmed(false);
            }}
            id={"breakfast"}
          >
            wants to add breakfast for {formatCurrency(optionalBreakfastPrice)}{" "}
            ?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={payConfirmed}
          disabled={isCheckinLoading || payConfirmed}
          onChange={() => setPayConfirmed((p) => !p)}
          id={"confirm"}
        >
          I confirmed that {guests.fullName} has paid the total amount of{" "}
          {formatCurrency(totalPrice + optionalBreakfastPrice)} (
          {formatCurrency(totalPrice)} +{" "}
          {formatCurrency(optionalBreakfastPrice)} )
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckinClick}
          disabled={!payConfirmed || isCheckinLoading}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
