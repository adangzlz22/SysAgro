using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Cors;
using System.Web.Http.Cors;

namespace SysAgroAp.App_Start
{
    public class AccesPolicyCors : Attribute, ICorsPolicyProvider
    {
        public async Task<CorsPolicy> GetCorsPolicyAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var corsRequest = request.GetCorsRequestContext();
            var originRequested = corsRequest.Origin;
            if (await IsOriginFromCustomer(originRequested))
            {
                var policy = new CorsPolicy
                {
                    AllowAnyHeader = true,
                    AllowAnyMethod = true,
                    AllowAnyOrigin = true

                };
                policy.Origins.Add(originRequested);
                return policy;
            }
            return null;
        }
        private async Task<bool> IsOriginFromCustomer(string originRequested)
        {
            return true;
        }
    }
}