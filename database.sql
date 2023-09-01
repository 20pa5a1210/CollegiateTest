
CREATE TABLE students (
  studentid VARCHAR(10) PRIMARY KEY,
  name VARCHAR,
  branch VARCHAR,
  email VARCHAR,
  password VARCHAR,
  confirmpassword VARCHAR,
  status VARCHAR DEFAULT 'pending'
);

CREATE TABLE results (
  resultid SERIAL PRIMARY KEY,
  examid INT REFERENCES exams(examid),
  studentid VARCHAR(10) REFERENCES students(studentid),
  subjectid VARCHAR(15),
  totalmarks INT,
  marksobtained INT,
  totalduration INT,
  timetaken INT,
  submittedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE faculty (
  facultyemail VARCHAR PRIMARY KEY,
  facultyname VARCHAR,
  facultynumber VARCHAR,
  status VARCHAR DEFAULT 'pending',
  password VARCHAR,
  confirmpassword VARCHAR
);

CREATE TABLE subjects (
  subjectid VARCHAR(15) PRIMARY KEY,
  subjectname VARCHAR,
  facultyemail VARCHAR REFERENCES faculty(facultyemail)
);

CREATE TABLE feedback (
  feedbackid SERIAL PRIMARY KEY,
  studentid VARCHAR(10) REFERENCES students(studentid),
  facultyemail VARCHAR REFERENCES faculty(facultyemail),
  feedbackmessage VARCHAR
);

CREATE TABLE exams (
  examid SERIAL PRIMARY KEY,
  subjectid VARCHAR(15) REFERENCES subjects(subjectid),
  facultyemail VARCHAR REFERENCES faculty(facultyemail),
  starttime TIMESTAMP,
  endtime TIMESTAMP,
  totalmarks INT,
  passmarks INT,
  totalduration INT,
  createdat TIMESTAMP
);

CREATE TABLE questions (
  questionid SERIAL PRIMARY KEY,
  examid INT REFERENCES exams(examid),
  question VARCHAR,
  options JSONB,
  answer VARCHAR
);

CREATE TABLE announcements (
  announcementid SERIAL PRIMARY KEY,
  title VARCHAR,
  content TEXT,
  postedby VARCHAR,
  postedat TIMESTAMP
);

CREATE TABLE attemphistory (
  attemptid SERIAL PRIMARY KEY,
  studentid VARCHAR(10) REFERENCES students(studentid),
  examid INT REFERENCES exams(examid),
  attemptdate TIMESTAMP,
  score INT
);

CREATE TABLE studentanswers (
  answerid SERIAL PRIMARY KEY,
  resultid INT REFERENCES results(resultid),
  questionid INT REFERENCES questions(questionid),
  selectedanswer VARCHAR
);

CREATE TABLE admins (
  adminid SERIAL PRIMARY KEY,
  adminname VARCHAR,
  adminemail VARCHAR,
  password VARCHAR
;

