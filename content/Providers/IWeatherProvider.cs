using System.Collections.Generic;
using AspDotnetVueJs.Models;

namespace AspDotnetVueJs.Providers
{
    public interface IWeatherProvider
    {
        List<WeatherForecast> GetForecasts();
    }
}
