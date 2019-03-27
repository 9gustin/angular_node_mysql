CREATE DATABASE ANGULAR_NODE_MYSQL;

use ANGULAR_NODE_MYSQL;

create table games (
    id varchar(50) PRIMARY KEY NOT NULL,
    name varchar(50) NOT NULL, 
    description varchar(200) not null,
    image varchar(300) not null,
    created_at timestamp default current_timestamp
);

describe games;
