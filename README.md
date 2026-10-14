# Smile Tips — protótipo 1.0

Site estático responsivo com uma função Cloudflare Pages para obter fixtures da API-Football.

## Conteúdo
- `index.html`: interface mobile/desktop, filtros e boletim interativo.
- `functions/api/fixtures.js`: endpoint server-side `/api/fixtures`; a chave da API nunca deve ser colocada no HTML.
- `README.md`: instruções.

## Dados e limitações
- Sem `API_FOOTBALL_KEY`, o site funciona em modo de demonstração com exemplos fictícios.
- A função consulta jogos para a data atual no fuso `Africa/Luanda`.
- As probabilidades 1X2 no mapeamento são marcadores provisórios (34/32/34), NÃO previsões reais. O próximo passo é implementar um modelo validado ou integrar previsões disponibilizadas pelo fornecedor.
- Resultados exatos devem ser calculados apenas após construir e validar um modelo estatístico. Nenhuma previsão garante resultados.

## Publicar gratuitamente com Cloudflare Pages
1. Cria uma conta no Cloudflare e um repositório GitHub, ou usa o fluxo de upload suportado pelo Cloudflare Pages.
2. Coloca `index.html` na raiz e a pasta `functions/` ao lado.
3. No Cloudflare Pages, liga o repositório. Para HTML simples, usa comando de build `exit 0` e diretório de saída `.`.
4. Em Settings → Variables and Secrets, adiciona `API_FOOTBALL_KEY` como secret encriptado.
5. Faz deploy e testa `https://teu-site.pages.dev/api/fixtures`.

A Cloudflare Pages Functions precisa de ser publicada a partir de um projeto com suporte a Functions; upload direto de ficheiros estáticos não executa esta função.

## Segurança
- Nunca publiques a chave API no HTML, num repositório público ou numa mensagem.
- Se uma chave já tiver sido exposta, revoga-a e gera outra.
- Antes de recolher contas de utilizadores, pagamentos ou dados pessoais, acrescenta autenticação e uma política de privacidade adequada.
