CREATE DEFINER=`landonvolkmann_admin`@`%` PROCEDURE `createNotificationTrigger`(
	associatedAccount varchar (320),
    type varchar (30),
    amount decimal(11, 2),
    value varchar(30),
    startDate date, -- user specified else today
    description varchar (320)
)
BEGIN 
    
    if startDate is not null then
    
	insert into NotificationTrigger (
		associatedAccount,
        type,
        amount,
        value,
        startDate,
        description
		)
	values (
		associatedAccount,
        type,
        amount,
        value,
        startDate,
        description
		);
	
    else
    
    	insert into NotificationTrigger (
		associatedAccount,
        type,
        amount,
        value,
        description
		)
	values (
		associatedAccount,
        type,
        amount,
        value,
        description
		);
	
    end if;
    
        

END