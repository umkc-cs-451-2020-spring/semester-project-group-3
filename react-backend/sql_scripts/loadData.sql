use landonvolkmann_commerce_project;

 insert into
    Account (accountID, email, password, balance)
values
    (
        "211111110",
        "test@gmail.com",
        aes_encrypt("P@ssword1", "Gr0up3!2020"),
        5000.00
    );


call setTransaction(
    "211111110",
    "2019-11-01",
    "DR",
    2.00,
    "Starbucks"
);

call setTransaction(
    "211111110",
    "2019-12-01",
    "DR",
    35.00,
    "Gas"
);

call setTransaction(
    "211111110",
    "2020-01-12",
    "CR",
    100.00,
    "Payday"
);

call createNotificationTrigger(
'211111110',
'balanceBelow',
0.0,
null,
null,
'Your balance has fallen below ${amount}.');

