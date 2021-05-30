//Helper function to format a date object
function format_date(date){
    return `${new Date(date).getMonth()}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
}

module.exports = {format_date};