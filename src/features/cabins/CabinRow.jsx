import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { HiDuplicate, HiPencil, HiTrash } from "react-icons/hi";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteCabin from "./useDeleteCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { discount, maxCapacity, regularPrice, name, image, id } = cabin;
  const { removeCabin, isDeletingCabin } = useDeleteCabin();
  const { createCabin } = useCreateCabin();

  function handleClickDuplicate() {
    createCabin({
      discount,
      maxCapacity,
      regularPrice,
      image,
      name: `copy of ${cabin.name}`,
    });
  }

  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{discount === 0 ? "-" : formatCurrency(discount)}</Discount>
        <div>
          <Modal>
            <Modal.Window name="cabin-edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="cabin-delete">
              <ConfirmDelete
                resourceName="Cabin"
                onConfirm={() => removeCabin(id)}
                disabled={isDeletingCabin}
              />
            </Modal.Window>

            <Menus.Menu>
              <Menus.Toggle id={id} />

              <Menus.List id={id}>
                <Menus.Button
                  icon={<HiDuplicate />}
                  onClick={handleClickDuplicate}
                >
                  Duplicate
                </Menus.Button>

                <Modal.Open opens="cabin-edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="cabin-delete">
                  <Menus.Button
                    icon={<HiTrash />}
                    onClick={() => removeCabin(id)}
                  >
                    Remove
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
