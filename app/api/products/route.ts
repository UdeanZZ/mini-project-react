export async function GET() {
  try {
    const upstreamRes = await fetch("https://dummyjson.com/products");
    const data = await upstreamRes.json();
    return Response.json(data);
  } catch {
    return Response.json(
      { message: "Internal server error" },
      {
        status: 500,
      },
    );
  }
}
