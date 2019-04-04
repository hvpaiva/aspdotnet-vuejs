using System.IO;
using System.IO.Compression;
using System.Reflection;
using AspDotnetVueJS.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;

namespace AspDotnetVueJS
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v2.1.0", new Info {
                    Title = "AspDotnetVueJs API",
                    Description = "A simple example Core Web API",
                    TermsOfService = "None",
                    Version = "v2.1.0",
                    Contact = new Contact
                    {
                        Name = "Highlander Paiva",
                        Email = string.Empty,
                        Url = "https://hvpaiva.com"
                    },
                    License = new License
                    {
                        Name = "MIT",
                        Url = "https://github.com/hvpaiva/aspdotnet-vuejs/blob/master/LICENSE"
                    }
                });

                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location), xmlFile);
                c.IncludeXmlComments(xmlPath);
            });

            // Enable the Gzip compression especially for Kestrel
            services.Configure<GzipCompressionProviderOptions>(options =>
                options.Level = CompressionLevel.Optimal);
            services.AddResponseCompression(options =>
            {
#if (!NoHttps)
                options.EnableForHttps = true;
#endif
            });

            services.AddSpaStaticFiles(config => { config.RootPath = "wwwroot/"; });

            // Example with dependency injection for a data provider.
            services.AddWeather();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
#if (!NoHttps)
                app.UseHsts();
            }

            app.UseHttpsRedirection();
#else
            }
#endif

            app.UseResponseCompression(); // No need if you use IIS, but really something good for Kestrel!

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();
            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v2.1.0/swagger.json", "AspDotnetVueJs 2.1.0");
            });

            // Idea: https://code.msdn.microsoft.com/How-to-fix-the-routing-225ac90f
            // This avoid having a real mvc view. You have other way of doing, but this one works
            // properly.
            // app.UseSpa();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    "default",
                    "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                    spa.ApplicationBuilder.UseWebpackDevMiddleware(
                        new WebpackDevMiddlewareOptions
                        {
                            HotModuleReplacement = true,
                            ConfigFile = "./build/webpack.config.js"
                        });
            });
        }
    }
}
