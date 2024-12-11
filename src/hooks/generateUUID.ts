export function generateUUID() {
    const number1 = 16;
    const number2 = 0x3;
    const number3 = 0x8;

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        var r = Math.random() * number1 | 0,
            v = c == "x" ? r : r & number2 | number3;
        return v.toString(number1);
    });
}
