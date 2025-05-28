

export const parseStringToBoolean = (value: string | null | undefined) : boolean => {

    if(value && value === 'true'){
        return true;
    }
    return false;
}