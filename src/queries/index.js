import gql from "graphql-tag";

export const ESTAS_AUTENTICADO = gql`
  query estasAutenticado($token: String!) {
    estasAutenticado(token: $token)
  }
`;

// reportes por tipoFuncionario
export const OBTENER_SALDO_VACACIONES_PERMISOS_FUNCIONARIOS = gql`
  query obtenerSaldoVacionesPermisosFuncionarios(
    $periodo: ID
    $tipoFuncionario: String
  ) {
    obtenerSaldoVacionesPermisosFuncionarios(
      periodo: $periodo
      tipoFuncionario: $tipoFuncionario
    ) {
      cedula
      nombre
      segundoNombre
      apellido
      segundoApellido
      tipoFuncionario
      diasAFavor
      horasAcumuladas
      minutosAcumulados
      vacaciones
      permisos
    }
  }
`;

// reportes permisos
export const REPORTE_PERMISOS = gql`
  query obtenerPermisosReporte($id: ID!, $periodo: ID!) {
    obtenerPermisosReporte(id: $id, periodo: $periodo) {
      permisos {
        motivo
        horaSalida
        horasPermiso
        minutosPermiso
      }
      resultado {
        totalPermisos
        totalPermisosEnHoras
        totalPermisosEnMinutos
        diasDescontados
        totalPorMotivo {
          motivo
          valor
        }
      }
    }
  }
`;

// obtener funcionarios
export const OBTENER_FUNCIONARIOS = gql`
  query obtenerFuncionarios {
    obtenerFuncionarios {
      cedula
      nombre
      segundoNombre
      apellido
      diasAFavor
      segundoApellido
      tipoFuncionario
      tipoVinculacion
    }
  }
`;

// dashboard
export const NUMERO_EMPLEADOS_POR_TIPO = gql`
  query {
    numeroEmpleadosPorTipo {
      name
      valor
    }
  }
`;

export const PORCENTAJE_MF = gql`
  query {
    porcentajeHombreMujeres {
      genero
      porcentaje
      value
    }
  }
`;

export const EDAD_PROMEDIO_MF = gql`
  query {
    edadPromedioMF {
      genero
      fechas {
        fecha
      }
    }
  }
`;

export const MAS_PERMISOS = gql`
  query {
    masPermisos {
      permisos
      funcionario {
        tipoFuncionario
        nombre
        segundoNombre
        apellido
      }
    }
  }
`;

export const TENDENCIA_PERMISOS = gql`
  query {
    tendenciaPermisos
  }
`;

export const PORCENTAJE_FUNCIONARIO_DISCAPACIDAD = gql`
  query {
    porcentajeFuncionarioDiscapacidad {
      porcentaje
      total
    }
  }
`;

// contratos

export const OBTENER_CONTRATOS = gql`
  query obtenerContratos(
    $funcionario: ID!
    $periodo: ID!
    $limite: Int
    $offset: Int
  ) {
    obtenerContratos(
      funcionario: $funcionario
      periodo: $periodo
      limite: $limite
      offset: $offset
    ) {
      contratos {
        id
        nombrePeriodo
        nombreArchivo
        tipoContrato
        contrato
        nombramiento
        vigenciaInicio
        vigenciaFinal
        fechaInicioActividades
      }
      totalContratos
    }
  }
`;

// peridos
export const OBTENER_PERIODOS = gql`
  query obtenerPeriodos($limite: Int, $offset: Int) {
    obtenerPeriodos(limite: $limite, offset: $offset) {
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
  query obtenerVacaciones(
    $id: ID!
    $idPeriodo: ID
    $limite: Int
    $offset: Int
  ) {
    obtenerVacaciones(
      id: $id
      idPeriodo: $idPeriodo
      limite: $limite
      offset: $offset
    ) {
      vacaciones {
        id
        funcionario
        fechaSalida
        fechaEntrada
        motivo
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
  query totalPermisos($id: ID!, $idPeriodo: ID) {
    totalPermisos(id: $id, idPeriodo: $idPeriodo) {
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
  query obtenerPermisos($id: ID!, $idPeriodo: ID, $limite: Int, $offset: Int) {
    obtenerPermisos(
      id: $id
      idPeriodo: $idPeriodo
      limite: $limite
      offset: $offset
    ) {
      id
      fechaSalida
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
  query obtenerFuncionario($cedula: String!) {
    obtenerFuncionario(cedula: $cedula) {
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
      fechaIngreso
      fechaSalida
      tituloProfesional {
        nombre
        principal
      }
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
`;

// usuario actual consulta
export const USUARIOS = gql`
  query obtenerUsuarios {
    obtenerUsuarios {
      id
      nombre
      correo
      rol
    }
  }
`;
export const USUARIO_ACTUAL = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      rol
      correo
      nombre
    }
  }
`;

export const MOSTRAR_IMAGEN = gql`
  query MOSTRAR_IMAGEN {
    mostrarImagen
  }
`;
