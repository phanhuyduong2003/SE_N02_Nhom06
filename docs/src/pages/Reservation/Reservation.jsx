import React, { useEffect, useState } from "react";
import { Card, Container } from "./ReservationStyle";
import { Button, Modal } from "antd";
import { getDatabase } from "firebase/database";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "@firebase/firestore";

export default function Reservation() {
  const [visible, setVisible] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [name, setName] = useState("");
  const [license, setLicense] = useState("");
  const [parking, setParking] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const handleClick = (reservation) => {
    setSelectedReservation(reservation);
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    const database = getFirestore();
    const reservationsCollection = collection(database, "reservations");
    deleteDoc(doc(reservationsCollection, selectedReservation.id)).then(() => {
      const updatedReservations = reservations.filter(
        (reservation) => reservation.id !== selectedReservation.id
      );
      setReservations(updatedReservations);
    });
    handleOk();
  };
  useEffect(() => {
    const database = getFirestore();
    const reservationsCollection = collection(database, "reservations");
    getDocs(reservationsCollection).then((snapshot) => {
      const reservationsData = snapshot.docs.map((doc) =>{return {id: doc.id, ...doc.data()}});
      setReservations(reservationsData);
    });
  }, []);

  return (
    <Container>
      {reservations.length > 0 ? (
        reservations.map((reservation) => {
          return (
            <>
              <Card
                onClick={() => handleClick(reservation)}
                key={reservation.id}
              >
                <img
                  src="https://avatars.mds.yandex.net/get-games/1890793/2a0000017a7330f722220f4437d9dabb4093/orig"
                  alt=""
                  style={{ width: "300px", objectFit: "cover" }}
                />
                <p>Họ tên: {reservation.name}</p>
                <p>Biển số xe: {reservation.license}</p>
              </Card>
            </>
          );
        })
      ) : (
        <p>Không có đặt chỗ nào được tìm thấy.</p>
      )}
      {selectedReservation && (
        <Modal open={visible} footer={[]} key={selectedReservation.id}>
          <p>Họ tên: {selectedReservation.name}</p>
          <p>Biển số xe: {selectedReservation.license}</p>
          <p>Bãi đỗ xe: {selectedReservation.parking} </p>
          <p>Thời gian gửi:</p>
          <p>
            Từ {selectedReservation.start} đến {selectedReservation.end}{" "}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={handleCancel}>Huỷ đặt chỗ</Button>
            <Button type="primary" onClick={handleOk}>
              OK
            </Button>
          </div>
        </Modal>
      )}
    </Container>
  );
}
