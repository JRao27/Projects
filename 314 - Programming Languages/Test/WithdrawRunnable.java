public class WithdrawRunnable implements Runnable
{
	public WithdrawRunnable(BankAccount acc, double anAmount, int aCount){	
		account = acc;
		amount = anAmount;
		count = aCount;
	}

	public void run()
	{
		try {
			for (int i = 0; i < count; i++)
			{
				account.withdraw(amount);
				Thread.sleep(DELAY);
			}
		}
		catch (InterruptedException ex)
		{	
		}

	}


	private static final int DELAY = 200;

	private BankAccount account;
	private double amount;
	private int count;
}
