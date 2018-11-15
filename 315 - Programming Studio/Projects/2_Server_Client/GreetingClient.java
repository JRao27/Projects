import java.net.*;
import java.io.*;

public class GreetingClient {

   public static void checkGameConfig(String inputString) {//***Every parameter in string needs to be separeted by one space)
      int numHoles = Character.getNumericValue(inputString.charAt(0)); //Global variable in actual program
      int numSeeds = Character.getNumericValue(inputString.charAt(2)); //Global variable in actual program

      long num_holes = 0;
      int currIndex = 4;
      String timeLimit = "";
      boolean timeValid = true;
      while (timeValid) {
         num_holes = Character.getNumericValue(inputString.charAt(currIndex));
         String tempString = Long.toString(num_holes);

         if (num_holes != -1) { //Collects number of milliseconds until you reach a space
            timeLimit += tempString; 
         }  
         else {
            timeValid = false;
         }

         currIndex++;
    }
    num_holes = new Long(timeLimit).longValue();
    System.out.println("num_holes: " + num_holes); //Global variable in actual program

    // First or Second Player
    char first_second = inputString.charAt(currIndex);

    //Random or no random
    char standard_random = inputString.charAt(currIndex+2);
   }

   public static void checkHoleConfig(String inputString) {
      int stringCheck = 0;
      int boardIndex = 0;
      ArrayList<Integer> board = new ArrayList<Integer>();
      for (int i = 0; i < boardSize; i++) {
         board.add(i);
      }
    
      for (int i = 0; i < (boardSize*2); i++) {
         stringCheck = Character.getNumericValue(inputString.charAt(i));
         if (stringCheck != -1) {
            board.set(boardIndex, stringCheck);
            boardIndex++;
         }
      }
   
      for (int i = 0; i < boardSize; i++) {
         System.out.println("COME ON: " + board.get(i));
      }
   }

   public static void main(String [] args) {
      String serverName = args[0];
      int port = Integer.parseInt(args[1]);
      try {
         System.out.println("Connecting to " + serverName + " on port " + port);
         Socket client = new Socket(serverName, port);
         
         System.out.println("Just connected to " + client.getRemoteSocketAddress());
         OutputStream outToServer = client.getOutputStream();
         DataOutputStream out = new DataOutputStream(outToServer);
         

         out.writeUTF("Hello from " + client.getLocalSocketAddress());
         InputStream inFromServer = client.getInputStream();
         DataInputStream in = new DataInputStream(inFromServer);

         System.out.println("Server says " + in.readUTF());

         out.writeUTF("WELCOME");

         String testString = in.readUTF();
         System.out.println("YES: " + testString);
         /*
         boolean dog = true;
         if (dog) {
            out.writeUTF("READY");
         }
         */
         //If we receive certain signals
         /*
         if ()



         */

/*
         InputStream secondFrom = client.getInputStream();
         DataInputStream second_ = new DataInputStream(secondFrom);

         System.out.println("CAKE: " + in.readUTF());
*/
         /*
         OutputStream twoToServer = client.getOutputStream();
         
         DataOutputStream twoOutput = new DataOutputStream(twoToServer);

         twoOutput.writeUTF(" " + client.getLocalSocketAddress());

       //  System.out.println("SDLKF");
         InputStream twoFromServer = client.getInputStream();
         DataInputStream two = new DataInputStream(twoFromServer);

        // System.out.println("test: " + two.readUTF());
         */

         client.close();
      } catch (IOException e) {
         e.printStackTrace();
      }
   }
}