using System.Collections.Generic;
using AspDotnetVueJS.Models;

namespace AspDotnetVueJS.Providers
{
    public interface IWeatherProvider
    {
        List<WeatherForecast> GetForecasts();
    }
}
