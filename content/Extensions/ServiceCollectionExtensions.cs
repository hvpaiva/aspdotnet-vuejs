using AspDotnetVueJs.Providers;
using Microsoft.Extensions.DependencyInjection;

namespace AspDotnetVueJs.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddWeather(this IServiceCollection services)
        {
            services.AddSingleton<IWeatherProvider, WeatherProviderFake>();

            return services;
        }
    }
}
