/**
 * 
 * @param {string} cpf 
 * @returns {boolean} true se é valido e falso caso contrário
 */
export function validarCPF(cpf) {
    if (cpf == null)
        return false;
    cpf = cpf.replace(/\D/ig, '');
    if (cpf.length != 11)
        return false;
    // coverte para numeros
    const cpfDigits = cpf.split('').map(c => Number(c));

    // virificando pelos falsos positivos conhecidos
    if (cpfDigits.every(d => d == cpfDigits[0]))
        return false;

    let sum = 0;
    for (let i = 0; i < 9; i++)
        sum += (10 - i) * cpfDigits[i];

    sum %= 11;
    const firstDigit = 11 - (sum > 2 ? sum : 11);
    if (firstDigit != cpfDigits[9])
        return false;

    sum = 0;
    for (let i = 0; i < 10; i++)
        sum += (11 - i) * cpfDigits[i];

    sum %= 11;
    const secondDigit = 11 - (sum > 2 ? sum : 11);

    return cpfDigits[10] == secondDigit;
}
