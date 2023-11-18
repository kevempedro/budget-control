const getMonthByNumber = (monthNumber) => {
    const months =[
        'Jan',
        'Fev',
        'Mar',
        'Abr',
       ' Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez'
    ];

    return months[monthNumber].toUpperCase();
}

export {
    getMonthByNumber
};
