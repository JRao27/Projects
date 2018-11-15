public class DepositRunnable implements Runnable
{
	public DepositRunnable(BankAccount acc, double anAmount, int aCount){	
		account = acc;
		amount = anAmount;
		count = aCount;
	}

	public void run()
	{
		try {
			for (int i = 0; i < count; i++)
			{
				account.deposit(amount);
				int r = (int)(350 * Math.random())-200;
				Thread.sleep(DELAY + r);
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
