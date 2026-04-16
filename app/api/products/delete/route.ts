export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    const upstreamRes = await fetch(`https://dummyjson.com/products/${body.id}`, {
      method: "DELETE",
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
