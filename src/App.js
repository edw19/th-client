import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Login from './componentes/Auth/Login'
import { RutasPrivadas } from './componentes/Auth/RutasPrivadas'
import Autenticado from './componentes/Auth/Autenticado'
import Layout from './componentes/Layout/Layout'
import { FuncionarioProvider } from './componentes/Context/FuncionarioContext'
import { FuncionarioPro } from './componentes/Context/FuncionarioContext2';
import { FuncionarioProviderVacaciones } from './componentes/Context/FuncionarioContextVacaciones';
import { FuncionarioContratosProvider } from './componentes/Context/FuncionarioContratosContext';
import { PermisosProvider } from './componentes/Context/PermisosContext';
import { VacacionesProvider } from './componentes/Context/VacacionesContext';
import { PeriodoProvider } from './componentes/Context/PeriodoContext';
import { ContratosProvider } from './componentes/Context/ContratosContext';
import Recuperar from './componentes/Auth/Recuperar';

console.log(Autenticado.estaAutenticado())

function App() {
  return (
    <PeriodoProvider>
      <FuncionarioProvider>
        <FuncionarioPro>
          <FuncionarioProviderVacaciones>
            <PermisosProvider>
              <VacacionesProvider>
                <FuncionarioContratosProvider>
                  <ContratosProvider>
                    <Router>
                      {Autenticado.estaAutenticado() ? <Layout /> : ''}
                      <Switch>
                        <Route exact path='/' component={() => Autenticado.estaAutenticado() ? <Redirect to="/dashboard" /> : <Login />} />
                        <Route exact path='/recuperar' component={ () => <Recuperar />} />
                        <RutasPrivadas exact path='/dashboard' component={() => Autenticado.estaAutenticado() ? '' : <Layout />} />
                      </Switch>
                    </Router>
                  </ContratosProvider>
                </FuncionarioContratosProvider>
              </VacacionesProvider>
            </PermisosProvider>
          </FuncionarioProviderVacaciones>
        </FuncionarioPro>
      </FuncionarioProvider>
    </PeriodoProvider>
  )
}

export default App;
