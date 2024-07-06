-- Create Users Table
create table Users
  (UserId integer,
   Username varchar2(25) not null,
   Password varchar2(25) not null,
   UserType varchar2(25) not null,
   Email varchar2(50) not null,
   FullName varchar2(50) not null,
   PhoneNum varchar2(25) not null,
   primary key (UserId));

-- Create BusinessData Table
create table BusinessData
  (BusID integer,
   UserId integer,
   BusName varchar2(50) not null,
   Address varchar2(75) not null,
   Lat NUMBER(9,6),
   Lon NUMBER(9,6),
   PrfDesc varchar2(75) not null,
   primary key (BusID));

-- Create Appointments Table
create table Appointments
  (AppID integer,
   BusID integer,
   CustomerId integer,
   StartTime TIMESTAMP not null,
   EndTime TIMESTAMP not null,
   Price NUMBER(10,2) not null,
   AppDate DATE not null,
   primary key (AppID));

-- Create BusinessMetrics Table
create table BusinessMetrics
  (MetricID integer,
   BusID integer,
   BookingAMT integer,
   RatingAVG NUMBER(10,2) not null,
   primary key (MetricID));

-- Create Reviews Table
create table Reviews
  (ReviewID integer,
   CustomerId integer,
   BusID integer,
   Rating integer,
   Comment varchar2(75) not null,
   primary key (ReviewID));