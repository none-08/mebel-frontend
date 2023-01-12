export const getDate = (date) => {
    const newDate = new Date(date);
    if (!date) {
        return null;
    }
    return `${newDate.getDay() < 10 ? '0' + newDate.getDate() : newDate.getDate()}.${
        newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getDate()
    }.${newDate.getFullYear()}`;
};
