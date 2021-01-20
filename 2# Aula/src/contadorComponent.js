//IIFE -> Immeately Invoked Function Expression
(() => {

const BTN_REINICIAR = "btnReiniciar";
const ID_CONTADOR = "contador";
const VALOR_CONTADOR = 100;
const PERIODO_INTERVALO = 10;

class ContadorComponent {

    constructor (){
        this.inicializar();
    }

    prepararContadorProxy () {
        const handler = {
            set: (currentContext, propertyKey, newValue) => {
                console.log({currentContext, propertyKey, newValue});

                // para parar todo o processamento
                if(!currentContext.valor){
                    currentContext.efetuarParada();
                }

                currentContext[propertyKey] = newValue;
                return true;
            }
        }

        // Escuta qualquer alteração no site
        const contador = new Proxy({
            valor: VALOR_CONTADOR,
            efetuarParada: () => {}
        }, handler);

        return contador;
    }

    atualizarTexto = ({elementoContador, contador}) => () => {
        const identificadorTexto = '$$contador';
        const textoPadrao = `Comecando em <strong>${identificadorTexto}</strong> segundos...`
        elementoContador.innerHTML = textoPadrao.replace(identificadorTexto, contador.valor--);
    }

    agendarParadaContador({elementoContador, idIntervalo}) {
        // função parcial
        return () => {
            clearInterval(idIntervalo);
            elementoContador.innerHTML = "";
            this.desabilitarBotao(false);
        }
    }

    prepararBotao(elementoBotao, iniciarFn){
        elementoBotao.addEventListener('click', iniciarFn.bind(this));
        
        return (valor = true) => {
            const atributo = 'disabled';
            
            if(valor){
                elementoBotao.setAttribute(atributo, valor);
                return;
            }

            elementoBotao.removeAttribute(atributo);
        }
    }

    inicializar(){
        console.log('inicializouuuu');
        const elementoContador = document.getElementById(ID_CONTADOR);

        const contador = this.prepararContadorProxy();
        // contador.valor = 100;
        // contador.valor = 90;
        // contador.valor = 80;
        const argumentos = {
            elementoContador,
            contador
        }

        // this.atualizarTexto(argumentos);
        // this.atualizarTexto(argumentos);
        // this.atualizarTexto(argumentos);
        const fn = this.atualizarTexto(argumentos);
        const idIntervalo  = setInterval(fn, PERIODO_INTERVALO);

        {
            const elementoBotao = document.getElementById(BTN_REINICIAR);
            const desabilitarBotao = this.prepararBotao(elementoBotao, this.inicializar);
            desabilitarBotao();

            const argumentos = {elementoContador, idIntervalo};
            //const debabilitarBotao = () => console.log('desabilitouu')
            const pararContadorFn = this.agendarParadaContador.apply({desabilitarBotao}, [argumentos]);
            contador.efetuarParada = pararContadorFn;

        }
    }
}

    window.ContadorComponent = ContadorComponent;

})();