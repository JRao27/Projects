import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.locks.Condition;

public class BankAccount {
	public BankAccount() {
		balance = 0.0;
		balanceChangeLock = new ReentrantLock();
		sufficientFundsCondition = balanceChangeLock.newCondition();
	}	
	
	public void deposit(double amount) {
		balanceChangeLock.lock();
		try {

			System.out.println("Depositing " + amount);
			double nb = balance + amount;
			System.out.println("D: New balance is " + nb);
			balance = nb;
			sufficientFundsCondition.signalAll();	

		} finally {
			balanceChangeLock.unlock();
		}
	}	

	public void withdraw(double amount) throws InterruptedException
		{
		/*
			while (balance < amount) {  
				// NOP
			} 
			// here: balance >= amount
			balanceChangeLock.lock();
			// sadly, not necessarily so here.
		*/
		/*
			balanceChangeLock.lock();
			while (balance < amount) {  
				// NOP
				// Oh no, there can't be more money because
				// deposit is unable to get the lock
			} 
		*/

		balanceChangeLock.lock();
		try {

			while (balance < amount) 
				sufficientFundsCondition.await();

			System.out.println("Withdraw " + amount);
			double nb2 = balance - amount;
			System.out.println("W: New balance is " + nb2);
			balance = nb2;	

		} finally {
			balanceChangeLock.unlock();
		}

	}	
	
	public double getBalance() {
		return balance;
	}

	private double balance;
	private ReentrantLock balanceChangeLock;
	private Condition sufficientFundsCondition;
}


