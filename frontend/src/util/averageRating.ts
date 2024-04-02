export const averageRating = (Ratingdata: any): number => {
    let sum = 0;
    Ratingdata.forEach((data: any) => {
      sum += data.rating;
    });
    const averageRating = sum / Ratingdata.length;
    return averageRating; 
};
