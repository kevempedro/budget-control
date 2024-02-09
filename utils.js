const getMonthByNumber = (monthNumber) => {
    const months = [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez'
    ];

    return months[monthNumber];
};

const getFullMonthByNumber = (monthNumber) => {
    const months = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ];

    return months[monthNumber];
};

const getFullMonths = () => {
    return [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ];
};

const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

const shuffleString = (string) => {
    const midpoint = Math.ceil(string.length / 2);

    const firstHalf = string.substring(0, midpoint);
    const secondeHalf = string.substring(midpoint);

    const firstHalfReversed = firstHalf.split('').reverse().join('');
    const secondeHalfReversed = secondeHalf.split('').reverse().join('');

    return `${firstHalfReversed}${secondeHalfReversed}`;
};

const unscrambleString = (string) => {
    const midpoint = Math.ceil(string.length / 2);

    const firstHalf = string.substring(0, midpoint);
    const secondeHalf = string.substring(midpoint);

    const firstHalfReversed = firstHalf.split('').reverse().join('');
    const secondeHalfReversed = secondeHalf.split('').reverse().join('');

    return `${firstHalfReversed}${secondeHalfReversed}`;
};

export {
    getMonthByNumber,
    getFullMonthByNumber,
    getFullMonths,
    uuidv4,
    shuffleString,
    unscrambleString
};
