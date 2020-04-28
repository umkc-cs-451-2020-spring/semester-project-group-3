CREATE DEFINER=`landonvolkmann_admin`@`%` PROCEDURE `createNotificationTrigger`(
	associatedAccount varchar (320),
    type varchar (30),
    amount decimal(11, 2),
    value varchar(30),
    startDate date -- user specified else today
)
BEGIN 
    
    if startDate is not null then
    
	insert into NotificationTrigger (
		associatedAccount,
        type,
        amount,
        value,
        startDate
		)
	values (
		associatedAccount,
        type,
        amount,
        value,
        startDate
		);
	
    else
    
    	insert into NotificationTrigger (
		associatedAccount,
        type,
        amount,
        value
		)
	values (
		associatedAccount,
        type,
        amount,
        value
		);
	
    end if;
    
        

END