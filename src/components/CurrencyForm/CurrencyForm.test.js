import { render, screen, cleanup } from '@testing-library/react';
import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';

describe('Component CurrencyForm', () => {
  it('should render without crashing', () => {
    render(<CurrencyForm action={() => {}} />);
  });

  const testCases = [
    { amount: '100', from: 'PLN', to: 'USD' },
    { amount: '20', from: 'USD', to: 'PLN' },
    { amount: '200', from: 'PLN', to: 'USD' },
    { amount: '345', from: 'USD', to: 'PLN' },
  ];

  for (const testObj of testCases) {
    it('should run action callback with proper data on form submit', () => {
      const action = jest.fn();
    
      render(<CurrencyForm action={action} />);
    
      const submitButton = screen.getByText('Convert');
    
      const amountField = screen.getByTestId('amount');
      const fromField = screen.getByTestId('from-select');
      const toField = screen.getByTestId('to-select');
    
      userEvent.type(amountField, '100');
      userEvent.selectOptions(fromField, 'PLN');
      userEvent.selectOptions(toField, 'USD');
    
      userEvent.click(submitButton);
    
      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith({ amount: 100, from: 'PLN', to: 'USD' });
    });
  }
});
