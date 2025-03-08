import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';

const testCasesPLNToUSD = [
  { amount: 100, expected: 'PLN 100.00 = $28.57' },
  { amount: 200, expected: 'PLN 200.00 = $57.14' },
  { amount: 500, expected: 'PLN 500.00 = $142.86' },
  { amount: 1000, expected: 'PLN 1,000.00 = $285.71' },
];

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  describe('Conversion PLN -> USD', () => {
    testCasesPLNToUSD.forEach(({ amount, expected }) => {
      it(`should render proper conversion for PLN ${amount}`, () => {
        render(<ResultBox from="PLN" to="USD" amount={amount} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(expected);
      });
    });
  });

  const testCasesUSDToPLN = [
    { amount: 10, expected: '$10.00 = PLN 35.00' },
    { amount: 50, expected: '$50.00 = PLN 175.00' },
    { amount: 100, expected: '$100.00 = PLN 350.00' },
    { amount: 250, expected: '$250.00 = PLN 875.00' },
  ];

  describe('Conversion USD -> PLN', () => {
    testCasesUSDToPLN.forEach(({ amount, expected }) => {
      it(`should render proper conversion for USD ${amount}`, () => {
        render(<ResultBox from="USD" to="PLN" amount={amount} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(expected);
      });
    });
  });

  describe('Same currency conversion', () => {
    it('should render the same amount when currency does not change (PLN -> PLN)', () => {
      render(<ResultBox from="PLN" to="PLN" amount={123} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent('PLN 123.00 = PLN 123.00');
    });

    it('should render the same amount when currency does not change (USD -> USD)', () => {
      render(<ResultBox from="USD" to="USD" amount={123} />);
      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent('$123.00 = $123.00');
    });

    describe('Negative amount handling', () => {
        it('should render "Wrong value..." when amount is negative', () => {
          render(<ResultBox from="USD" to="PLN" amount={-50} />);
          const output = screen.getByTestId('output');
          expect(output).toHaveTextContent('Wrong value...');
        });
      });
  });
});
