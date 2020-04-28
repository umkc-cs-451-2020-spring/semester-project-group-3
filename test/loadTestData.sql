-- use landonvolkmann_commerce_project;

insert into
	NotificationTriggerDescription (type, description)
values
	(
		"balanceBelow",
        "Balance has fallen below ${amount}."
	),
    (
		"transactionAmountAbove", 
		"Transaction amount greater than ${amount}."
	),
    (
		"descriptionContains",
        "Transaction with description containing ${value}."
    );

insert into
    Account (accountID, email, password, balance)
values
    (
        "233333330",
        "unittest@gmail.com",
        "testP@ssword1",
        6000.00
    );

call setTransaction(
    "233333330",
    "2019-11-01",
    "DR",
    2.00,
    "Starbucks"
);

call setTransaction(
    "233333330",
    "2019-12-01",
    "DR",
    20.00,
    "Gamestop"
);

call setTransaction(
    "233333330",
    "2019-12-01",
    "CR",
    1200.00,
    "Stimulus Check"
);

call createNotificationTrigger(
'233333330',
'balanceBelow',
0.0,
null,
null);

call createNotificationTrigger(
'233333330',
'descriptionContains',
null,
"Starbucks",
null);

call createNotificationTrigger(
'233333330',
'amountAbove',
100.0,
null,
null);