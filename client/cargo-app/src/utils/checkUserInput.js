
export function checkInput(input){
    const regex = /^\d+(\.\d{1,2})?$/
    if (input.weight.match(regex) && input.volume.match(regex)) return true;
    return false;
}