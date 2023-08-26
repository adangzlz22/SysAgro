using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace MaSysAgro
{
    public class Funciones
    {
        public static string EncriptaClave(string Pasword)
        {
            string Retorno = string.Empty;
            char caracter;

            for (int i = 0; i < Pasword.Length; i++)
            {
                caracter = Convert.ToChar(Pasword.Substring(i, 1));

                if (Char.IsNumber(caracter)) //numero
                {
                    int a = (char)caracter;
                    Retorno = Retorno + a.ToString();
                }
                else if (Char.IsLetter(caracter)) // letra
                {
                    int a = (char)caracter;
                    Retorno = Retorno + a.ToString();
                }
                else //simbolo
                {
                    int a = (char)caracter;
                    Retorno = Retorno + a.ToString();
                }
            }
            if (Retorno.Length < 36)
            {
                while (Retorno.Length < 36)
                {
                    Retorno = Retorno + "0";
                }
            }
            Int64 ni2 = Convert.ToInt64(Retorno.Substring(18, 18));

            Int64 ni = Convert.ToInt64(Retorno.Substring(0, 18));

            long n = (ni + ni2) >> 1;
            byte[] data;
            using (MD5 md5Hash = MD5.Create())
            {
                data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(n.ToString()));
            }
            StringBuilder sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data 
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            //long n2 = n << 1; {c445edfb77edea90ff584117ac35ae06}
            return Retorno = sBuilder.ToString();
        }

        public static string EncriptaClaveSQL(string Password)
        {
            if (Password == null)
            {
                return null;
            }

            string Clv = "R@M0n";
            var bytesEncriptar = Encoding.UTF8.GetBytes(Password);
            var bytesClv = Encoding.UTF8.GetBytes(Clv);

            bytesClv = SHA256.Create().ComputeHash(bytesClv);

            var bytesRetorno = Encrypt(bytesEncriptar, bytesClv);

            return Convert.ToBase64String(bytesRetorno);
        }

        public static string Decrypt(string Password)
        {

            if (Password == null)
            {
                return null;
            }
            string Clv = "R@M0n";
            var bytesDesEncriptar = Convert.FromBase64String(Password);
            var bytesClv = Encoding.UTF8.GetBytes(Clv);

            bytesClv = SHA256.Create().ComputeHash(bytesClv);

            var bytesRetorno = Decrypt(bytesDesEncriptar, bytesClv);

            return Encoding.UTF8.GetString(bytesRetorno);
        }

        private static byte[] Decrypt(byte[] bytesDesEncriptar, byte[] bytesClv)
        {
            byte[] desencriptado = null;

            var saltBytes = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };

            using (MemoryStream ms = new MemoryStream())
            {
                using (RijndaelManaged AES = new RijndaelManaged())
                {
                    var key = new Rfc2898DeriveBytes(bytesClv, saltBytes, 1000);

                    AES.KeySize = 256;
                    AES.BlockSize = 128;
                    AES.Key = key.GetBytes(AES.KeySize / 8);
                    AES.IV = key.GetBytes(AES.BlockSize / 8);
                    AES.Mode = CipherMode.CBC;

                    using (var cs = new CryptoStream(ms, AES.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(bytesDesEncriptar, 0, bytesDesEncriptar.Length);
                        cs.Close();
                    }

                    desencriptado = ms.ToArray();
                }
            }

            return desencriptado;
        }

        private static byte[] Encrypt(byte[] bytesEncriptar, byte[] bytesClv)
        {
            byte[] bytesEncriptados = null;

            var saltBytes = new byte[] { 1, 2, 3, 4, 5, 6, 7, 8 };

            using (MemoryStream ms = new MemoryStream())
            {
                using (RijndaelManaged AES = new RijndaelManaged())
                {
                    var key = new Rfc2898DeriveBytes(bytesClv, saltBytes, 1000);

                    AES.KeySize = 256;
                    AES.BlockSize = 128;
                    AES.Key = key.GetBytes(AES.KeySize / 8);
                    AES.IV = key.GetBytes(AES.BlockSize / 8);

                    AES.Mode = CipherMode.CBC;

                    using (var cs = new CryptoStream(ms, AES.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(bytesEncriptar, 0, bytesEncriptar.Length);
                        cs.Close();
                    }

                    bytesEncriptados = ms.ToArray();
                }
            }

            return bytesEncriptados;
        }

        public static void RegistrarConsulta(string _Titulo,
            DateTime _FechaConsulta,
                                             string _RFC,
                                             string _Contribuyente,
                                             string _FechaDOF,
                                             string _FechaSAT,
                                             string _idUsuario,
                                             string _Situacion,
                                             string _NyFOficioGlobalPresuncion,
                                             string _PublicacionSATPresuntos,
                                             string _PublicacionDOFPresuntos,
                                             string _NyFOficioGlobalDesvirtuacion,
                                             string _PublicacionSATDesvirtuados,
                                             string _PublicacionDOFDesvirtuados,
                                             string _NyFOficioGlobalDefinitivos,
                                             string _PublicacionSATDefinitivos,
                                             string _PublicacionDOFDefinitivos,
                                             string _NyFOficioGlobalFavorable,
                                             string _PublicacionSATFavorable,
                                             string _PublicacionDOFFavorable,
                                             DateTime _Actualizado,
                                             string _ArchivoCreacion,
                                             string _ArchivoModificacion,
                                             string _Identificador,
                                             string _NyFOficioGlobal)
        {
            //using (var oContext = new PLDGeneralEntities())
            //{
            //    var _oNuevoRegistroConsulta = new PLDGenConsulta69B();
            //    _oNuevoRegistroConsulta.FechaConsulta = _FechaConsulta;
            //    _oNuevoRegistroConsulta.RFC = _RFC.Trim();
            //    _oNuevoRegistroConsulta.Contribuyente = _Contribuyente.Trim();
            //    _oNuevoRegistroConsulta.FechaDOF = _FechaDOF.Trim();
            //    _oNuevoRegistroConsulta.FechaSAT = _FechaSAT.Trim();
            //    _oNuevoRegistroConsulta.idUsaurio = _idUsuario.Trim();
            //    _oNuevoRegistroConsulta.Titulo = _Titulo.Trim();
            //    _oNuevoRegistroConsulta.Situacion = _Situacion.Trim();
            //    _oNuevoRegistroConsulta.NyFOficioGlobalPresuncion = _NyFOficioGlobalPresuncion.Trim();
            //    _oNuevoRegistroConsulta.PublicacionSATPresuntos = _PublicacionSATPresuntos.Trim();
            //    _oNuevoRegistroConsulta.PublicacionDOFPresuntos = _PublicacionDOFPresuntos.Trim();
            //    _oNuevoRegistroConsulta.NyFOficioGlobalDesvirtuacion = _NyFOficioGlobalDesvirtuacion.Trim() == "" ? null : _NyFOficioGlobalDesvirtuacion.Trim();
            //    _oNuevoRegistroConsulta.PublicacionSATDesvirtuados = _PublicacionSATDesvirtuados.Trim() == "" ? null : _PublicacionSATDesvirtuados.Trim();
            //    _oNuevoRegistroConsulta.PublicacionDOFDesvirtuados = _PublicacionDOFDesvirtuados.Trim() == "" ? null : _PublicacionDOFDesvirtuados.Trim();
            //    _oNuevoRegistroConsulta.NyFOficioGlobalDefinitivos = _NyFOficioGlobalDefinitivos.Trim() == "" ? null : _NyFOficioGlobalDefinitivos.Trim();
            //    _oNuevoRegistroConsulta.PublicacionSATDefinitivos = _PublicacionSATDefinitivos.Trim() == "" ? null : _PublicacionSATDefinitivos.Trim();
            //    _oNuevoRegistroConsulta.PublicacionDOFDefinitivos = _PublicacionDOFDefinitivos.Trim() == "" ? null : _PublicacionDOFDefinitivos.Trim();
            //    _oNuevoRegistroConsulta.NyFOficioGlobalFavorable = _NyFOficioGlobalFavorable.Trim() == "" ? null : _NyFOficioGlobalFavorable.Trim();
            //    _oNuevoRegistroConsulta.PublicacionSATFavorable = _PublicacionSATFavorable.Trim() == "" ? null : _PublicacionSATFavorable.Trim();
            //    _oNuevoRegistroConsulta.PublicacionDOFFavorable = _PublicacionDOFFavorable.Trim() == "" ? null : _PublicacionDOFFavorable.Trim();
            //    _oNuevoRegistroConsulta.Actualizado = _Actualizado;
            //    _oNuevoRegistroConsulta.ArchivoCreacion = _ArchivoCreacion == null ? "Listado_Completo_69-B20112020" : _ArchivoCreacion.Trim();
            //    _oNuevoRegistroConsulta.ArchivoModificacion = _ArchivoModificacion.Trim();
            //    _oNuevoRegistroConsulta.Identificador = _Identificador.Trim();
            //    _oNuevoRegistroConsulta.NyFOficioGlobal = _NyFOficioGlobal.Trim();

            //    oContext.PLDGenConsulta69B.Add(_oNuevoRegistroConsulta);
            //    oContext.SaveChanges();
            //}
        }

        public static string GetMonthName(int iMes)
        {
            string _strNombreMes = "";
            switch (iMes)
            {
                case 1:
                    _strNombreMes = "Enero";
                    break;
                case 2:
                    _strNombreMes = "Febrero";
                    break;
                case 3:
                    _strNombreMes = "Marzo";
                    break;
                case 4:
                    _strNombreMes = "Abril";
                    break;
                case 5:
                    _strNombreMes = "Mayo";
                    break;
                case 6:
                    _strNombreMes = "Junio";
                    break;
                case 7:
                    _strNombreMes = "Julio";
                    break;
                case 8:
                    _strNombreMes = "Agosto";
                    break;
                case 9:
                    _strNombreMes = "Septiembre";
                    break;
                case 10:
                    _strNombreMes = "Octubre";
                    break;
                case 11:
                    _strNombreMes = "Noviembre";
                    break;
                case 12:
                    _strNombreMes = "Diciembre";
                    break;
            }
            return _strNombreMes;
        }

        /* ------------------------------------------------------------*/

        public byte[] ConvertImageToBinary(System.Drawing.Image img)
        {
            using (MemoryStream oMS = new MemoryStream())
            {
                img.Save(oMS, ImageFormat.Png);
                return oMS.ToArray();
            }
        }
        public string ObtenerUrlDeByteArray(byte[] byteArray)
        {
            return "data:image/jpg;base64," + Convert.ToBase64String(byteArray);
        }

        public byte[] GetImageAsByteArray(string imageFilePath)
        {
            // Open a read-only file stream for the specified file.
            using (FileStream fileStream =
                new FileStream(imageFilePath, FileMode.Open, FileAccess.Read))
            {
                // Read the file's contents into a byte array.
                BinaryReader binaryReader = new BinaryReader(fileStream);
                return binaryReader.ReadBytes((int)fileStream.Length);
            }
        }

        public System.Drawing.Image UrlImageToImage(string imageFilePath)
        {
            WebClient wc = new WebClient();
            byte[] bytes = wc.DownloadData(imageFilePath);
            MemoryStream ms = new MemoryStream(bytes);
            return System.Drawing.Image.FromStream(ms);
        }

        public Bitmap UrlToBitmap(string imageFilePath)
        {
            WebClient wc = new WebClient();
            byte[] originalData = wc.DownloadData(imageFilePath);
            MemoryStream stream = new MemoryStream(originalData);
            Bitmap Bitmap = new Bitmap(stream);
            return Bitmap;
        }

        public Bitmap AdjustBrightnessImage(Bitmap Image, int Value)
        {
            Bitmap TempBitmap = Image;
            Bitmap NewBitmap = new Bitmap(TempBitmap.Width, TempBitmap.Height);
            Graphics NewGraphics = Graphics.FromImage(NewBitmap);
            float FinalValue = (float)Value / 255.0f;
            float[][] FloatColorMatrix ={
                    new float[] {1, 0, 0, 0, 0},
                    new float[] {0, 1, 0, 0, 0},
                    new float[] {0, 0, 1, 0, 0},
                    new float[] {0, 0, 0, 1, 0},
                    new float[] {FinalValue, FinalValue, FinalValue, 1, 1}
                };
            ColorMatrix NewColorMatrix = new ColorMatrix(FloatColorMatrix);
            ImageAttributes Attributes = new ImageAttributes();
            Attributes.SetColorMatrix(NewColorMatrix);
            NewGraphics.DrawImage(TempBitmap, new Rectangle(0, 0, TempBitmap.Width, TempBitmap.Height), 0, 0, TempBitmap.Width, TempBitmap.Height, GraphicsUnit.Pixel, Attributes);
            Attributes.Dispose();
            NewGraphics.Dispose();
            return NewBitmap;
        }

        public Bitmap AjustContrastImage(Bitmap sourceBitmap, int threshold)
        {
            BitmapData sourceData = sourceBitmap.LockBits(new Rectangle(0, 0,
                                        sourceBitmap.Width, sourceBitmap.Height),
                                        ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
            byte[] pixelBuffer = new byte[sourceData.Stride * sourceData.Height];
            Marshal.Copy(sourceData.Scan0, pixelBuffer, 0, pixelBuffer.Length);
            sourceBitmap.UnlockBits(sourceData);
            double contrastLevel = Math.Pow((100.0 + threshold) / 100.0, 2);
            double blue = 0;
            double green = 0;
            double red = 0;
            for (int k = 0; k + 4 < pixelBuffer.Length; k += 4)
            {
                blue = ((((pixelBuffer[k] / 255.0) - 0.5) *
                            contrastLevel) + 0.5) * 255.0;

                green = ((((pixelBuffer[k + 1] / 255.0) - 0.5) *
                            contrastLevel) + 0.5) * 255.0;

                red = ((((pixelBuffer[k + 2] / 255.0) - 0.5) *
                            contrastLevel) + 0.5) * 255.0;

                if (blue > 255)
                { blue = 255; }
                else if (blue < 0)
                { blue = 0; }

                if (green > 255)
                { green = 255; }
                else if (green < 0)
                { green = 0; }

                if (red > 255)
                { red = 255; }
                else if (red < 0)
                { red = 0; }

                pixelBuffer[k] = (byte)blue;
                pixelBuffer[k + 1] = (byte)green;
                pixelBuffer[k + 2] = (byte)red;
            }
            Bitmap resultBitmap = new Bitmap(sourceBitmap.Width, sourceBitmap.Height);
            BitmapData resultData = resultBitmap.LockBits(new Rectangle(0, 0,
                                        resultBitmap.Width, resultBitmap.Height),
                                        ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);
            Marshal.Copy(pixelBuffer, 0, resultData.Scan0, pixelBuffer.Length);
            resultBitmap.UnlockBits(resultData);
            return resultBitmap;
        }

        public static string EncriptarMD5(string texto)
        {
            try
            {

                string key = "qualityinfosolutions"; //llave para encriptar datos

                byte[] keyArray;

                byte[] Arreglo_a_Cifrar = UTF8Encoding.UTF8.GetBytes(texto);

                //Se utilizan las clases de encriptación MD5

                MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();

                keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));

                hashmd5.Clear();

                //Algoritmo TripleDES
                TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();

                tdes.Key = keyArray;
                tdes.Mode = CipherMode.ECB;
                tdes.Padding = PaddingMode.PKCS7;

                ICryptoTransform cTransform = tdes.CreateEncryptor();

                byte[] ArrayResultado = cTransform.TransformFinalBlock(Arreglo_a_Cifrar, 0, Arreglo_a_Cifrar.Length);

                tdes.Clear();

                //se regresa el resultado en forma de una cadena
                texto = Convert.ToBase64String(ArrayResultado, 0, ArrayResultado.Length);

            }
            catch (Exception)
            {

            }
            return texto;
        }

        public static string DesencriptarMD5(string textoEncriptado)
        {
            try
            {
                string key = "qualityinfosolutions";
                byte[] keyArray;
                byte[] Array_a_Descifrar = Convert.FromBase64String(textoEncriptado);

                //algoritmo MD5
                MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();

                keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));

                hashmd5.Clear();

                TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();

                tdes.Key = keyArray;
                tdes.Mode = CipherMode.ECB;
                tdes.Padding = PaddingMode.PKCS7;

                ICryptoTransform cTransform = tdes.CreateDecryptor();

                byte[] resultArray = cTransform.TransformFinalBlock(Array_a_Descifrar, 0, Array_a_Descifrar.Length);

                tdes.Clear();
                textoEncriptado = UTF8Encoding.UTF8.GetString(resultArray);

            }
            catch (Exception)
            {

            }
            return textoEncriptado;
        }


    }
}