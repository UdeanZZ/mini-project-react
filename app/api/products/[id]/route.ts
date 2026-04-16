type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: Request, ctx: RouteContext) {
  try {
    const { id } = await ctx.params;

    const upstreamRes = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await upstreamRes.json();

    return Response.json(data, {
      status: upstreamRes.status,
    });
  } catch {
    return Response.json(
      { message: "Internal server error" },
      {
        status: 500,
      },
    );
  }
}
