const formatDateYear = (date: string | undefined): string => {
    if (!date) return ""; 

    const [year, month, day] = date.split("-");
    return `${year}`;
}

export default formatDateYear;