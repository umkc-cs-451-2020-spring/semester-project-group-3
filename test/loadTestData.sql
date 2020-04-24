-- use landonvolkmann_commerce_project;

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