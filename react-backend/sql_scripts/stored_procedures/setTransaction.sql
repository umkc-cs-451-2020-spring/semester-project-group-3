DELIMITER $ $ CREATE DEFINER = `landonvolkmann_admin` @`%` PROCEDURE `setTransaction`(
    associatedAccount varchar(320),
    processingDate date,
    type varchar(30),
    amount decimal unsigned,
    description varchar(320)
) MODIFIES SQL DATA BEGIN declare historicBalance decimal unsigned default 0.0;

if type = 'DR' then
update
    Account
set
    balance = balance - amount
where
    accountID = associatedAccount;

select
    balance into historicBalance
from
    Account
where
    accountID = associatedAccount;

elseif type = 'CR' then
update
    Account
set
    balance = balance + amount
where
    accountID = associatedAccount;

select
    balance into historicBalance
from
    Account
where
    accountID = associatedAccount;

end if;

insert into
    Transaction (
        associatedAccount,
        processingDate,
        type,
        amount,
        description,
        historicBalance
    )
values
    (
        associatedAccount,
        processingDate,
        type,
        amount,
        description,
        historicBalance
    );

END $ $ DELIMITER;