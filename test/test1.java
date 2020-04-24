package test;

import javax.swing.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import java.sql.*;
import java.io.File;
import java.util.Scanner;
import java.io.FileNotFoundException;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.Reader;
import java.sql.DriverManager;
import org.apache.ibatis.jdbc.ScriptRunner;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class test1 {

    @Before
    public void setUpTesting() {
        connection.setup_db();
    }
    
    @After
    public void teardownTesting() {
        connection.teardown_db();
    }

    @Test
    // This test makes sure that specific values are inserted into the DB correctly using the load data sql file
    public void test_select_accID() {

        /* I had to re-run the setup scripts for this type of test because it kept loading
           the original DB's data, this was the only fix - makes for a bit more tedious code */
           
        String accID, email, password;
        int balance;
        try {
            
            String query = "select * from Account";
            Connection myConn = DriverManager.getConnection(connection.url, connection.user, connection.password);
            
            ScriptRunner sr = new ScriptRunner(myConn);
            //teardown scripts
            Reader reader = new BufferedReader(new FileReader(".\\react-backend\\sql_scripts\\dbTeardownScript.sql"));
            //setup scripts
            Reader reader2 = new BufferedReader(new FileReader(".\\react-backend\\sql_scripts\\dbSetupScripts.sql"));
            //load test data
            Reader reader3 = new BufferedReader(new FileReader(".\\test\\loadTestData.sql"));
            sr.runScript(reader);
            sr.runScript(reader2);
            sr.runScript(reader3);

            Statement stmt = myConn.createStatement();
            ResultSet rs = stmt.executeQuery(query);
            rs.next();
            accID = rs.getString("accountID");
            email = rs.getString("email");
            password = rs.getString("password");
            balance = rs.getInt("balance");
            assertEquals(accID, "233333330");
            assertEquals(email, "unittest@gmail.com");
            assertEquals(password, "testP@ssword1");
            assertEquals(balance, 6000);
        }
        catch (Exception exc) {
            System.out.println("Error while executing query");
        }
     }
    
}


