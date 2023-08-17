import {isLst001} from './utils/lst001.mjs'
import {isLst002} from './utils/lst002.mjs'
import {isLst003} from './utils/lst003.mjs'


export const analyzeCode = (code) => {
    if (!code) return null;

    if (isLst003(code)) return 'lst003';
    if (isLst002(code)) return 'lst002';
    if (isLst001(code)) return 'lst001';

    return null;
}

