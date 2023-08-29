using ClsModSysAgro.Usuarios;
using ClsNegSysAgro.Usuario;
using MaSysAgro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace SysAgroAp.Controllers
{
    public class UsuarioController : ApiController
    {
        ClsModResponse objResponse = new ClsModResponse();
        ClsNegUsuario objNegUsuarios = new ClsNegUsuario();

        [HttpPost]
        [AllowAnonymous]
        [ActionName("postLogearseUsuario")]
        public ClsModResponse postLogearseUsuario(paramsUsuarioDTO parametros)
        {
            objResponse = new ClsModResponse();
            objResponse = objNegUsuarios.postLogearseUsuario(parametros);
            return objResponse;
        }

        [HttpPost]
        [AllowAnonymous]
        [ActionName("postEditarPerfil")]
        public ClsModResponse postEditarPerfil(paramsUsuarioDTO parametros)
        {
            objResponse = new ClsModResponse();
            objResponse = objNegUsuarios.postEditarPerfil(parametros);
            return objResponse;
        }

        [HttpPost]
        [AllowAnonymous]
        [ActionName("postSolicitarContrasena")]
        public ClsModResponse postSolicitarContrasena(paramsUsuarioDTO parametros)
        {
            objResponse = new ClsModResponse();
            objResponse = objNegUsuarios.postSolicitarContrasena(parametros);
            return objResponse;
        }


        [HttpPost]
        [AllowAnonymous]
        [ActionName("postRegistrarse")]
        public ClsModResponse postRegistrarse(paramsUsuarioDTO parametros)
        {
            objResponse = new ClsModResponse();
            objResponse = objNegUsuarios.postRegistrarse(parametros);
            return objResponse;
        }
    }
}
