use landonvolkmann_commerce_project;

create table Account (
    accountID int(11) not null auto_increment,
    email varchar(320) not null,
    password varchar(512) not null,
    balance decimal,
    lastNotificationCheck datetime default current_timestamp,
    primary key (accountID)
) engine = InnoDB;

create table Transaction (
    transactionID int(11) not null auto_increment,
    associatedAccount int(11),
    processingDate datetime not null,
    type varchar (30),
    amount decimal unsigned,
    description varchar (320),
    historicBalance decimal,
    primary key (transactionID)
) engine = InnoDB;

alter table
    Transaction
add
    foreign key(associatedAccount) references Account(accountID);

create table NotificationTriggerDescription (
	type varchar (30) not null unique,
    description varchar(320),
    primary key (type)
) engine = InnoDB;

create table NotificationTrigger (
    notificationTriggerID int(11) not null auto_increment,
    associatedAccount int(11),
    type varchar (30) not null,
	active bool default true,
    amount decimal(11, 2),
    value varchar(30),
    startDate datetime default current_timestamp,
    primary key (notificationTriggerID)
) engine = InnoDB;

alter table
    NotificationTrigger
add
    foreign key(associatedAccount) references Account(accountID);

alter table
    NotificationTrigger
add
    foreign key(type) references NotificationTriggerDescription(type);

create table Notification (
    notificationID int(11) not null auto_increment,
    associatedAccount int(11),
	type varchar (30),
    processingDate datetime,
    description varchar (320),
    primary key (notificationID)
) engine = InnoDB;


alter table
    Notification
add
    foreign key(associatedAccount) references Account(accountID);