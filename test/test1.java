package test;

import javax.swing.*;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.sql.*;
import java.io.File;
import java.util.Scanner;
import java.io.FileNotFoundException;
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
    public void test123() {
        
    //     assertEquals(connection.connect_db(), "233333330");
     }
    
}


