import gql from 'graphql-tag';


// contratos 
export const GUARDAR_CONTRATO = gql`
    mutation guardarContrato($input: GuardarContratoInput){
        guardarContrato(input: $input)
    }
`;
export const ELIMINAR_CONTRATO = gql`
    mutation eliminarContrato($id: ID!, $nombreArchivo: String!){
        eliminarContrato(id: $id, nombreArchivo: $nombreArchivo)
    }
`;

// periodo

export const CREAR_PERIODO = gql`
    mutation crearPeriodo($nombre: String, $fechaInicio: String, $fechaFinal: String){
        crearPeriodo(nombre: $nombre, fechaInicio: $fechaInicio, fechaFinal: $fechaFinal)
    }
`;

export const HACER_VIGENTE = gql`
    mutation hacerVigente($id: ID!){
        hacerVigente(id: $id)
    }
`;

export const ELIMINAR_PERIODO = gql`
    mutation eliminarPeriodo($id: ID!) {
        eliminarPeriodo(id: $id)
    }
`;

// vacaciones 

export const ACTUALIZAR_DIAS_HABILES = gql`
    mutation actualizarDiasHabiles($id: ID!, $dias: Int, $sumar: Boolean){
        actualizarDiasHabiles(id: $id, dias:$dias, sumar: $sumar)
    }
`;

export const GUARDAR_VACACION = gql`
    mutation guardarVacacion($input: VacacionInput){
        guardarVacacion(input: $input)
    }
`;

export const ELIMINAR_VACACION = gql`
    mutation eliminarVacacion($id: ID!){
        eliminarVacacion(id: $id)
    }
`;

export const ACTUALIZAR_ESTADO_VACACION = gql`
    mutation actualizarEstadoVacacion($id: ID!, $estado: Boolean!){
        actualizarEstadoVacacion(id: $id, estado: $estado)
    }

`;


// Permisos 
export const DESCONTAR_PERMISOS = gql`
    mutation descontarPermisos(
        $funcionario: ID!
        $periodo: ID!
        $diasAFavor: Int
        $horasAcumuladas: Int
        $minutosAcumulados: Int
        $dias: Int
        $horas: Int
        $minutos: Int
    ) {
    descontarPermisos(
        funcionario: $funcionario
        periodo: $periodo
        diasAFavor: $diasAFavor
        horasAcumuladas: $horasAcumuladas
        minutosAcumulados: $minutosAcumulados
        dias: $dias
        horas: $horas
        minutos: $minutos
    )
}`;

export const ACTUALIZAR_ESTADO_PERMISO = gql`
    mutation actualizarEstadoPermiso($id: ID, $estado: Boolean){
        actualizarEstadoPermiso(id: $id, estado: $estado)
    }
`;

export const CREAR_PERMISO = gql`
    mutation crearPermiso($input: PermisoInput){
        crearPermiso(input: $input)
    }
`;

export const ELIMINAR_PERMISO = gql`
    mutation eliminarPermiso($id: ID!){
        eliminarPermiso(id: $id)
    }
`;

export const CREAR_FUNCIONARIO = gql`
    mutation crearFuncionario($input: FuncionarioInput){
        crearFuncionario(input: $input)
    }
`;
export const ACTUALIZAR_FUNCIONARIO = gql`
    mutation actualizarFuncionario($input: FuncionarioInput){
        actualizarFuncionario(input: $input)
    }
`
export const ELIMINAR_FUNCIONARIO = gql`
    mutation eliminarFuncionario($id: ID!){
     eliminarFuncionario(id:$id)
    }
`


export const AUTENTICAR_USUARIO = gql`
    mutation autenticarUsuario($usuario: String!, $password: String!){
        autenticarUsuario(usuario: $usuario, password: $password){
            token
        }
    }
`
export const UPLOAD_FILE = gql` 
    mutation UploadFile($file: Upload!) {
        uploadFile(file: $file)
    }
`