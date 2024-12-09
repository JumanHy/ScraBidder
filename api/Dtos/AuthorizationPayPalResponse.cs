using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class AuthorizationPayPalResponse
    {

        public string Id { get; set; }
        public string Status { get; set; }

        [JsonPropertyName("payment_source")]
        public PaymentSource PaymentSource { get; set; }

        [JsonPropertyName("purchase_units")]

        public List<PurchaseUnit> PurchaseUnits { get; set; }
        public Payer Payer { get; set; }
    }

    public class PaymentSource
    {
        public PayPal PayPal { get; set; }
    }

    public class PayPal
    {
        public Name Name { get; set; }

        [JsonPropertyName("email_address")]
        public string EmailAddress { get; set; }

        [JsonPropertyName("account_id")]
        public string AccountId { get; set; }
    }

    public class Name
    {

        [JsonPropertyName("given_name")]
        public string GivenName { get; set; }
        public string Surname { get; set; }
    }

    public class PurchaseUnit
    {

        [JsonPropertyName("reference_id")]
        public string ReferenceId { get; set; }
        public Payments Payments { get; set; }
    }

    public class Payments
    {
        public List<Authorization> Authorizations { get; set; }
    }

    public class Authorization
    {
        public string Id { get; set; }
        public string Status { get; set; }
        public Amount Amount { get; set; }

        [JsonPropertyName("expiration_time")]
        public string ExpirationTime { get; set; }
    }

    public class Amount
    {

        [JsonPropertyName("currency_code")]
        public string CurrencyCode { get; set; }
        public string Value { get; set; }
    }

    public class Payer
    {
        public Name Name { get; set; }

        [JsonPropertyName("email_address")]
        public string EmailAddress { get; set; }

        [JsonPropertyName("payer_id")]
        public string PayerId { get; set; }
    }

}