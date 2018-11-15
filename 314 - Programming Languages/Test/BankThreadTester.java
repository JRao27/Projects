
public class BankThreadTester
{
	public static void main(String[] args)
	{
		BankAccount account = new BankAccount();
		final double AMOUNT = 100;
		final int REPETITIONS = 20;
		DepositRunnable d1 = new DepositRunnable(account, AMOUNT, REPETITIONS);
		WithdrawRunnable w1 = new WithdrawRunnable(account, AMOUNT, REPETITIONS);
	
		Thread t1 = new Thread(d1);
		Thread t2 = new Thread(w1);

		t1.start();
		t2.start();

	}

}
