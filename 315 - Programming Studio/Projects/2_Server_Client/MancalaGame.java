import java.awt.EventQueue;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Random;

import javax.swing.JOptionPane;

//MiniMax Tree Node Class
class TreeNode {
	
	//------------------------------------------------------------------------------------------------------------
	//~~VARIABLES~~
	//------------------------------------------------------------------------------------------------------------
	
	ArrayList<Integer> gameState;
	Integer heuristicValue = 0;
	Integer movePosition = 0;
	
    TreeNode parent;
    List<TreeNode> children;
    
    //------------------------------------------------------------------------------------------------------------
	//~~METHODS~~
	//------------------------------------------------------------------------------------------------------------
    
    public TreeNode() {
        this.children = new LinkedList<TreeNode>();
    }

    public TreeNode addChild(TreeNode child) {
        TreeNode childNode = child;
        childNode.parent = this;
        this.children.add(childNode);
        return childNode;
    }
}

//Mancala Game Class
public class MancalaGame {
	
	//------------------------------------------------------------------------------------------------------------
	//~~VARIABLES~~
	//------------------------------------------------------------------------------------------------------------
	
	//Player Names 
	protected static String player1 = "Player1";
	protected static String player2 = "Player2";
	
	//Global Time Limit Variable
	static int timeLimit = 30; 
	
	//Global Wraparound Variable
	static int wrapAround = 0;
	
	//House Selection
	private static int housePick = 0;
	
	//End Game Variable
	private static boolean endGame = false;
	
	//Used to keep track of levels of minimax tree
	private static int minMaxCount = 0;
	
	//Container For Each Side of the Board
	protected static ArrayList<Integer> board = new ArrayList<Integer>();
	
	//Fake board (AI)
	private static ArrayList<Integer> fakeBoard = new ArrayList<Integer>();
	
	//Board Size
	static int boardSize; 
	
	//Boolean for GUI ready flag
	protected static volatile boolean ready;
	
	//Boolean for Player Turn [true = Player1, false = Player2]
	protected static boolean player1Turn = true;
		
	//Boolean for Error Checking
	private static boolean error = false;
	
	//String for chosen house
	protected static int chosen;
	
	//String for Yes/No Random Distribution of Seeds
	protected static String comboBox_2var = "No";
		
	//String for # of seeds per house
	protected static String comboBoxvar = "4";
	
	//String for game type to send to server
	protected static String gameType = "Player vs. Player";
	
	//String for game time limit
	protected static String gameTimer;
	
	//Boolean to determine when to start game
	protected static volatile boolean startup = false;
	
	//Boolean used to trigger pie rule button on GUI
	protected static volatile boolean pieRuleEnabled = false;
	
	//Boolean used to notify the MancalaGame class whether or not the pie rule was pushed
	protected static volatile boolean pieRuleAccepted = false;
	
	//Boolean used to notify the GUI if AI is in use
	protected static volatile boolean AIEnabled = false;
		
	//Boolean used to notify the GUI when AI is done
	protected static volatile boolean AIInUse = false;
	
	//------------------------------------------------------------------------------------------------------------
	//~~METHODS~~
	//------------------------------------------------------------------------------------------------------------
	
	//Needs updating for server-client relations
	public static void setPlayerNames() {
		if (player1.equals("AI") || player1.equals("AI1") || player1.equals("AI2")
				|| player2.equals("AI") || player2.equals("AI1") || player2.equals("AI2")) {
			System.out.println("AI IS ENABLED");
			AIEnabled = true;
		}
	}
	
	//Updates time limit from GUI
	public static void updateTimeLimit() {
		if (gameTimer.equals("")) {
			timeLimit = 30;
		}
		else {
			timeLimit = Integer.parseInt(gameTimer);
		}
	}
	
	//Initializes the board given a board size and number of seeds per hole
	public static void boardInit(int boardSize, int numSeeds) {
		
		//Initializes boardSize variable
		MancalaGame.boardSize = boardSize;
		
		//Initializes p1's board
		for (int i = 0; i < boardSize; i++) {
			board.add(numSeeds);
		}
		
		//Initializes p1's mancala
		board.add(0);
		
		//Initializes p2's board
		for (int i = 0; i < boardSize; i++) {
			board.add(numSeeds);
		}
		
		//Initializes p2's mancala
		board.add(0);	
	}
	
	//Generates a heuristic for each future board (AI)
	public static int utility(boolean p1turncopy) {
		//Setting up initial variables
		int n = 0, AI_Mancala = 0, AI_Seeds = 0, your_Mancala = 0, your_Seeds = 0;
		
		//If AI is P1
		if (p1turncopy) {
			//Updating AI_Mancala
			AI_Mancala = fakeBoard.get(boardSize);
			
			//Updating AI_Seeds
			for (int i = 0; i < boardSize; i++) {
				AI_Seeds += fakeBoard.get(i);
			}
			//Updating your_Mancala
			your_Mancala = fakeBoard.get(boardSize*2+1);
			
			//Updating your_Seeds
			for (int i = boardSize+1; i < boardSize*2+1; i++) {
				your_Seeds += fakeBoard.get(i);
			}
		}
		//If AI is P2
		else if (!p1turncopy) {
			//Updating AI_Mancala
			AI_Mancala = fakeBoard.get(boardSize*2+1);
			
			//Updating AI_Seeds
			for (int i = boardSize + 1; i < boardSize*2+1; i++) {
				AI_Seeds += fakeBoard.get(i);
			}
			//Updating your_Mancala
			your_Mancala = fakeBoard.get(boardSize);
			
			//Updating your_Seeds
			for (int i = 1; i < boardSize; i++) {
				your_Seeds += fakeBoard.get(i);
			}
		}
		
		//Calculating n (our simple heuristic)
		n = 5*(AI_Mancala - your_Mancala) + 2*(AI_Seeds - your_Seeds);
		return n;
	}
	
	//Used to determine number of seeds in mancala given a player
	public int MancalaTracker(int playerNum) {		
		if (playerNum == 1) {
			return board.get(boardSize);
		}
		else if (playerNum == 2) {
			return board.get(2*boardSize-1);
		}
		else {
			System.out.println("ERROR: MANCALA TRACKER OUT OF BOUNDS");
			return 0;
		}
	}
	
	//Turn Handler for Player 1
	public static void p1Turn(int position) {
		//Converting from Logical Position to Array Position
		int pos = position-1;
		
		//Getting number of seeds in selected house
		int numSeeds = board.get(pos);
		
		//Checking for empty house
		if (numSeeds == 0) {
			System.out.println("That is not a valid house, please pick a correct one!");
			error = true;
			return;
		}
		
		//Checking for correct house
		if (pos > boardSize -1) {
			System.out.println("That is not your house, please pick a correct one!");
			error = true;
			return;
		}
		
		//Setting current house seeds = 0
		board.set(pos, 0);
		
		//Incrementing appropriate houses by 1 with wraparound
		int end = 0;
		int wrap = (boardSize * 2) + 2;
		int cycles = 0;
		int skipMancala = boardSize * 2 + 1;

		for (int i = 1; i <= numSeeds; i++) {
		  int newIndex = (pos + i) - (wrap * cycles);
			if (newIndex == wrap) {
				cycles++;
			}
					
		  newIndex = (pos + i) - (wrap * cycles);
					
			if (newIndex != skipMancala ) {
				 board.set(newIndex, board.get(newIndex)+1);
			}
			else {
					numSeeds++;
			}
			end = pos + i - (wrap * cycles);
		}
		if(end == boardSize) {
			player1Turn = true;
			return;
		}
		int distance = Math.abs(end - boardSize);
		boolean checkEndSide = end < boardSize;
		boolean checkEndEmpty = board.get(end) == 1;
		boolean checkAcross = board.get(boardSize + distance) > 0;
		if (checkEndSide && checkEndEmpty && checkAcross ) {
			int tempMancalaSize = board.get(boardSize + distance) + 1 + board.get(boardSize);
		
			board.set(boardSize, tempMancalaSize);
			board.set(end, 0);
			board.set(boardSize + distance, 0);
		}
		//Grants control to player 2
		error = false;
		player1Turn = false;
	}
		
	//Turn Handler for Player 1 AI
	public static void p1TurnFake(int position) {
		//Converting from Logical Position to Array Position
		int pos = position-1;
		
		//Getting number of seeds in selected house
		int numSeeds = fakeBoard.get(pos);
		
		//Checking for empty house
		if (numSeeds == 0) {
			System.out.println("That is not a valid house, please pick a correct one!");
			return;
		}
		
		//Checking for correct house
		if (pos > boardSize -1) {
			System.out.println("That is not your house, please pick a correct one!");
			return;
		}
		
		//Setting current house seeds = 0
		fakeBoard.set(pos, 0);
		
		//Incrementing appropriate houses by 1 with wraparound
		int end = 0;
		int wrap = (boardSize * 2) + 2;
		int cycles = 0;
		int skipMancala = boardSize * 2 + 1;

		for (int i = 1; i <= numSeeds; i++) {
		  int newIndex = (pos + i) - (wrap * cycles);
			if (newIndex == wrap) {
				cycles++;
			}
					
		  newIndex = (pos + i) - (wrap * cycles);
					
			if (newIndex != skipMancala ) {
				fakeBoard.set(newIndex, fakeBoard.get(newIndex)+1);
			}
			else {
					numSeeds++;
			}
			end = pos + i - (wrap * cycles);
		}
		if(end == boardSize) {
			//player1Turn = true;
			return;
		}
		int distance = Math.abs(end - boardSize);
		boolean checkEndSide = end < boardSize;
		boolean checkEndEmpty = fakeBoard.get(end) == 1;
		boolean checkAcross = fakeBoard.get(boardSize + distance) > 0;
		if (checkEndSide && checkEndEmpty && checkAcross ) {
			int tempMancalaSize = fakeBoard.get(boardSize + distance) + 1 + fakeBoard.get(boardSize);
		
			fakeBoard.set(boardSize, tempMancalaSize);
			fakeBoard.set(end, 0);
			fakeBoard.set(boardSize + distance, 0);
		}
	}
	
	//Turn Handler for Player 2
	public static void p2Turn(int position) {
		//Converting from Logical Position to Array Position
		int pos = position-1;
				
		//Getting number of seeds in selected house
		int numSeeds = board.get(pos);
		
		//Checking for empty house
		if (numSeeds == 0) {
			System.out.println("That is not a valid house, please pick a correct one!");
			error = true;
			return;
		}
		
		//Checking for correct house
		if (pos < boardSize +1 || pos == boardSize*2+1) {
			System.out.println("That is not your house, please pick a correct one!");
			error = true;
			return;
		}
				
		//Setting current house seeds = 0
		board.set(pos, 0);
				
		//Incrementing appropriate houses by 1 with wraparound
		int end = 0;
		int wrap = (boardSize * 2) + 2;
		int cycles = 0;
		int skipMancala = boardSize;
		//pos tells index the user selected
		//board.set(pos+i, board.get(pos+i) + 1);

		for (int i = 1; i <= numSeeds; i++) {
		  int newIndex = (pos + i) - (wrap * cycles);
			if (newIndex == wrap) {
				cycles++;
			}
					
		  newIndex = (pos + i) - (wrap * cycles);
					
			if (newIndex != skipMancala ) {
				 board.set(newIndex, board.get(newIndex)+1);
			}
			else {
					numSeeds++;
			}
			end = pos + i - (wrap * cycles);
		}
		if(end == boardSize*2+1) {
			player1Turn = false;
			return;
		}
		int distance = Math.abs(end - boardSize);
		boolean checkEndSide = (end > boardSize) && (end < ((boardSize * 2)+1));
		boolean checkEndEmpty = board.get(end) == 1;
		boolean checkAcross = board.get(boardSize - distance) > 0;
		if (checkEndSide && checkEndEmpty && checkAcross ) {
			int tempMancalaSize = board.get(boardSize - distance) + 1 + board.get((boardSize*2) + 1);
		
			board.set((boardSize*2) + 1, tempMancalaSize);
			board.set(end, 0);
			board.set(boardSize - distance, 0);
		}
		
		//Grants control back to player 1
		error = false;
		player1Turn = true;
	}

	//Turn Handler for Player 2 AI
	public static void p2TurnFake(int position) {
		//Converting from Logical Position to Array Position
		int pos = position-1;
				
		//Getting number of seeds in selected house
		int numSeeds = fakeBoard.get(pos);
		
		//Checking for empty house
		if (numSeeds == 0) {
			System.out.println("That is not a valid house, please pick a correct one!");
			//error = true;
			return;
		}
		
		//Checking for correct house
		if (pos < boardSize +1 || pos == boardSize*2+1) {
			System.out.println("That is not your house, please pick a correct one!");
			//error = true;
			return;
		}
				
		//Setting current house seeds = 0
		fakeBoard.set(pos, 0);
				
		//Incrementing appropriate houses by 1 with wraparound
		int end = 0;
		int wrap = (boardSize * 2) + 2;
		int cycles = 0;
		int skipMancala = boardSize;
		//pos tells index the user selected
		//board.set(pos+i, board.get(pos+i) + 1);

		for (int i = 1; i <= numSeeds; i++) {
		  int newIndex = (pos + i) - (wrap * cycles);
			if (newIndex == wrap) {
				cycles++;
			}
					
		  newIndex = (pos + i) - (wrap * cycles);
					
			if (newIndex != skipMancala ) {
				 fakeBoard.set(newIndex, fakeBoard.get(newIndex)+1);
			}
			else {
					numSeeds++;
			}
			end = pos + i - (wrap * cycles);
		}
		if(end == boardSize*2+1) {
			//player1Turn = false;
			return;
		}
		
		int distance = Math.abs(end - boardSize);
		boolean checkEndSide = (end > boardSize) && (end < ((boardSize * 2)+1));
		boolean checkEndEmpty = fakeBoard.get(end) == 1;
		boolean checkAcross = fakeBoard.get(boardSize - distance) > 0;
		if (checkEndSide && checkEndEmpty && checkAcross ) {
			int tempMancalaSize = fakeBoard.get(boardSize - distance) + 1 + fakeBoard.get((boardSize*2) + 1);
		
			fakeBoard.set((boardSize*2) + 1, tempMancalaSize);
			fakeBoard.set(end, 0);
			fakeBoard.set(boardSize - distance, 0);
		}
		
		//Grants control back to player 1
		//error = false;
		//player1Turn = true;
	}
	
	//Prints the board on console
	public static void printBoard() {
		//P2 on top
		for (int i = boardSize*2; i > boardSize; i--) {
			System.out.printf("   " + board.get(i));
		}
		System.out.printf("\n");
		
		//Mancalas
		System.out.print(board.get(boardSize*2+1));
		for (int i = 0; i < boardSize; i++) {
			System.out.printf("    ");
		}
		System.out.printf(" ");
		System.out.print(board.get(boardSize));
		System.out.printf("\n");
		
		//P1 on bottom
		for (int i = 0; i < boardSize; i++) {
			System.out.printf("   " + board.get(i));
		}
		System.out.printf("\n");
	}
	
	//Prints the fake board on console (AI)
	public static void printFakeBoard() {
		//P2 on top
		for (int i = boardSize*2; i > boardSize; i--) {
			System.out.printf("   " + fakeBoard.get(i));
		}
		System.out.printf("\n");
				
		//Mancalas
		System.out.print(fakeBoard.get(boardSize*2+1));
		for (int i = 0; i < boardSize; i++) {
			System.out.printf("    ");
		}
		System.out.printf(" ");
		System.out.print(fakeBoard.get(boardSize));
		System.out.printf("\n");
				
		//P1 on bottom
		for (int i = 0; i < boardSize; i++) {
			System.out.printf("   " + fakeBoard.get(i));
		}
		System.out.printf("\n");		
	}
	
	//Asks user for house input from console
	public static void requestHouse() {
		ready = false;
		housePick = -1;

		long startTime = System.currentTimeMillis();
		System.out.println("Please pick a house! You have " + timeLimit + " seconds: ");
		while ((System.currentTimeMillis() - startTime) < timeLimit * 1000) {
			if (ready) {
				housePick = chosen;
				System.out.println("You entered: " + housePick);
				return;
			} 
		}
		System.out.println("You did not answer fast enough!");
		endGame = true;
	}
	
	//Checks to see if either side of board has 0 seeds
	public static void checkEndGame() {
		//check for end of game
		int opponentSize = (boardSize*2)+1;
		int sizeSumOne = 0;
		int sizeSumTwo = 0;
		
		for (int i = 0; i < boardSize; i++) {
			sizeSumOne += board.get(i);
		}
		
		for (int i = boardSize + 1; i < opponentSize; i++) {
			sizeSumTwo += board.get(i);
		}
		
		if ((sizeSumOne == 0) || (sizeSumTwo == 0)) {
			endGame = true;
		}
	}
	
	//Prints end game results (score + winner/tie)
	public static void printEndGame() {
		System.out.println(player1 + " got a score of: " + board.get(boardSize));
		System.out.println(player2 + " got a score of: " + board.get(boardSize*2+1));
		
		//If player1 score is higher than player2
		if (board.get(boardSize) > board.get(boardSize*2+1)) {
			System.out.println(player1 + " wins!");
			JOptionPane.showMessageDialog(null, 
	                player1 + " wins with a score of: " + board.get(boardSize), 
	                "Game Over!", 
	                JOptionPane.WARNING_MESSAGE);
		}
		//If player2 score is higher than player1
		if (board.get(boardSize) < board.get(boardSize*2+1)) {
			System.out.println(player2 + " wins!");
			JOptionPane.showMessageDialog(null, 
	                player2 + " wins with a score of: " + board.get(boardSize*2+1), 
	                "Game Over!", 
	                JOptionPane.WARNING_MESSAGE);
		}
		
		//If tie
		if (board.get(boardSize) == board.get(boardSize*2+1)) {
			System.out.println("It's a tie!");
			JOptionPane.showMessageDialog(null, 
	                "It's a tie!", 
	                "Game Over!", 
	                JOptionPane.WARNING_MESSAGE);
		}
	}
	
	//Random number generator for p1
	public static int rngP1() {
		Random rand = new Random();
		int  n = rand.nextInt(boardSize) + 1;
		return n;
	}
	
	//Random number generator for p2
	public static int rngP2() {
		Random rand = new Random();
		int  n = rand.nextInt(boardSize) + boardSize + 2;
		return n;
	}
	
	//Pushes the remaining seeds into their appropriate mancala
	public static void endGameTotal() {
		int sizeSumOne = 0;
		int sizeSumTwo = 0;
		int secondMancala = (boardSize * 2) + 1;
		int opponentSize = (boardSize*2)+2;
		
		for (int i = 0; i < boardSize; i++) {
			sizeSumOne += board.get(i);
			board.set(i,0);
		}
		
		for (int i = boardSize + 1; i < opponentSize; i++) {
			sizeSumTwo += board.get(i);
			board.set(i,0);
		}
		
		//board.get(boardSize) += sizeSumOne;
		int tempOneSize = board.get(boardSize) + sizeSumOne;
		board.set(boardSize, tempOneSize);

		int tempTwoSize = board.get(secondMancala) + sizeSumTwo;
		board.set(secondMancala, tempTwoSize);//board.get(secondMancala) += sizeSumTwo;
	}
	
	//Requests boardSize from menu
	public static void boardSizeSetter() {
		/*Ask user what board size they want
		System.out.println("What size would you like each side of board to be? (Pick a number between 4-9)");
		Scanner user_input = new Scanner(System.in);
		boardSize = user_input.nextInt();
		*/
		
	}
	
	//Needs updating for server-client
	public static void houseSeedSetter() {
		String convert = comboBoxvar;
		int user_choice1 = Integer.parseInt(convert);
		if (comboBox_2var.equals("Yes")) {
			//Random distribution
			System.out.println("Randomized.");
			int totalSeeds = boardSize * user_choice1;
			for (int i = 0; i < boardSize; i++) {
				board.set(i, 1);
				board.set(i + boardSize + 1, 1);
				totalSeeds--;
			}
			
			int pos = 0;
			while (totalSeeds != 0) {
				Random rand = new Random();
				int  n = rand.nextInt(2);
				//Yes drop seed
				if (n == 1) {
					board.set(pos, board.get(pos) + 1);
					totalSeeds--;
				}
				pos++;
				if (pos == boardSize) {
					pos = 0;
				}
			}
			for (int i = 0; i < boardSize; i++) {
				board.set(i + boardSize + 1, board.get(i));
			}
		}
		else {
			//Not random
			System.out.println("Not Randomized.");
			for (int i = 0; i < boardSize; i++) {
				board.set(i, user_choice1);
				board.set(i + boardSize + 1, user_choice1);
			}
		}
		
		/* Asks user for number of seeds / distribution
		System.out.println("Please type the number of seeds per house: ");
		Scanner user_input1 = new Scanner(System.in);
		int user_choice1 = user_input1.nextInt();
		System.out.println("If you would like to randomly distribute those seeds, type RANDOM.");
		System.out.println("If not, type NO.");
		Scanner user_input2 = new Scanner(System.in);
		String user_choice2 = user_input2.next();
		//RANDOM
		if (user_choice2.equals("RANDOM")) {
			System.out.println("Randomized.");
			//FIX CODE TO RANDOMLY DISTRIBUTE
			int totalSeeds = boardSize * user_choice1;
			for (int i = 0; i < boardSize; i++) {
				board.set(i, 1);
				board.set(i + boardSize + 1, 1);
				totalSeeds--;
			}
			
			int pos = 0;
			while (totalSeeds != 0) {
				Random rand = new Random();
				int  n = rand.nextInt(2);
				//Yes drop seed
				if (n == 1) {
					board.set(pos, board.get(pos) + 1);
					totalSeeds--;
				}
				pos++;
				if (pos == boardSize) {
					pos = 0;
				}
			}
			for (int i = 0; i < boardSize; i++) {
				board.set(i + boardSize + 1, board.get(i));
			}
			
		}
		//NOT RANDOM
		else {
			System.out.println("Not Randomized.");
			for (int i = 0; i < boardSize; i++) {
				board.set(i, user_choice1);
				board.set(i + boardSize + 1, user_choice1);
			}
		}
		*/
	}
	
	//Generates a minimax tree given a parentNode and returns the best move choice
	public static int minMaxTree(TreeNode parentNode) {
	   	boolean firstPlayer = player1Turn;
	   	
	   	//First layer
	    if (firstPlayer) {  
	    	for (int i = 0; i < boardSize; i++) {
	    		TreeNode childNode1 = new TreeNode();
	    		fakeBoard = new ArrayList(parentNode.gameState);
	    		childNode1.gameState = fakeBoard;
	       
	    		//get fake board
	    		if (fakeBoard.get(i) != 0) {
	    			childNode1.movePosition = i+1;
	    			p1TurnFake(childNode1.movePosition);
	    			childNode1.gameState = fakeBoard;
	    			//printFakeBoard();
	    			childNode1.heuristicValue = utility(firstPlayer);
	    			//System.out.println(childNode1.heuristicValue);
	            }
	    		
	        	parentNode.addChild(childNode1);
	   		} 
	    }
	    else {
	    	int opponentStart = boardSize + 1;
	    	int opponentEnd = (boardSize * 2) + 1;
	      
	    	for (int i = opponentStart; i < opponentEnd; i++) {
	      		TreeNode childNode1 = new TreeNode();
	      		fakeBoard = new ArrayList(parentNode.gameState);
	      		childNode1.gameState = fakeBoard;
	          
	          	//get fake board
	      		if (fakeBoard.get(i) != 0) {
	      			childNode1.movePosition = i+1;
	      			p2TurnFake(childNode1.movePosition);
	      			childNode1.gameState = fakeBoard;
	      			//printFakeBoard();
	      			childNode1.heuristicValue = utility(firstPlayer);
	      		}
	      		parentNode.addChild(childNode1);
	   		}
	    }
	    firstPlayer = !firstPlayer;
	    
	    //Second Layer
	    if (firstPlayer) {  
	    	//For every child created in previous tree
	    	for (int j = 0; j < parentNode.children.size(); j++) {
		    	for (int i = 0; i < boardSize; i++) {
		    		TreeNode childNode2 = new TreeNode();
		    		fakeBoard = new ArrayList(parentNode.children.get(j).gameState);
		    		childNode2.gameState = fakeBoard;
		    		//get fake board
		    		if (fakeBoard.get(i) != 0) {
		    			childNode2.movePosition = i+1;
		    			p1TurnFake(childNode2.movePosition);
		    			childNode2.gameState = fakeBoard;
		    			//printFakeBoard();
		    			childNode2.heuristicValue = utility(firstPlayer);
		            }
		    		
		        	parentNode.children.get(j).addChild(childNode2);
		   		} 
	    	}
	    }
	    else {
	    	int opponentStart = boardSize + 1;
	    	int opponentEnd = (boardSize * 2) + 1;
	    	
	    	for (int j = 0; j < parentNode.children.size(); j++) {
		    	for (int i = opponentStart; i < opponentEnd; i++) {
		      		TreeNode childNode2 = new TreeNode();
		      		fakeBoard = new ArrayList(parentNode.children.get(j).gameState);
		      		childNode2.gameState = fakeBoard;
		          
		          	//get fake board
		      		if (fakeBoard.get(i) != 0) {
		      			childNode2.movePosition = i+1;
		      			p2TurnFake(childNode2.movePosition);
		      			childNode2.gameState = fakeBoard;
		      			//printFakeBoard();
		      			childNode2.heuristicValue = utility(firstPlayer);
		      		}
		      		parentNode.children.get(j).addChild(childNode2);
		   		}
	    	}
	    }
	    firstPlayer = !firstPlayer;
	    
	  //Third Layer
	    if (firstPlayer) {  
	    	//For every child created in previous tree
	    	int num = 1;
	    	for (int j = 0; j < parentNode.children.size(); j++) {
	    		for (int k = 0; k < parentNode.children.get(j).children.size(); k++) {
			    	for (int i = 0; i < boardSize; i++) {
			    		TreeNode childNode3 = new TreeNode();
			    		fakeBoard = new ArrayList(parentNode.children.get(j).children.get(k).gameState);
			    		childNode3.gameState = fakeBoard;
			       
			    		//get fake board
			    		if (fakeBoard.get(i) != 0) {
			    			childNode3.movePosition = i+1;
			    			p1TurnFake(childNode3.movePosition);
			    			childNode3.gameState = fakeBoard;
			    			//printFakeBoard();
			    			childNode3.heuristicValue = utility(firstPlayer);
			    			//System.out.println(num + "  heuristic: " + childNode3.heuristicValue);
			    			//num++;
			            }
			        	parentNode.children.get(j).children.get(k).addChild(childNode3);
			   		} 
	    		}
	    	}
	    }
	    else {
	    	int opponentStart = boardSize + 1;
	    	int opponentEnd = (boardSize * 2) + 1;
	    	
	    	int num = 1;
	    	for (int j = 0; j < parentNode.children.size(); j++) {
	    		for (int k = 0; k < parentNode.children.get(j).children.size(); k++) {
			    	for (int i = opponentStart; i < opponentEnd; i++) {
			      		TreeNode childNode3 = new TreeNode();
			      		fakeBoard = new ArrayList(parentNode.children.get(j).children.get(k).gameState);
			      		childNode3.gameState = fakeBoard;
			          
			          	//get fake board
			      		if (fakeBoard.get(i) != 0) {
			      			childNode3.movePosition = i+1;
			      			p2TurnFake(childNode3.movePosition);
			      			childNode3.gameState = fakeBoard;
			      			//printFakeBoard();
			      			childNode3.heuristicValue = utility(firstPlayer);
			      			//System.out.println(num + "  heuristic: " + childNode3.heuristicValue);
			      			//num++;
			      		}
			      		parentNode.children.get(j).children.get(k).addChild(childNode3);
			   		}
	    		}
	    	}
	    }
	    
	    //Placing all heuristics into one container
	    ArrayList<Integer> values = new ArrayList<Integer>();
	    ArrayList<Integer> moves = new ArrayList<Integer>();
	    for (int j = 0; j < parentNode.children.size(); j++) {
    		for (int k = 0; k < parentNode.children.get(j).children.size(); k++) {
    			for (int h = 0; h < parentNode.children.get(j).children.get(k).children.size(); h++) {
    				int temp1 = parentNode.children.get(j).heuristicValue;
    				int temp2 = parentNode.children.get(j).children.get(k).heuristicValue;
    				int temp3 = parentNode.children.get(j).children.get(k).children.get(h).heuristicValue;
    				int temp4 = temp1 + temp2 + temp3;
    				
    				values.add(temp4);
    				if (firstPlayer) {
    					moves.add(j);
    					//System.out.println(j);
    				}
    				else {
    					moves.add(j+boardSize+1);
    					//System.out.println(j+boardSize);
    				}
    			}
    		}
	    }
	    
	    //Determining best heuristic
	    int bestHeuristic = Collections.max(values);
	    
	    //Translating into a move
	    int bestMove = -1;
	    for (int i = 0; i < values.size(); i++) {
	    	if (values.get(i) ==  bestHeuristic) {
	    		bestMove = moves.get(i);
	    		break;
	    	}
	    }
	    
	    return bestMove + 1;
	}
	
	//First two turns with pie rule option
	public static void pieRuleTurns() {
		do {
			wrapAround = 0;
			System.out.println("It's " + player1 + "'s Turn! (Player1)");
			if (player1.equals("AI") || player1.equals("AI1")){
				AIInUse = true;
				System.out.println(player1 + " is thinking...");
				do {
					housePick = rngP1();
				} while (board.get(housePick - 1) == 0);
				System.out.println("The AI selected: " + housePick);
				AIInUse = false;
			}
			else {
				requestHouse();
			}
				if (housePick == -1) {
				printBoard();
				break;
			}
			p1Turn(housePick);
			printBoard();
		} while (error || player1Turn);
		
		//P2 1st TURN with Pie Rule Option
		wrapAround = 0;
		System.out.println("It's " + player2 + "'s Turn! (Player2)");
		pieRuleEnabled = true;
		//IF AI
		if (player2.equals("AI") || player2.equals("AI2")) {
			System.out.println(player2 + " is thinking...");
			System.out.println("Pie Rule selected...");
			String temp = player1;
			player1 = player2;
			player2 = temp;
			player1Turn = !player1Turn;
			printBoard();
		}
		//IF NOT AI
		else {
			System.out.println("Pie rule?");
			ready = false;
			long startTime = System.currentTimeMillis();
			do {
			while ((System.currentTimeMillis() - startTime) < timeLimit * 1000) {
				if (ready && pieRuleAccepted) {
					System.out.println("Pie Rule selected...");
					String temp = player1;
					player1 = player2;
					player2 = temp;
					player1Turn = !player1Turn;
					printBoard();
					break;
				}
				else if (ready) {
						housePick = chosen;
						System.out.println("You entered: " + housePick);
						p2Turn(housePick);
						printBoard();
						ready = !ready;
						break;
				}
			} 
			} while (!player1Turn);
		}
		pieRuleEnabled = false;
	}
	
	//Game Handler (-pie rule turns)
	public static void playGame() {
		
		while(!endGame) {
			//P1 TURN
			do {
				wrapAround = 0;
				System.out.println("It's " + player1 + "'s Turn! (Player1)");
				if (player1.equals("AI") || player1.equals("AI1") || player1.equals("AI2")){
					AIInUse = true;
					System.out.println(player1 + " is thinking...");
					TreeNode parent =  new TreeNode();
					parent.gameState = board;
					parent.heuristicValue = 0;
					parent.movePosition = 0;
										
					housePick = minMaxTree(parent);
					
					while (board.get(housePick-1) == 0) {
						//System.out.println("AI IS SILLY");
						housePick = rngP1();
					}
					System.out.println("The AI selected: " + housePick);
					AIInUse = false;
				}
				else {
					requestHouse();
				}
				if (housePick == -1) {
					printBoard();
					break;
				}
				p1Turn(housePick);
				printBoard();
				checkEndGame();
				if (endGame) {
					break;
				}
			} while (error || player1Turn);
			if (endGame) {
				break;
			}
			
			//P2 TURN
			do {
				wrapAround = 0;
				System.out.println("It's " + player2 + "'s Turn! (Player2)");
				if (player2.equals("AI") || player2.equals("AI2") || player2.equals("AI1")) {
					AIInUse = true;
					System.out.println(player2 + " is thinking...");
					TreeNode parent =  new TreeNode();
					parent.gameState = board;
					parent.heuristicValue = 0;
					parent.movePosition = 0;
					
					housePick = minMaxTree(parent);
					while (board.get(housePick-1) == 0) {
						//System.out.println("AI IS SILLY");
						housePick = rngP2();
					}
					System.out.println("The AI selected: " + housePick);
					AIInUse = false;
				}
				else {
					requestHouse();
				}
				if (housePick == -1) {
					printBoard();
					break;
				}
				p2Turn(housePick);
				printBoard();
				checkEndGame();
				if (endGame) {
					break;
				}
			} while (error || !player1Turn);
			if (endGame) {
				break;
			}
		}
	}
	  
	
	
	//Main Function
	public static void main(String[] args) {
		
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					Menu window = new Menu();
					window.frame.setVisible(true);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
		
		//Wait until options are ready
		while (!startup) {
			try {
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		
		//Updates time limit from GUI
		updateTimeLimit();
		
		//Sets up player names
		setPlayerNames();
		
		//Initializes starting board
		boardSizeSetter();
		boardInit(boardSize,0);
		houseSeedSetter();
		
		//Prints starting board
		printBoard();
		
		//Starts game
		player1Turn = true;	
		pieRuleTurns();
		playGame();
		
		//Pushes all seeds to appropriate mancala
		endGameTotal();
		System.out.println("-----------------");
		System.out.println("GAME OVER!");
		System.out.println("-----------------");
		printBoard();
		
		//Prints game results
		printEndGame();
	}
}