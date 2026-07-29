const PUBLIC_MEDIA_TYPE = "application/vnd.orion.contracts+json;version=1.0";
const LOCAL_GATEWAY_URL = "http://127.0.0.1:4317/orientation/v1/requests";

export async function POST(request: Request) {
  const configuredGatewayUrl = process.env.ORION_GATEWAY_URL;
  const gatewayUrl = configuredGatewayUrl || LOCAL_GATEWAY_URL;
  const gatewayHost = new URL(gatewayUrl).host;
  const bearerToken = process.env.ORION_GATEWAY_BEARER_TOKEN;
  if (configuredGatewayUrl && !bearerToken) {
    return Response.json(
      { boundary_failure: { category: "gateway_failure", code: "gateway_credentials_unavailable" } },
      { status: 503, headers: { "cache-control": "no-store" } },
    );
  }
  try {
    const payload = await request.text();
    const response = await fetch(gatewayUrl, {
      method: "POST",
      headers: {
        "content-type": PUBLIC_MEDIA_TYPE,
        accept: PUBLIC_MEDIA_TYPE,
        ...(bearerToken ? { authorization: `Bearer ${bearerToken}` } : {}),
      },
      body: payload,
      cache: "no-store",
    });
    return new Response(await response.text(), {
      status: response.status,
      headers: {
        "content-type": PUBLIC_MEDIA_TYPE,
        "cache-control": "no-store",
        "x-orion-gateway-host": gatewayHost,
      },
    });
  } catch {
    return Response.json(
      { boundary_failure: { category: "gateway_failure", code: "gateway_unavailable" } },
      { status: 503, headers: { "cache-control": "no-store" } },
    );
  }
}
