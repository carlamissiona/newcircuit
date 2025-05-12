const { Pool } = require('pg');

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

const pool = new Pool({
  user: "carlamissiona",
  host: "ep-round-moon-a1obo7oq-pooler.ap-southeast-1.aws.neon.tech",
  database: "hvneon",
  password: "yhxjpBia4MA6", 
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

//postgresql://carlamissiona:yhxjpBia4MA6@ep-round-moon-a1obo7oq-pooler.ap-southeast-1.aws.neon.tech/hvneon?sslmode=require

/*


CREATE TABLE public.hvt_users (
    id serial NOT NULL,
    hvtu_details_session int8 NULL,
    hvtu_details_user VARCHAR(1028) NULL,
    hvtu_password VARCHAR(128) NULL,
    hvtu_ip VARCHAR(32) NULL,
    hvtu_visit_last DATE NULL,
    hvtu_enabled bool NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE TABLE public.nc_users (
    id serial NOT NULL,
    nc_details_session int8 NULL,
    nc_details_user VARCHAR(1028) NULL,
    nc_email CHARACTER VARYING(100) NULL,
    nc_password VARCHAR(128) NULL,
    nc_ip VARCHAR(32) NULL,
    nc_visit_last DATE NULL,
    nc_enabled bool NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);




   INSERT INTO users (
        nc_details_user , nc_email,  nc_password,  
      ) VALUES ("user details" , "admin@example.com, "pass") RETURNING *,


*/

// User CRUD Operations
const createUserDB = async (userData) => {
  const { name, email, hpassword, role = 'user' } = userData;
  const query = `
    INSERT INTO nc_users (nc_details_user, nc_email,  nc_password, created_at) 
    VALUES ($1, $2, $3, NOW())
    RETURNING id,  created_at
  `;
 
  const details = `Name: ${name}, Role: ${role} ` ;  
  const values = [details, email, hpassword];
  
  try {

    const result = await pool.query(query, values);
    console.log("DB results ");
    console.log(result);

    return result.rows[0];

  } catch (error) {
    console.log("error");
    console.log(error);
    throw new Error(`Error creating user: ${error.message}`);
  }
};

const getUserByEmailDB = async (email) => {
  console.log("@ getUserByEmailDB");
  const query = 'SELECT * FROM nc_users WHERE nc_email = $1';
  
  try {
    const result = await pool.query(query, [email]);
    return result.rows[0];
  } catch (error) {
    console.log("error");
    console.log(error);
    throw new Error(`Error getting user by email: ${error.message}`);
  }
};

const getUserByIdDB = async (id) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  
  try {
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error getting user by id: ${error.message}`);
  }
};

const updateUserDB = async (id, userData) => {
  const { name, email, password, role } = userData;
  const updates = [];
  const values = [];
  let valueCount = 1;

  if (name) {
    updates.push(`name = $${valueCount}`);
    values.push(name);
    valueCount++;
  }
  if (email) {
    updates.push(`email = $${valueCount}`);
    values.push(email);
    valueCount++;
  }
  if (password) {
    updates.push(`password = $${valueCount}`);
    values.push(password);
    valueCount++;
  }
  if (role) {
    updates.push(`role = $${valueCount}`);
    values.push(role);
    valueCount++;
  }

  values.push(id);
  const query = `
    UPDATE users 
    SET ${updates.join(', ')}, updated_at = NOW()
    WHERE id = $${valueCount}
    RETURNING id, name, email, role, created_at, updated_at
  `;

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

const deleteUserDB = async (id) => {
  const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
  
  try {
    const result = await pool.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

module.exports = {
  pool,
  createUserDB,
  getUserByEmailDB,
  getUserByIdDB,
  updateUserDB,
  deleteUserDB
};