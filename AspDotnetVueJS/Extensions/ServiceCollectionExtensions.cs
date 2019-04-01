using AspDotnetVueJS.Providers;
using Microsoft.Extensions.DependencyInjection;

namespace AspDotnetVueJS.Extensions
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
