
// Api to generate our numbers 
export default function handler(req: any, res: any){
    const limit = 20; /// Amount of ints we want on the page

    // Gets starting index for the current page we are on based on the amount of current ints shown
    // -1 and +1 because there is a zero based index
    const startInt = (parseInt(req.query.page, 10) - 1) * limit; 

    // Arr to hold our new int values 
    const ints = []
    for(let i = 0; i < limit; i++){
        ints.push(startInt + i);
    }

    res.status(200).json({ data: ints });
}