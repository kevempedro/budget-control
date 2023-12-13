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

export {
    getMonthByNumber,
    getFullMonthByNumber
};
