const {px2vw, px2rem} = require('./unit');
const {MOO_CSS_TABLE} = require('../config');

/**
 * 单位css样式
 * @param value
 * @param unit
 * @param standard
 * @returns {string|string|*}
 */
function unitStyle(value, unit, standard) {
    switch (unit) {
        case 'vw':
            return px2vw(value, standard);
        case 'rem':
            return px2rem(value, standard);
        default:
            return `${value}px`
    }
}


/**
 * 类名转化成css样式字符串
 * @param classNameArray
 * @param unit
 * @param standard
 * @returns {string|string}
 */
function classNameToStyle(classNameArray, unit, standard) {
    let mooCssString = '';
    for (let cssClassName of classNameArray) {
        let cssName = cssClassName.split('-')[1];
        let attr = /[a-z]+/.exec(cssName)[0];
        let value = /\d+/.exec(cssName)[0];
        mooCssString += `.${cssClassName}{${MOO_CSS_TABLE[attr]}:${unitStyle(value, unit, standard)}}`
    }
    return mooCssString
}

module.exports = classNameToStyle;
