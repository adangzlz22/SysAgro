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
        public ClsModResponse postSolicitarContrasena(paramsUsuarioDTO parametros)
        {
            objResponse = new ClsModResponse();
            objResponse = objDatUsuario.postSolicitarContrasena(parametros);
            return objResponse;
        }
    }
}
