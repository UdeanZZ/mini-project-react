export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const upstreamRes = await fetch(`https://dummyjson.com/products/${body.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

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
