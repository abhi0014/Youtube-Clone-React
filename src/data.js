export const API_KEY = 'AIzaSyBC5rw1R2v33_TcRmYcoKn3jERmewoLudQ'

export const valueConvertor = (value)=>{
    if(value >= 1000000)
    {
        return Math.floor(value/1000000)+"M";
    }
    else if(value >=1000){
        return Math.floor(value/1000)+"k";
    }else{
        return value;
    }
}