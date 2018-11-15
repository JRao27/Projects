// File Name GreetingServer.java
import java.net.*;
import java.io.*;
import java.util.*;

public class GreetingServer extends Thread {
   private ServerSocket serverSocket;
   long startTime = System.currentTimeMillis();
   long elapsedTime = 0L;

   Timer timer = new Timer();

   public GreetingServer(int port) throws IOException {
      serverSocket = new ServerSocket(port);
      serverSocket.setSoTimeout(30000);
      System.out.println("NEW SOCKET");
   }

   public void run() { //Adds new client
      int numClients = 0;
      while (true) {
         try {
            System.out.println("Waiting for client on port " + 
            serverSocket.getLocalPort() + "...");
            Socket server = serverSocket.accept();

            System.out.println("Just connected to " + server.getRemoteSocketAddress());
            DataInputStream in = new DataInputStream(server.getInputStream());
            
            String testString = in.readUTF();
            System.out.println("test: " + testString);
            DataOutputStream out = new DataOutputStream(server.getOutputStream());
            out.writeUTF("Thank you for connecting to " + server.getLocalSocketAddress()
               + "\nGoodbye!");

            String clientCheck = in.readUTF();

            out.writeUTF("HELLO THERE");
            if (clientCheck.equals("WELCOME")) {
               numClients++;
            }
            if (clientCheck.equals("READY")) {

            }
            if (clientCheck.equals("OK")) {
               
            }
            if (clientCheck.equals("ILLEGAL")) {
               
            }
            if (clientCheck.equals("TIME")) {
               
            }
            if (clientCheck.equals("LOSER")) {
               
            }
            if (clientCheck.equals("WINNER")) {
               
            }
            if (clientCheck.equals("TIE")) {
               
            }

            if (numClients == 2) {
               System.out.println("There are two clients");
               //and start the game now
            }
            
       //  if (elapsedTime > 30000) {
       //     System.out.println("TIME UP");
       //  }
        // elapsedTime = (new Date()).getTime() - startTime;
        // System.out.println("PLEASE ELAPSED: " + elapsedTime);

         server.close();
         } catch (SocketTimeoutException s) {
            System.out.println("Socket timed out!");
          //  elapsedTime = (new Date()).getTime() - startTime;
            System.exit(0);
            break;
         } catch (IOException e) {
            e.printStackTrace();
            break;
         }         
   }
   System.out.println("LEAVING RUN");
}

   public static void main(String [] args) {
      int port = Integer.parseInt(args[0]);
         try {
            Thread t = new GreetingServer(port);
            t.start();
            System.out.println("DOG");
         } catch (IOException e) {
            e.printStackTrace();
         }  
         System.out.println("LEAVING MAIN");
   }
}