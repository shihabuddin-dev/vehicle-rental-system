import { pool } from "../../config/db";

const addBooking = async (payload: any) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  // Get vehicle data
  const vehicle = await pool.query(
    `SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id = $1`,
    [vehicle_id]
  );

  if (vehicle.rows.length === 0) throw new Error("Vehicle not found");

  const { vehicle_name, daily_rent_price } = vehicle.rows[0];

  // Calculate total price
  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);
  const days = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  const total_price = days * daily_rent_price;

  // Insert booking
  const result = await pool.query(
    `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
     VALUES($1, $2, $3, $4, $5, 'active')
     RETURNING *`,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  return {
    booking: result.rows[0],
    vehicle: {
      vehicle_name,
      daily_rent_price,
    },
  };
};

export const bookingServices = {
  addBooking,
};
