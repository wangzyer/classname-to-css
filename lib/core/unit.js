/**
 * px转vw
 */
function px2vw(px, viewportUnit = 375) {
    return `${(px / viewportUnit).toFixed(3)}vw`
}

/**
 * px转rem
 */
function px2rem(px, fontSize = 37.5) {
    return `${(px / fontSize).toFixed(3)}rem`
}

module.exports = {
    px2vw,
    px2rem
};