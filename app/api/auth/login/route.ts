export async function POST(req: Request) {
  try {
    const body = await req.json();

    const upstreamRes = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await upstreamRes.json();
    // console.log(data); // For debugging purposes
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
