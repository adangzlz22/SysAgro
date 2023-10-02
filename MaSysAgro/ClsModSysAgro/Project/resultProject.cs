using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClsModSysAgro.Project
{
    public class resultProject
    {
        public int ProjectID { get; set; }
        public string ProjectName { get; set; }
        public int ClientID { get; set; }
        public decimal Longitud_1 { get; set; }
        public decimal Latitud_1 { get; set; }
        public decimal Longitud_2 { get; set; }
        public decimal Latitud_2 { get; set; }
        public int Activo { get; set; }
    }
}
