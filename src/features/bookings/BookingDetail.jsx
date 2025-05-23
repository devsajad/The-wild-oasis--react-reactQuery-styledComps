import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiTrash,
} from "react-icons/hi2";
import useCheckout from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import useDeleteBooking from "./useDeleteBooking";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isBookingLoading, bookingData } = useBooking();

  const { checkout } = useCheckout();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { deleteBookingQuery, DeleteBookingLoading } = useDeleteBooking();

  if (!bookingData) return <Empty resource={"booking"} />;
  if (isBookingLoading || !bookingData) return <Spinner />;

  const { id: bookingId, status } = bookingData;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={bookingData} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens={"booking-delete"}>
            <Button variation="danger">remove</Button>
          </Modal.Open>

          <Modal.Window name={"booking-delete"}>
            <ConfirmDelete
              resourceName={`Booking #${bookingId}`}
              onConfirm={() =>
                deleteBookingQuery(bookingId, {
                  onSettled: moveBack,
                })
              }
              disabled={DeleteBookingLoading}
            />
          </Modal.Window>
        </Modal>

        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === "checked-in" && (
          <Button onClick={() => checkout(bookingId)}>Check out</Button>
        )}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
