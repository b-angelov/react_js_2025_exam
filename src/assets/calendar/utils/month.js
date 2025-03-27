function getMonthMatrix(monthData, currentLocale = "en-EN"){
    const month_matrix = []
    for (const item of monthData){
        const date = new Date(item.date)
        const week_day = (date.getDay() + 6) % 7
        if (!month_matrix.length || month_matrix[month_matrix.length-1].length === 7){
            const new_row = []
            month_matrix.push(new_row)
            while (new_row.length < week_day ){
                new_row.push({disabled: true})
            }
        }
        const matrix_row = month_matrix[month_matrix.length-1]
        item.week_day = new Intl.DateTimeFormat(currentLocale,{weekday:"long"}).format(date)
        matrix_row.push(item)
    }
    while (month_matrix[month_matrix.length-1].length < 7){
        month_matrix[month_matrix.length-1].push({disabled: true})
    }
    return month_matrix
}

export {getMonthMatrix}