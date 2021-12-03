import InitAddRelation from './libs/addRelation.js';
import InitResultTab from './libs/showResults.js';

const Init = () => {
    const initFunctions = {
        InitAddRelation,
        InitResultTab
    };
    for (const key in initFunctions) {
        const func = initFunctions[key];
        typeof(func) === 'function' && func(); 
    }
} 
Init();