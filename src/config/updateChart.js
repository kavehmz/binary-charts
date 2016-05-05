import shallowCompare from 'react-addons-shallow-compare';
import areTickArraysEqual from 'binary-utils/lib/areTickArraysEqual';
import updateTicks from './updateTicks';
import updateContract from './updateContract';
import updateTradingTimes from './updateTradingTimes';

const ticksAreEqual = (prevProps, nextProps) =>
    prevProps.symbol === nextProps.symbol &&
    areTickArraysEqual(prevProps.ticks, nextProps.ticks);

const contractsAreEqual = (prevProps, nextProps) =>
    shallowCompare(prevProps.contract, nextProps.contract) &&
        shallowCompare(prevProps.trade, nextProps.trade);

const tradingTimesAreEqual = (prevProps, nextProps) =>
    shallowCompare(nextProps.tradingTimes, prevProps.tradingTimes);

export default (chart, prevProps, nextProps) => {
    const ticksDiffer = !ticksAreEqual(prevProps, nextProps);
    const contractsDiffer = !contractsAreEqual(prevProps, nextProps);
    const tradingTimesDiffer = !tradingTimesAreEqual(prevProps, nextProps);

    if (ticksDiffer) {
        updateTicks(chart, prevProps, nextProps);
    }

    if (contractsDiffer || ticksDiffer) {
        const { contract, trade, ticks } = nextProps;
        updateContract({ chart, contract: contract || trade, ticks });
    }

    if (tradingTimesDiffer) {
        const { tradingTimes } = nextProps;
        updateTradingTimes({ chart, tradingTimes });
    }
};
