export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const q = url.searchParams.get("q") ?? "";

    const upstreamRes = await fetch(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(q)}`
    );
    const data = await upstreamRes.json();

    return Response.json(data, {
      status: upstreamRes.status,
    });
  } catch {
    return Response.json(
      { message: "Internal server error" },
      {
        status: 500,
      }
    );
  }
}
