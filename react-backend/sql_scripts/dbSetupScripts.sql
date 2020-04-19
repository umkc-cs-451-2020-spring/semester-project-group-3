use landonvolkmann_commerce_project;

create table Account (
    accountID varchar(320) not null,
    email varchar(320) not null,
    password varchar(512) not null,
    balance decimal,
    lastNotificationCheck datetime default current_timestamp,
    primary key (accountID)
) engine = InnoDB;

create table Transaction (
    transactionID int(11) not null auto_increment,
    associatedAccount varchar (320),
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

create table NotificationTrigger (
    notificationTriggerID int(11) not null auto_increment,
    associatedAccount varchar (320),
    type varchar (30),
	active bool default true,
    amount decimal(11, 2),
    value varchar(30),
    startDate datetime default current_timestamp,
    description varchar (320),
    primary key (notificationTriggerID)
) engine = InnoDB;

alter table
    NotificationTrigger
add
    foreign key(associatedAccount) references Account(accountID);

create table Notification (
    notificationID int(11) not null auto_increment,
	type varchar (30),
    processingDate datetime,
    description varchar (320),
    primary key (notificationID)
) engine = InnoDB;