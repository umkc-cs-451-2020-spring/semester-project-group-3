package test;

import javax.swing.*;
import java.sql.*;
import java.io.File;
import java.util.Scanner;
import java.io.FileNotFoundException;
import org.apache.ibatis.jdbc.ScriptRunner;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.Reader;
import java.sql.DriverManager;


public class connection {

    static final String JDBC_DRIVER = "org.mariadb.jdbc.Driver";
    static final String DB_URL = "jdbc:mariadb://landonvolkmann.com/landonvolkmann_commerce_project";
    static final String url = "jdbc:mariadb://landonvolkmann.com/landonvolkmann_commerce_project";
    static final String user = "landonvolkmann_admin";
    static final String password = "Gr0up3!2020";
    
    public static Connection set_conn() {
        try {
            final Connection myConn = DriverManager.getConnection(url, user, password);
            return myConn;
        }
        catch (SQLException e) {
            System.out.println("Error while executing query");
            return null;
        }
    }
    

    public static void main(String[] args) {
        //setup_db();
        //teardown_db();
        

    }

    public static void setup_db() {

        try {
            Class.forName("org.mariadb.jdbc.Driver");
            Connection myConn = DriverManager.getConnection(url, user, password);

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

        } catch (Exception exc) {
            exc.printStackTrace();
        }
    }

    public static void teardown_db() {

        try {
            Class.forName("org.mariadb.jdbc.Driver");
            Connection myConn = DriverManager.getConnection(url, user, password);
            
            ScriptRunner sr = new ScriptRunner(myConn);
            //teardown scripts
            Reader reader = new BufferedReader(new FileReader(".\\react-backend\\sql_scripts\\dbTeardownScript.sql"));
            //setup scripts
            Reader reader2 = new BufferedReader(new FileReader(".\\react-backend\\sql_scripts\\dbSetupScripts.sql"));
            //load original DB data
            Reader reader3 = new BufferedReader(new FileReader(".\\react-backend\\sql_scripts\\loadData.sql"));
            sr.runScript(reader);
            sr.runScript(reader2);
            sr.runScript(reader3);

        } catch (Exception exc) {
            exc.printStackTrace();
        }
    }
}