package test;

import javax.swing.*;
import java.sql.*;
import java.io.File;
import java.util.Scanner;
import java.io.FileNotFoundException;

public class connection {

    static final String JDBC_DRIVER = "org.mariadb.jdbc.Driver";
    static final String DB_URL = "jdbc:mariadb://landonvolkmann.com/landonvolkmann_commerce_project";

    public static void main(String[] args) {
        

    }

    public static String connect_db() { //String str1, String str2

        String url = "jdbc:mariadb://landonvolkmann.com/landonvolkmann_commerce_project";
        String user = "landonvolkmann_admin";
        String password = "Gr0up3!2020";

        String TEST = "";

        try {
            Class.forName("org.mariadb.jdbc.Driver");
            Connection myConn = DriverManager.getConnection(url, user, password);
            Statement myStmt = myConn.createStatement();
            ResultSet rs = myStmt.executeQuery("select * from Account");   //str1
            // while (rs.next()) {
            // System.out.println(rs.getString("accountID") + ", " + rs.getString("email"));
            // }
            rs.next();
            TEST = rs.getString("accountID");
            return TEST;

            // System.out.println(rs.getString("accountID"));    //str2
            // rs = myStmt.executeQuery("select * from Notification");
            // rs.next();
            // System.out.println(rs.getString("notificationID"));

        } catch (Exception exc) {
            exc.printStackTrace();
        }
        return TEST;
    }

    // public void set_myConn()

    

    public String tearDownStr() {
        String tearDownStr = "";
        try {
            tearDownStr = new Scanner(new File(".\\react-backend\\sql_scripts\\dbTeardownScript.sql")).useDelimiter("\\Z").next();
            return tearDownStr;
        }
        catch (FileNotFoundException e) {
        System.out.println("An error occurred.");
        e.printStackTrace();
    }
        return tearDownStr;
    }

    public String setUpStr() {
        String setUpStr = "";
        try {
            setUpStr = new Scanner(new File(".\\react-backend\\sql_scripts\\dbSetupScripts.sql")).useDelimiter("\\Z").next();
            return setUpStr;
        }
        catch (FileNotFoundException e) {
        System.out.println("An error occurred.");
        e.printStackTrace();
    }
        return setUpStr;
    }

    public String loadData() {
        String loadDataStr = "";
        try {
            loadDataStr = new Scanner(new File(".\\react-backend\\sql_scripts\\dbSetupScripts.sql")).useDelimiter("\\Z").next();
            return loadDataStr;
        }
        catch (FileNotFoundException e) {
        System.out.println("An error occurred.");
        e.printStackTrace();
    }
        return loadDataStr;
    }
    

}