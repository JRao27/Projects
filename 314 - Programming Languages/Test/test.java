import java.util.*;



class Main {
	public static void main(String[] args) {
		Royalty king = new Royalty();
		Lawyer defender = new Lawyer("Vinny");
		Judge districtjudge = new Judge("Judy");
	
		printgreeting(defender);
	
	}
	
	public static void printgreeting(Object person) {
		
		if (person instanceof Royalty) {
				
		}
		
		if (person instanceof Lawyer) {
			System.out.println(person.a);
		}
		
		if (person instanceof Judge) {
			
		}
	}
}

class Royalty {
	public String a;
	public Royalty(){
		System.out.println("Royalty construted.");
	}
	
	
	
}

class Lawyer {
	public String a;
	public Lawyer() {
		System.out.println("Lawyer constructed.");
	}
	
	public Lawyer (String a) {
		System.out.println("Lawyer with name constructed.");
		this.a = a;
	}
}

class Judge extends Lawyer {
	public String a;
	public Judge() {
		System.out.println("Judge constructed");
	}
	
	public Judge (String a) {
		System.out.println("Judge with name constructed.");
		this.a = a;
	}
}


