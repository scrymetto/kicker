export function makeCamelCaseFromString (string) {
    let result;
    let arrayOfWords = string.split(' ');
    if (arrayOfWords.length > 1) {
        let newArray = arrayOfWords.map((word, index) => {
            if (index !== 0) {
                return word[0].toUpperCase() + word.slice(1)
            } else return word;
        });
        result = newArray.join('')
    } else result = arrayOfWords;
    return result;
}