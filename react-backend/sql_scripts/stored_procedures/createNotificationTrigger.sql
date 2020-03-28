DELIMITER $ $ CREATE DEFINER = `landonvolkmann_admin` @`%` PROCEDURE `createNotificationTrigger`(
    associatedAccount varchar (320),
    type varchar (30),
    amount decimal(11, 2),
    startDate date,
    -- user specified else today
    description varchar (320)
) BEGIN if startDate is not null then
insert into
    NotificationTrigger (
        associatedAccount,
        type,
        amount,
        startDate,
        description
    )
values
    (
        associatedAccount,
        type,
        amount,
        startDate,
        description
    );

else
insert into
    NotificationTrigger (
        associatedAccount,
        type,
        amount,
        description
    )
values
    (
        associatedAccount,
        type,
        amount,
        description
    );

end if;

END $ $ DELIMITER;