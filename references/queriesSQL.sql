
-- get all users
SELECT *
FROM JGOLDSTEIN3.Users;

--Get all empty appointments for a specific business
SELECT *
FROM JGOLDSTEIN3.Appointments apts
WHERE
    apts.customerid IS NULL AND
    apts.BusID = 93;

--get a specific appointment by id
SELECT *
FROM JGOLDSTEIN3.Appointments apts
WHERE
    apts.AppID = 24;

--Change the customer id for a specific appointment
UPDATE JGOLDSTEIN3.Appointments apts
    SET apts.customerid = 93
    WHERE apts.AppID = 24;

--Insert a new appointment into the table
INSERT INTO JGOLDSTEIN3.Appointments VALUES (101, 93, NULL, TO_TIMESTAMP('3:15 PM', 'HH:MI PM'), TO_TIMESTAMP('4:15 PM', 'HH:MI PM'), 44.34 , TO_DATE('2024-07-14', 'YYYY-MM-DD'));

--Remove specific appointments from the table.
DELETE
FROM JGOLDSTEIN3.Appointments apts
WHERE apts.AppID = 101;

--Get all the business data
SELECT *
FROM JGOLDSTEIN3.BusinessData biz;

--Get one specific storefront by id
SELECT *
FROM JGOLDSTEIN3.BusinessData biz
WHERE biz.BusID = 80;
