import { enableES5, produce } from 'immer';

const produceUtil = (...args) => {
  enableES5();
  return produce(...args);
};
export default produceUtil;
