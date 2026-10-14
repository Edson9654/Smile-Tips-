export async function onRequestGet({ request, env }) {
  const key = env.API_FOOTBALL_KEY;
  if (!key) {
    return Response.json({ error: "API_FOOTBALL_KEY não configurada", fixtures: [] }, { status: 503 });
  }
  try {
    const url = new URL("https://v3.football.api-sports.io/fixtures");
    const day = new URL(request.url).searchParams.get("date") || new Date().toISOString().slice(0, 10);
    url.searchParams.set("date", day);
    url.searchParams.set("timezone", "Africa/Luanda");
    const upstream = await fetch(url, { headers: { "x-apisports-key": key } });
    if (!upstream.ok) return Response.json({ error: "O fornecedor de dados devolveu um erro." }, { status: 502 });
    const payload = await upstream.json();
    const fixtures = (payload.response || []).map((item) => {
      const home = item.teams?.home?.name || "Equipa casa";
      const away = item.teams?.away?.name || "Equipa visitante";
      return {
        id: item.fixture?.id,
        league: item.league?.name || "Futebol",
        date: item.fixture?.date ? new Date(item.fixture.date).toLocaleTimeString("pt-PT",{hour:"2-digit",minute:"2-digit",timeZone:"Africa/Luanda"}) : "",
        home, away, probabilities: [34,32,34], predictedScore: "—"
      };
    });
    return Response.json({ fixtures, source: "API-Football", note: "Probabilidades ainda não calculadas; valores atuais são marcadores provisórios." }, {
      headers: { "Cache-Control": "public, max-age=300", "Access-Control-Allow-Origin": "*" }
    });
  } catch {
    return Response.json({ error: "Não foi possível consultar os jogos.", fixtures: [] }, { status: 502 });
  }
}
