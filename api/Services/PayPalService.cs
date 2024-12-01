using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;
using api.Dtos;
namespace api.Services
{


    public class PayPalService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public PayPalService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        // Get Access Token
        public async Task<string?> GetAccessTokenAsync()
        {
            var clientId = _configuration["PayPal:ClientId"];
            var clientSecret = _configuration["PayPal:ClientSecret"];
            var credentials = Convert.ToBase64String(Encoding.UTF8.GetBytes($"{clientId}:{clientSecret}"));

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);
            var content = new StringContent("grant_type=client_credentials", Encoding.UTF8, "application/x-www-form-urlencoded");

            var response = await _httpClient.PostAsync($"{_configuration["PayPal:BaseUrl"]}/v1/oauth2/token", content);
            response.EnsureSuccessStatusCode();
            var responseContent = await response.Content.ReadAsStringAsync();

            var jsonResponse = JsonSerializer.Deserialize<Dictionary<string, object>>(responseContent);
            if (jsonResponse.TryGetValue("access_token", out var accessToken))
            {
                Console.WriteLine($"Access Token: {accessToken}");
                return accessToken.ToString();
            }
            return null;
        }

        // Create PayPal Order
        public async Task<string> CreateOrderAsync(decimal amount, string intent, string currency = "USD")
        {
            var accessToken = await GetAccessTokenAsync();
            if (accessToken == null)
            {
                throw new ArgumentNullException("it is null");
            }
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            var orderData = new
            {
                intent = intent,
                purchase_units = new[]
                {
                new
                {
                    amount = new
                    {
                        currency_code = currency,
                        value = amount.ToString("F2")
                    }
                }
            }
            };

            var content = new StringContent(JsonSerializer.Serialize(orderData), Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync($"{_configuration["PayPal:BaseUrl"]}/v2/checkout/orders", content);
            response.EnsureSuccessStatusCode();

            var result = JsonSerializer.Deserialize<Dictionary<string, object>>(await response.Content.ReadAsStringAsync());
            return result["id"].ToString(); // Return the Order ID
        }

        // Capture Payment
        public async Task<Dictionary<string, object>> CapturePaymentAsync(string orderId)
        {
            var accessToken = await GetAccessTokenAsync();
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            _httpClient.DefaultRequestHeaders.Add("PayPal-Request-Id", Guid.NewGuid().ToString());
            var content = new StringContent("{}", Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync($"{_configuration["PayPal:BaseUrl"]}/v2/checkout/orders/{orderId}/capture", content);
            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Capturing failed. Response: {await response.Content.ReadAsStringAsync()}");
            }
            var result = JsonSerializer.Deserialize<Dictionary<string, object>>(await response.Content.ReadAsStringAsync());
            return result;
        }

        public async Task<AuthorizationPayPalResponse> AuthorizePaymentAsync(string orderId)
        {
            var accessToken = await GetAccessTokenAsync();
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            // Explicitly set content to an empty JSON object for the body
            var content = new StringContent("{}", Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync($"{_configuration["PayPal:BaseUrl"]}/v2/checkout/orders/{orderId}/authorize", content);
            if (!response.IsSuccessStatusCode)
            {
                // Extract error details for logging/debugging
                var errorResponse = await response.Content.ReadAsStringAsync();
                throw new Exception($"Authorization failed with status code {response.StatusCode}. Response: {errorResponse}");
            }
            var responseContent = await response.Content.ReadAsStringAsync();

            var result = JsonSerializer.Deserialize<AuthorizationPayPalResponse>(
                responseContent,
                new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
            return result ?? throw new Exception("Failed to deserialize PayPal authorization response.");

        }

        public async Task<bool> VoidAuthorizedPaymentAsync(string authorizationId)
        {
            var accessToken = await GetAccessTokenAsync();
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            _httpClient.DefaultRequestHeaders.Add("PayPal-Request-Id", Guid.NewGuid().ToString());
            var content = new StringContent("{}", Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync($"{_configuration["PayPal:BaseUrl"]}/v2/payments/authorizations/{authorizationId}/void", content);

            return response.IsSuccessStatusCode;
        }

        public async Task<CapturingAuthorizedPayPalResponse> CaptureAuthorizedPaymentAsync(string authorizationId, decimal amount)
        {
            var accessToken = await GetAccessTokenAsync();
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            _httpClient.DefaultRequestHeaders.Add("PayPal-Request-Id", Guid.NewGuid().ToString());
            var payload = new
            {
                amount = new
                {
                    value = amount,
                    currency_code = "USD"
                },
                final_capture = true
            };

            var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync($"{_configuration["PayPal:BaseUrl"]}/v2/payments/authorizations/{authorizationId}/capture", content);
            response.EnsureSuccessStatusCode();

            var result = JsonSerializer.Deserialize<CapturingAuthorizedPayPalResponse>(await response.Content.ReadAsStringAsync());
            return result;
        }

    }

}