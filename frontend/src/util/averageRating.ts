export const averageRating = (Ratingdata: any): number => {
    let sum = 0;
    Ratingdata.forEach((data: any) => {
      sum += data.rating;
    });
    const averageRating = sum / Ratingdata.length;
    return averageRating; 
};
export const averageRatingOnlyId = (Ratingdata: any,totalEnroll:any): number => {
    let hight = 3
    const averageRating = totalEnroll/Ratingdata.length+hight;
    return averageRating; 
};
