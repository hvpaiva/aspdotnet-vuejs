using System.IO;
using System.IO.Compression;
using System.Reflection;
using AspDotnetVueJs.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;

[assembly: ApiConventionType(typeof(DefaultApiConventions))]

namespace AspDotnetVueJs
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public static IConfiguration Configuration { get; private set; }

        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Title = Configuration["App:Title"],
                    Description = Configuration["App:Description"],
                    TermsOfService = Configuration["App:TermsOfService"],
                    Version = Configuration["App:Version"]
                });

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(Path.GetDirectoryName(Assembly.GetEntryAssembly()?.Location), xmlFile);
                c.IncludeXmlComments(xmlPath);
            });

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });

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
            app.UseCors("CorsPolicy");

            app.UseResponseCompression();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint(
                    $"{Configuration["BaseUriPath"]}/swagger/v1/swagger.json",
                    $"{Configuration["App:Title"]} {Configuration["App:Version"]}"
                );
            });

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
                            ConfigFile = "./ClientApp/build/webpack.config.js"
                        });
            });
        }
    }
}
