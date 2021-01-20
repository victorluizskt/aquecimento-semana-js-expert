
class Util {
    static #defaultFormat = Intl.NumberFormat("pt-br", {
        currency: "BRL",
        style: "currency"
    });

    static formatCurrency(value){
        return this.#defaultFormat.format(value);
    };

    static unFormatCurrency(value) {
        // R$ 1000,10
        const valor = value;
        if(isNaN(valor)){
            return Number(value.replace(/\D/g, '')) / 100;
        } 
    }
}

module.exports = Util;