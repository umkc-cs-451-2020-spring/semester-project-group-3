package test;

import javax.swing.*;

import org.junit.Test;

import java.sql.*;
import java.io.File;
import java.util.Scanner;
import java.io.FileNotFoundException;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class test1 {

    @Test
    public void test123() {
        assertEquals(connection.connect_db(), "211111110");
    }
    
}

// public class test1 {
//     public static void main(String[] args) {

//         connection.connect_db();

// }

// }

