DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS availabilities CASCADE;
DROP TABLE IF EXISTS shifts CASCADE;
DROP TABLE IF EXISTS vacations CASCADE;
DROP TABLE IF EXISTS budget CASCADE;

CREATE TABLE users (
-- Glen
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(55) NOT NULL,
  last_name VARCHAR(55) NOT NULL,
  employee_id VARCHAR(20) NOT NULL,
  account VARCHAR(20) NOT NULL,
  password VARCHAR(99) NOT NULL,
  role VARCHAR(10) NOT NULL,
  wage INTEGER NOT NULL,
  is_full_time BOOLEAN NOT NULL,
  able_to_lecture BOOLEAN NOT NULL,
  is_admin BOOLEAN NOT NULL,
  email VARCHAR(55),

-- Mentor
  phone VARCHAR(55),
  specialty VARCHAR(55),
  github TEXT,
  social_network TEXT,
  website TEXT,
  image_url TEXT
);

CREATE TABLE availabilities (
  id SERIAL PRIMARY KEY NOT NULL,
  day VARCHAR(10) NOT NULL,
  day_shift BOOLEAN NOT NULL,
  evening_shift BOOLEAN NOT NULL,
  note TEXT,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE shifts (
  id SERIAL PRIMARY KEY NOT NULL,
  shift_start INTEGER NOT NULL,
  shift_end INTEGER NOT NULL,
  duration INTEGER NOT NULL,
  date DATE NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE vacations (
  id SERIAL PRIMARY KEY NOT NULL,
  vacation_start DATE NOT NULL,
  vacation_end DATE NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE budget (
  id SERIAL PRIMARY KEY NOT NULL,
  mon_thurs_day INTEGER NOT NULL,
  mon_thurs_evening INTEGER NOT NULL,
  fri_day INTEGER NOT NULL,
  sat_day INTEGER NOT NULL
);

INSERT INTO users(
        first_name,
        last_name,
        employee_id,
        account,
        password,
        role,
        wage,
        is_full_time,
        able_to_lecture,
        is_admin,
        email,
        phone,
        specialty,
        github,
        social_network,
        website,
        image_url
      ) VALUES (
        'Glen',
        'Chua',
        'GC3333',
        'admin',
        123,
        'staff',
        1000000000,
        true,
        false,
        true,
        'sjs5953@hotmail.com',
        '778-680-9239',
        'ReactJS',
        'https://github.com/sjs5953',
        'https://www.facebook.com/jay.j.seo',
        'https://tripscheduler.netlify.com/',
        'https://scontent.fyvr3-1.fna.fbcdn.net/v/t1.0-9/70916219_2665159533518691_6489255603511230464_o.jpg?_nc_cat=101&_nc_sid=85a577&_nc_ohc=PKEt56Cx8KcAX-Q5VD5&_nc_ht=scontent.fyvr3-1.fna&oh=54fe7e1f08a90484cff664b7ded24fdc&oe=5E8F7D96'
      );
