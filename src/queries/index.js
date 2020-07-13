import gql from 'graphql-tag';

// contratos 

export const OBTENER_CONTRATOS = gql`
    query obtenerContratos($funcionario: ID!, $limite: Int, $offset: Int) {
        obtenerContratos(funcionario: $funcionario, limite: $limite, offset: $offset){
            contratos {
                id
                nombrePeriodo
                nombreArchivo
                tipoContrato
                contrato
                nombramiento
                fechaInicioActividades
            }
            totalContratos
        }
    }
`;

// peridos
export const OBTENER_PERIODOS = gql`
    query obtenerPeriodos($limite: Int, $offset: Int){
        obtenerPeriodos(limite: $limite, offset: $offset){
           periodos {
            id
            nombre
            vigente
            fechaInicio
            fechaFinal
           }
           totalPeriodos    
        }
    }
`;

// vacaciones 
export const OBTENER_VACACIONES = gql`
    query obtenerVacaciones($id: ID!, $idPeriodo: ID, $limite: Int, $offset: Int) {
        obtenerVacaciones(id: $id, idPeriodo: $idPeriodo, limite: $limite, offset: $offset){
            vacaciones{
                id
                funcionario
                fechaSalida
                fechaEntrada
                diasSolicitados
                estado
            }
            totalVacaciones
            totalDiasDescontados
        }
    }
`;


//permisos

export const TOTAL_PERMISOS = gql`
    query totalPermisos($id:ID!,$idPeriodo:ID){
        totalPermisos(id:$id, idPeriodo:$idPeriodo){
            totalPermisos
            totalHoras
            totalHorasSin
            totalMinutos
            totalMinutosSin
            totalDias
        }
    }
`;

export const OBTENER_PERMISOS = gql`
    query obtenerPermisos($id: ID!, $idPeriodo:ID, $limite: Int, $offset: Int){
        obtenerPermisos(id:$id, idPeriodo: $idPeriodo, limite: $limite, offset: $offset){
            id
            horaSalida
            horasPermiso
            minutosPermiso
            motivo
            estado
        }
    }
`;

// funcionarios 
export const OBTENER_FUNCIONARIO = gql`
    query obtenerFuncionario($cedula: String!){
        obtenerFuncionario(cedula: $cedula){
            id
            cedula
            nombre
            segundoNombre
            apellido
            segundoApellido
            nacionalidad
            tipoVinculacion
            tipoFuncionario
            fechaNacimiento
            tituloProfesional
            genero
            tipoSangre
            estadoCivil
            discapacidad
            discapacidadDetalles
            nombreImagen
            diasAFavor
            horasAcumuladas
            minutosAcumulados
        } 
    }
`



// usuario actual consulta
export const USUARIO_ACTUAL = gql`
    query obtenerUsuario {
        obtenerUsuario{
            id
            usuario
            nombre
        }
    }
`;

export const MOSTRAR_IMAGEN = gql`
    query MOSTRAR_IMAGEN {
	    mostrarImagen
    } 
`;   