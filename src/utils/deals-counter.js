export function counterDeal(targetDate){
    if(!targetDate) targetDate = new Date().setHours(23 , 59 ,59 , 999) ;

    const ONE_HOUR_MS = 60*60*1000 ;
    const ONE_MINUTE_MS = 60*1000 ;
    const ONE_SECOND_MS = 1000 ;

    const timeLeft = targetDate - new Date().getTime() ;

    const hours = Math.trunc(timeLeft / ONE_HOUR_MS);
    const minutes = Math.trunc((timeLeft % ONE_HOUR_MS) / ONE_MINUTE_MS);
    const seconds = Math.trunc(((timeLeft % ONE_HOUR_MS) % ONE_MINUTE_MS) / ONE_SECOND_MS)
    
    if(timeLeft > 0){
        return {hours , minutes , seconds}
    }
    else{
        return { hours : 0 , minutes : 0 , seconds : 0}
    }
    
}