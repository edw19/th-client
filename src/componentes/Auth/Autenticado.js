import Cookies from 'js-cookie'

class Autenticado {
    constructor() {
        this.Autenticado = false
    }
    inicioSesion() {
        this.Autenticado = true
    }
    cerrarSesion() {
        this.Autenticado = false
    }
    estaAutenticado() {
        if(Cookies.get('signedin')){
            this.Autenticado = true
        }else {
            this.Autenticado = false
        }
        return this.Autenticado
    }
}

export default new Autenticado()