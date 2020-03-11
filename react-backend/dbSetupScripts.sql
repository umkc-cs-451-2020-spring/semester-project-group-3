use landonvolkmann_commerce_project;

drop table Account;
create table Account
(
    accountID varchar(320) not null,
    email varchar(320) not null,
    password varchar(512) not null,
    balance decimal,
    primary key (accountID)
)
engine=InnoDB;

drop table Transaction;
create table Transaction
(
    transactionID int(11) not null
    auto_increment,
	associatedAccount varchar
    (320) unique,
	processingDate date not null,
	type varchar
    (30),
	amount decimal unsigned,
	description varchar
    (320),
	primary key
    (transactionID)
)engine=InnoDB;
    alter table Transaction add foreign key(associatedAccount) references Account(accountID);

    drop table NotificationTrigger;
    create table NotificationTrigger
    (
        notificationTriggerID int(11) not null
        auto_increment,
	associatedAccount varchar
        (320) unique,
	type varchar
        (30),
	description varchar
        (320),
	primary key
        (notificationTriggerID)
)engine=InnoDB;
        alter table NotificationTrigger add foreign key(associatedAccount) references Account(accountID);

        drop table Notification;
        create table Notification
        (
            notificationID int(11) not null
            auto_increment,
	associatedNotificationTrigger int
            (11) not null,
    sentDateTime datetime,
	description varchar
            (320),
	primary key
            (notificationID)
)engine=InnoDB;
            alter table Notification add foreign key(associatedNotificationTrigger) references NotificationTrigger(notificationTriggerID);


            insert into Account
                (accountID, email, password, balance)
            values
                ("211111110", "test@gmail.com", "P@ssword1", 5000.00);
            insert into Transaction
                (associatedAccount, processingDate, type, amount, description)
            values
                ("211111110", "2019-11-01", "DR", 2.00, "Starbucks");



            select *
            from Account;
            select *
            from Transaction;