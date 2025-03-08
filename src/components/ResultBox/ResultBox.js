import PropTypes from 'prop-types';
import { convertUSDToPLN } from './../../utils/convertUSDToPLN';
import { convertPLNToUSD } from './../../utils/convertPLNToUSD';
import { formatAmountInCurrency } from './../../utils/formatAmountInCurrency';
import { useMemo } from 'react';
import styles from './ResultBox.module.scss';

const ResultBox = ({ from, to, amount }) => {
  // Sprawdzamy negatywną wartość na samym początku
  const isNegative = amount < 0;

  const convertedAmount = useMemo(() => {
    if (isNegative) return 'Wrong value...';
    if (from === to) return formatAmountInCurrency(amount, from);
    if (from === 'USD' && to === 'PLN') return convertUSDToPLN(amount);
    if (from === 'PLN' && to === 'USD') return convertPLNToUSD(amount);
    return formatAmountInCurrency(amount, from);
  }, [from, to, amount, isNegative]);

  const formattedAmount = useMemo(() => formatAmountInCurrency(amount, from), [amount, from]);

  return (
    <div className={styles.result} data-testid="output">
      {isNegative ? 'Wrong value...' : `${formattedAmount} = ${convertedAmount}`}
    </div>
  );
};


ResultBox.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
}

export default ResultBox;