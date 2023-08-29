using ClsDatSysAgro.Usuario;
using ClsModSysAgro.Usuarios;
using MaSysAgro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClsNegSysAgro.Usuario
{
    public class ClsNegUsuario
    {
        ClsModResponse objResponse = new ClsModResponse();
        ClsDatUsuario objDatUsuario = new ClsDatUsuario();
        public ClsModResponse postLogearseUsuario(paramsUsuarioDTO parametros)
        {
            objResponse = new ClsModResponse();
            objResponse = objDatUsuario.postLogearseUsuario(parametros);
            return objResponse;
        }
        public ClsModResponse postEditarPerfil(paramsUsuarioDTO parametros)
        {
            objResponse = new ClsModResponse();
            objResponse = objDatUsuario.postEditarPerfil(parametros);
            return objResponse;
        }

        public ClsModResponse postSolicitarContrasena(paramsUsuarioDTO parametros)
        {
            objResponse = new ClsModResponse();
            objResponse = objDatUsuario.postSolicitarContrasena(parametros);
            return objResponse;
        }

        public ClsModResponse postRegistrarse(paramsUsuarioDTO parametros)
        {
            objResponse = new ClsModResponse();
            objResponse = objDatUsuario.postRegistrarse(parametros);
            return objResponse;
        }

    }
}
