export const getUnitsFromString = (str, units) => {
    for (let i = 0; i < units.length; i++) {
        const unit = units[i];
        const reg = new RegExp("\\d+" + unit);

        if (str.match(reg) !== null) return unit;
    }
}

export const getTriggerOffsetPxValue = ({triggerOffsetValue, windowSize, sectionHeight, units}) => {
    if (units === 'px') return triggerOffsetValue;
    else if (units === '%') return sectionHeight / 100 * triggerOffsetValue;
    else if (units === 'vh') return windowSize.height / 100 * triggerOffsetValue;
    else if (units === 'vw') return windowSize.width / 100 * triggerOffsetValue;
}