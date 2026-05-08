// =============================================================================
// CASES.js - CARDÁPIO DE COMANDOS PARA BOT WHATSAPP
// =============================================================================
// 
// 📚 O QUE É ESTE ARQUIVO?
// =====================
// Este é um arquivo de EXEMPLOS e MODELOS de comandos para bot WhatsApp.
// Pense nele como um "cardápio" - você escolhe os comandos que quer
// e copia/cola no seu próprio projeto!
//
// 🎯 PARA QUEM SERVE ESTE ARQUIVO?
// ================================
// ✓ Desenvolvedores que querem exemplos prontos para copiar
// ✓ Pessoas aprendendo a criar bots (veja como funciona cada comando)
// ✓ Quem busca inspiração para novas funcionalidades
// ✓ Quem precisa de referência de comandos prontos
//
// 🚀 COMO USAR ESTE ARQUIVO?
// =========================
// 1. NÃO COLOQUE ESTE ARQUIVO INTEIRO NO SEU BOT!
// 2. ESCOLHA APENAS OS COMANDOS QUE DESEJA USAR
// 3. COPIE O COMANDO ESCOLHIDO E COLE NO SEU PROJETO
// 4. ADAPTE AS VARIÁVEIS (reply, conn, info, q, etc.)
// 5. CONFIGURE SUA API KEY SE NECESSÁRIO
//
// 🔑 ONDE CONSEGUIR A API KEY?
// =============================
// 🌐 Acesse: https://api.bronxyshost.com.br
// 📝 Crie sua conta gratuita
// 🔑 Obtenha sua chave de API
// 💡 Substitua 'SUA_KEY_AQUI' pela sua chave real
//
// ⚠️ IMPORTANTE: ESTE É UM ARQUIVO DE REFERÊNCIA!
// =============================================
// 🔑 NÃO copie tudo de uma vez - escolha só o que precisa!
// 🔑 ADAPTE as variáveis para o seu projeto
// 🔑 TESTE cada comando individualmente
// 🔑 PRECISA DE API KEY? Acesse: https://api.bronxyshost.com.br
//
// 📖 RECURSOS ÚTEIS PARA APRENDER:
// ==============================
// • Curso de JavaScript: https://youtube.com/playlist?list=PLfdDa19nz5SpJMLiGkRSctLH7QBr44goY
// • Biblioteca Baileys: https://github.com/Whiskeysockets/baileys
// • Leia os comentários para entender cada comando
//
// =============================================================================

// 🔑 CHAVE DA API - EXEMPLO PARA REFERÊNCIA
// ===========================================
// ⚠️ ATENÇÃO: Substitua 'SUA_KEY_AQUI' pela sua chave real QUANDO
// for copiar o comando para o seu projeto!
//
// 🌐 ONDE CONSEGUIR SUA API KEY?
// ================================
// 📍 Site oficial: https://api.bronxyshost.com.br
// 📝 Passos:
// 1. Acesse o site acima
// 2. Crie sua conta (gratuita)
// 3. Faça login e vá para o painel
// 4. Copie sua chave de API
// 5. Substitua 'SUA_KEY_AQUI' pela sua chave
//
// 💡 Sem a API Key, os comandos de download e busca não funcionarão!
const API_KEY_BRONXYS = "SUA_KEY_AQUI";

// =============================================================================
// 📦 IMPORTAÇÃO DAS BIBLIOTECAS NECESSÁRIAS
// =============================================================================
// 
// O que são bibliotecas? São "caixas de ferramentas" prontas que nos ajudam
// a não precisar criar tudo do zero. Cada uma tem uma função específica:

const axios = require('axios');           // 🌐 Para fazer requisições HTTP (conversar com outras APIs)
const FormData = require('form-data');    // 📤 Para enviar formulários com arquivos
const fs = require('fs');                 // 💾 Para ler e escrever arquivos no computador
const { downloadContentFromMessage } = require('@whiskeysockets/baileys'); // 📱 Para baixar mídias do WhatsApp

// =============================================================================
// 🛠️ FUNÇÕES AUXILIARES (FERRAMENTAS INTERNAS)
// =============================================================================
// 
// Estas são funções "ajudadoras" que usamos várias vezes nos comandos.
// Em vez de repetir código, criamos estas funções reutilizáveis.

// ⏱️ FUNÇÃO: Pausa temporária (como um "espere um pouco")
// =========================================================
// Para que serve? Às vezes o bot precisa esperar um pouco antes de continuar.
// Exemplo: await sleep(1000) = espera 1 segundo | await sleep(5000) = espera 5 segundos
const sleep = async ms => new Promise(resolve => setTimeout(resolve, ms));

// 🌐 FUNÇÃO: Buscar dados de uma API externa
// ===========================================
// Para que serve? Para conversar com outras APIs e receber informações em formato JSON
// JSON é um jeito organizado de enviar e receber dados pela internet
async function fetchJson(url) {
const response = await axios.get(url, {
headers: {
'User-Agent': 'Mozilla/5.0',        // 🌐 Se apresenta como um navegador normal
'Accept-Language': 'pt-BR'          // 🇧🇷 Pede resposta em português
}
});
return response.data;  // 📦 Retorna os dados recebidos
}

// 📱 FUNÇÃO: Converter mídia do WhatsApp em formato que conseguimos usar
// =======================================================================
// Para que serve? Quando alguém manda uma imagem/áudio/vídeo no WhatsApp,
// precisamos converter para um formato que consiga processar ou enviar para APIs
async function getFileBuffer(mediakey, MediaType) {
const stream = await downloadContentFromMessage(mediakey, MediaType);
let buffer = Buffer.from([]);
for await (const chunk of stream) {
buffer = Buffer.concat([buffer, chunk]);
}
return buffer;  // 📦 Retorna o arquivo convertido
}


// 🖼️ FUNÇÃO: Gerar link de imagem usando API externa
// ===================================================
// Para que serve? Para transformar uma imagem do WhatsApp em um link da internet.
// Isso é útil quando queremos enviar a imagem para outras APIs ou salvar online.
async function uploadX(midia) {
try {
const form = new FormData();
const ext = 'jpg';
form.append("file", midia, `upload.${ext}`);
 
const response = await fetch(`https://api.bronxyshost.com.br/api-bronxys/link_imagem?apikey=${API_KEY_BRONXYS}`, {
method: "POST",
body: form
});
 
const data = await response.json();
return data.link;
} catch (error) {
console.log("Erro ao fazer upload:", error);
throw error;
}
}

// =============================================================================
// 🎯 BLOCO DE EXEMPLOS DE COMANDOS (CASES)
// =============================================================================
// 
// 📖 COMO USAR ESTES EXEMPLOS?
// ================================
// • Cada "case" abaixo é um EXEMPLO de comando funcional
// • ESCOLHA os comandos que quer usar no seu bot
// • COPIE apenas o case desejado (não copie tudo de uma vez)
// • COLE no seu projeto dentro do bloco switch/case
// • ADAPTE as variáveis para o seu projeto
//
// 🎮 ESTRUTURA BÁSICA DE UM COMANDO:
// ================================
// case "nomedocomando": {
//     if(!q.trim()) return reply("Exemplo de como usar");
//     try {
//         // 🎯 A lógica do comando vai aqui
//         reply("Resposta para o usuário");
//     } catch (erro) {
//         reply("Ocorreu um erro, tente novamente");
//     }
// }
// break;
//
// 📝 VARIÁVEIS QUE VOCÊ PRECISA ADAPTAR:
// ======================================
// • reply()      - Função que envia mensagem de resposta (adapte para o seu bot)
// • conn         - Objeto de conexão do WhatsApp (adapte para o seu bot)
// • info         - Informações da mensagem recebida (adapte para o seu bot)
// • q            - Texto que o usuário digitou depois do comando (adapte)
// • from         - ID do chat onde a mensagem foi enviada (adapte)
// • prefix       - Prefixo do bot (ex: !, ., /) (adapte)
//
// ⚠️ ATENÇÃO: Os nomes das variáveis podem ser diferentes no seu projeto!
// Verifique como está definido no seu código antes de copiar.
//
// 🎯 EXEMPLO PRÁTICO:
// ==================
// Se no seu bot você usa:
// - enviar() em vez de reply()
// - conexao em vez de conn
// - mensagem em vez de info
// - texto em vez de q
//
// Então substitua no comando:
// - reply() → enviar()
// - conn → conexao
// - info → mensagem
// - q → texto

// =============================================================================
// 📊 CATEGORIA: INFORMAÇÕES E CONSULTAS
// =============================================================================
// Comandos que buscam informações úteis para o usuário

// 🏆 EXEMPLO: Tabela do Campeonato Brasileiro
// ===============================================
// O que faz? Mostra a classificação completa do Campeonato Brasileiro com todos os times
// Como usar? Digite qualquer um dos comandos abaixo:
// • !tabelacamp | • !tabela_camp | • !tabela-camp | • !campeonato | • !camptabela
// 
// 📋 PARA COPIAR: Copie todo o bloco abaixo e cole no seu projeto:
case "tabelacamp": case "tabela_camp": case "tabela-camp": case "campeonato": case "camptabela":
try {
// 📡 Busca dados atualizados da API
var abc = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/tabela_camp?apikey=${API_KEY_BRONXYS}`)
 
// 📝 Monta a mensagem com a tabela completa
let rst = "🏆 Tabela do Campeonato Brasileiro: \n\n"
for ( i = 0; i < abc.length; i++) {
rst += `📍 ( ${i+1} ) ° Time: ${abc[i].time}\n 🎯 Pontos: ${abc[i].pontos}\n 🎮 Jogos: ${abc[i].jogos}\n ✅ Vitorias: ${abc[i].vitorias}\n 🤝 Empates: ${abc[i].empates}\n ❌ Derrotas: ${abc[i].derrotas}\n ⚽ Gols Pro: ${abc[i].golsPro}\n 🥅 Gols Contra: ${abc[i].golsContra}\n 📊 Saldo Gols: ${abc[i].saldoGols}\n 📈 Aproveitamento: ${abc[i].aproveitamento}\n\n------------------------------\n\n`
}
reply(rst)
} catch (a) {
console.log(a);
return reply("❌ Erro ao buscar tabela. Tente novamente ou fale com o suporte...");
}
break;

// ⚠️ IMPORTANTE: Ao copiar, verifique se as variáveis no seu projeto são:
// - reply() → sua função de resposta
// - fetchJson() → sua função de buscar dados (ou copie a função deste arquivo)
// - API_KEY_BRONXYS → sua chave da API
//
// 🔑 PRECISA DE API KEY?
// =====================
// 🌐 Adquira em: https://api.bronxyshost.com.br
// 📝 É gratuita e necessária para os comandos funcionarem!

case "threads": case "thr":
if(!q.includes("threads.net")) return reply(`Cade o link do threads? Exemplo: ${prefix+command} https://www.threads.net/@tali_mito22/post/C_3_FbKyHtm/?xmt=AQGzOjjOpgW7PRhCZRcda0GvAqfvYqPWDwHgzn_v6_FVLQ`)
reply("Aguarde, estou enviando..")
try {
conn.sendMessage(from, {video: {url: `https://api.bronxyshost.com.br/api-bronxys/threads?url=${q}&apikey=${API_KEY_BRONXYS}`}})
} catch (a) {
console.log(a);
return reply("Erro, tente falar com o suporte...")
}
break;

case 'gerarlink2': case 'imgpralink2': {
if((isMedia && info.message.imageMessage) || isQuotedImage) {
reply(Res_Aguarde)
var Fl = info?.message?.extendedTextMessage?.contextInfo?.quotedMessage
var muk = Fl?.viewOnceMessageV2?.message?.imageMessage || Fl?.viewOnceMessage?.message?.imageMessage || Fl?.imageMessage;
let base64String = await getFileBuffer(muk, "image");
var abcd = await uploadX(base64String)
reply(`Link da imagem: ${abcd}`);
} else {
return reply("Marque uma imagem, para que eu possa converter em link.")
}
}
break;

// 📱 COMANDO: Lista de Grupos WhatsApp
// ====================================
// O que faz? Mostra uma lista de grupos WhatsApp disponíveis para entrar
// Como usar? Digite: !gruposwhatsapp
case "gruposwhatsapp":
reply("📋 Enviando lista de grupos..")
try {
// 📡 Busca a lista de grupos na API
var abcd = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/gruposwhatsapp?apikey=${API_KEY_BRONXYS}`)
 
// 📝 Monta mensagem com todos os grupos
let gps = "📱 Lista de Grupos WhatsApp:\n\n"
 
for ( i = 0; i < abcd.length; i++) {
gps += `📌 ${abcd[i].titulo}\n\n📜 Regras: ${abcd[i].regras}\n🔗 Link: ${abcd[i].link}\n\n°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°\n\n`
}
reply(gps)
} catch (a) {
console.log(a);
return reply("❌ Erro ao buscar grupos. Tente falar com o suporte...");
}
break

// 🎵 COMANDO: Baixar áudio do SoundCloud
// =======================================
// O que faz? Baixa músicas do SoundCloud em formato de áudio
// Como usar? Digite: !soundcloud link do SoundCloud
// Exemplo: !soundcloud https://soundcloud.com/artista/musica
case "soundcloud":
if(!q.trim().includes("soundcloud")) return reply("🎵 Cadê o link do SoundCloud?\n\nExemplo: !soundcloud https://soundcloud.com/artista/musica")
try {
// 🎵 Envia o áudio do SoundCloud
conn.sendMessage(from, {audio: {url: `https://api.bronxyshost.com.br/api-bronxys/soundcloud?url=${q.trim()}&apikey=${API_KEY_BRONXYS}`}, mimetype: "audio/mpeg"}, {quoted: info})
} catch (e) {
console.log(e)
return reply("❌ Erro ao baixar do SoundCloud...")
}
break;

case "ifunny": {
if(!q.trim()) return reply(`Faltando link do ifunny, Exemplo: https://br.ifunny.co/video/w9Eaa2bOB?s=cl`)
try {
conn.sendMessage(from, {video: {url: `https://api.bronxyshost.com.br/api-bronxys/ifunny?url=${q.trim()}&apikey=${API_KEY_BRONXYS}`}, mimetype: "video/mp4"}, {quoted: info})
} catch (e) {
console.log(e)
reply("Erro...")
}
}
break;

case "transcrever": {
if((isMedia && !info.message.imageMessage && info.message.videoMessage || isQuotedVideo || isQuotedAudio)) {
reply("Aguarde.. transcrevendo seu áudio..")
muk = isQuotedVideo ? JSON.parse(JSON.stringify(info).replace('quotedM','m')).message.extendedTextMessage.contextInfo.message.videoMessage : isQuotedAudio ? JSON.parse(JSON.stringify(info).replace('quotedM','m')).message.extendedTextMessage.contextInfo.message.audioMessage : info.message.audioMessage

let base64String = await getFileBuffer(muk, isQuotedAudio ? 'audio': 'video');
let buffer = Buffer.from(base64String, 'base64');

let formData = new FormData();
formData.append('file', buffer, {filename: isQuotedAudio ? 'audiofile': 'videofile', contentType: muk.mimetype });

fetch(`https://api.bronxyshost.com.br/transcrever?apikey=${API_KEY_BRONXYS}`, {
method: 'POST',
body: formData
}).then(response => response.json())
.then(data => {
reply(data.texto);
}).catch((Err) => {
console.log(Err);
reply("Sinto muito, alguns formatos de áudio/vídeo, eu não consigo transcrever, em caso de dúvidas, tente novamente...");
});
} else {
return reply("Marque um audio ou um vídeo.")
}
}
break;

case 'grupos': {
if(!q.trim()) return reply(`Exemplo: ${prefix+command} Naruto`);
reply("Realizando ação, aguarde.")
blue = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/grupos?q=${q}&apikey=${API_KEY_BRONXYS}`)
let red = "Listagem de grupos para você:\n\n"
blue.forEach(function(ab) {
red += ` - Url do Grupo: ${ab.link}\n\n - Descrição: ${ab.desc}\n\n${"-".repeat(20)}\n\n`
})
reply(red)
}
break;

case 'kwai': {
if(!q.trim().includes("kwai")) return reply(`Exemplo: ${prefix+command} LINK DO KWAI`);
reply(Res_Aguarde);
try {
conn.sendMessage(from, {video: {url: `https://api.bronxyshost.com.br/api-bronxys/kwai?url=${q.trim()}&apikey=${API_KEY_BRONXYS}`}, mimetype: "video/mp4"}, {quoted: info})
} catch (e) {
console.log(e);
return reply("Erro...");
}
}
break;

// 🎵 COMANDO: Baixar áudio do Spotify
// =====================================
// O que faz? Baixa músicas do Spotify em formato de áudio
// Como usar? Digite: !spotify link do Spotify
// Exemplo: !spotify https://open.spotify.com/track/4m3mrHuttXhK58f6Tenai1
// ⚠️ Importante: Não baixa playlists, apenas músicas individuais!
case 'spotify': {
if(!q.trim().includes("spotify")) return reply(`🎵 Exemplo: ${prefix}spotify https://open.spotify.com/intl-pt/track/4m3mrHuttXhK58f6Tenai1\n\n⚠️ Não baixo playlist. Para pegar o link da música, acesse: https://open.spotify.com/search e pesquise lá.`)
reply(Res_Aguarde);
try {
// 🎵 Envia o áudio do Spotify
conn.sendMessage(from, {audio: {url: `https://api.bronxyshost.com.br/api-bronxys/spotify?url=${q.trim()}&apikey=${API_KEY_BRONXYS}`}, mimetype: "audio/mpeg"}, {quoted: info}).catch(() => reply("❌ Erro ao baixar do Spotify!"))
} catch (e) {
console.log(e);
return reply("❌ Erro ao processar link do Spotify...");
}
}
break;

case "aptoide_pesquisa":
if(!q.trim()) return reply("Exemplo: WhatsApp")
try {
abc = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/aptoide_pesquisa?pesquisa=${q.trim()}&apikey=${API_KEY_BRONXYS}`)
reply(abc.aptoide)
} catch (e) {
console.log(e)
return reply("Erro...")
}
break;

case "aptoide":
if(!q.trim().includes("aptoide.com")) return reply(`Exemplo: ${prefix+command} link do aptoide\n\nUse o comando ${prefix}aptoide_pesquisa Exemplo: whatsapp, ae vai receber as url, pegue a url e use.`)
reply(Res_Aguarde)
try {
abc = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/aptoide?url=${q.trim()}&apikey=${API_KEY_BRONXYS}`)
conn.sendMessage(from, {document: {url: abc.link}, mimetype: "application/vnd.android.package-archive", fileName: abc.titulo}, {quoted: info}).catch((e) => console.log(e))
} catch (e) {
console.log(e)
return reply("Erro...")
}
break;

// =============================================================================
// 🎵 CATEGORIA: MÚSICA E ÁUDIO
// =============================================================================
// Comandos para baixar músicas, áudios e tocar conteúdo de várias plataformas

// 🎵 EXEMPLO: Baixar música do YouTube (Áudio)
// ================================================
// O que faz? Busca e baixa músicas do YouTube em formato de áudio
// Como usar? Digite: !play nome da música
// Exemplo: !play funk do brasil
// ⚠️ Limitação: Músicas com mais de 1 hora não serão baixadas
//
// 📋 PARA COPIAR: Copie todo o bloco abaixo e cole no seu projeto:
case 'play': {
try {
if(!q.trim()) return reply(`🎵 Exemplo: ${prefix}play nome da música\n\n📝 A música será baixada em áudio. Se não baixar, pode ser que o YouTube bloqueou o download.`)
 
// 🔍 Busca informações da música na API
data = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/pesquisa_ytb?nome=${q}&apikey=${API_KEY_BRONXYS}`)
 
// ⏱️ Verifica se a música não é muito longa (mais de 1 hora)
if(data[0]?.tempo?.length >= 7) return reply("⏰ Desculpe, este vídeo é muito grande (mais de 1 hora). Por favor, escolha uma música mais curta.")
 
var N_E = " ❌ Não encontrado."
 
// 📝 Monta mensagem bonita com informações da música
var bla = `
🎵 ๖ۣ• Titulo: ${data[0]?.titulo||N_E}
⏱️ ๖ۣ• Tempo: ${data[0]?.tempo||N_E}
📅 ๖ۣ• Postado: ${data[0]?.postado||N_E}
📝 ๖ۣ• Descrição: ${data[0]?.desc||N_E}

■■■■■ 100% 

🎵 E᥉ᥴ᥆ᥣhᥲ ᥙ꧑ᥲ ᥆ρᥴᥲ᥆...

🎥 Se desejar baixar o VÍDEO, use: ${prefix}play_video ${q.trim()}
`
 
// 🖼️ Envia a thumbnail (miniatura) da música
conn.sendMessage(from, {image: {url: data[0]?.thumb || logoslink?.logo}, caption: bla}, {quoted: info})
 
// 🎵 Envia o arquivo de áudio
conn.sendMessage(from, {audio: {url: `https://api.bronxyshost.com.br/api-bronxys/play?nome_url=${q}&apikey=${API_KEY_BRONXYS}`}, mimetype: "audio/mpeg", fileName: data[0]?.titulo || "play.mp3"}, {quoted: info}).catch(e => {
return reply("❌ Erro ao baixar música. Tente novamente...")
})
} catch (e) {
console.log(e)
return reply("🔍 Seja mais específico ou tente outro nome. / Erro na busca");
}
}
break;

// ⚠️ IMPORTANTE: Ao copiar, verifique se as variáveis no seu projeto são:
// - reply() → sua função de resposta
// - conn → sua variável de conexão WhatsApp
// - from → sua variável do chat atual
// - info → sua variável de informações da mensagem
// - q → sua variável do texto digitado
// - prefix → sua variável do prefixo
// - fetchJson() → sua função de buscar dados (ou copie a função deste arquivo)
// - API_KEY_BRONXYS → sua chave da API
//
// 🔑 PRECISA DE API KEY?
// =====================
// 🌐 Adquira em: https://api.bronxyshost.com.br
// 📝 É gratuita e necessária para os comandos de música/vídeo funcionarem!

// 🎥 COMANDO: Baixar vídeo do YouTube
// =====================================
// O que faz? Busca e baixa vídeos do YouTube
// Como usar? Digite: !play_video nome do vídeo ou !playmp4 nome do vídeo
// Exemplo: !play_video gatinho fofo
case 'playmp4':  case "play_video": {
try {
if(!q.trim()) return reply(`🎥 Exemplo: ${prefix}play_video nome do vídeo\n\n📝 O vídeo será baixado. Se não baixar, pode ser que o YouTube bloqueou o download.`)
 
// 🔍 Busca informações do vídeo na API
data = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/pesquisa_ytb?nome=${q}&apikey=${API_KEY_BRONXYS}`)
 
// ⏱️ Verifica se o vídeo não é muito longo (mais de 1 hora)
if(data[0]?.tempo?.length >= 7) return reply("⏰ Desculpe, este vídeo é muito grande (mais de 1 hora). Por favor, escolha um vídeo mais curto.")
 
var N_E = " ❌ Não encontrado."
 
// 📝 Monta mensagem bonita com informações do vídeo
var bla = `
🎥 ๖ۣ• Titulo: ${data[0]?.titulo||N_E}
⏱️ ๖ۣ• Tempo: ${data[0]?.tempo||N_E}
📅 ๖ۣ• Postado: ${data[0]?.postado||N_E}
📝 ๖ۣ• Descrição: ${data[0]?.desc||N_E}

■■■■■ 100% 

🎥 E᥉ᥴ᥆ᥣhᥲ ᥙ꧑ᥲ ᥆ρᥴᥲ᥆...

🎵 Se desejar baixar apenas o ÁUDIO, use: ${prefix}play ${q.trim()}
`
 
// 🖼️ Envia a thumbnail (miniatura) do vídeo
conn.sendMessage(from, {image: {url: data[0]?.thumb || logoslink?.logo}, caption: bla}, {quoted: info})
 
// 🎥 Envia o arquivo de vídeo
conn.sendMessage(from, {video: {url: `https://api.bronxyshost.com.br/api-bronxys/play_video?nome_url=${q}&apikey=${API_KEY_BRONXYS}`}, mimetype: "video/mp4", fileName: data[0]?.titulo || "play.mp4"}, {quoted: info}).catch(e => {
return reply("❌ Erro ao baixar vídeo. Tente novamente...")
})
} catch (e) {
console.log(e)
return reply("🔍 Seja mais específico ou tente outro nome. / Erro na busca");
}
}
break;

// 📄 COMANDO: Baixar música como documento
// ===========================================
// O que faz? Baixa música do YouTube em formato de documento (menos bloqueado)
// Como usar? Digite: !playdoc nome da música
// Exemplo: !playdoc funk 2023
case 'playdoc':
try {
if(!q.trim()) return reply(`📄 Exemplo: ${prefix}playdoc nome da música\n\n📝 A música será baixada como documento (geralmente menos bloqueado que áudio direto).`)
 
// 🔍 Busca informações da música na API
data = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/pesquisa_ytb?nome=${q}&apikey=${API_KEY_BRONXYS}`)
 
// ⏱️ Verifica se a música não é muito longa (mais de 1 hora)
if(data[0]?.tempo?.length >= 7) return reply("⏰ Desculpe, este vídeo é muito grande (mais de 1 hora). Por favor, escolha uma música mais curta.")
 
var N_E = " ❌ Não encontrado."
 
// 📝 Monta mensagem informativa
var bla = `
📄 ๖ۣ• Titulo: ${data[0]?.titulo||N_E}
⏱️ ๖ۣ• Tempo: ${data[0]?.tempo||N_E}
📅 ๖ۣ• Postado: ${data[0]?.postado||N_E}
📝 ๖ۣ• Descrição: ${data[0]?.desc||N_E}

■■■■■ 100%

📄 Enviando como documento...

🎥 Se deseja baixar o VÍDEO, use: ${prefix}playmp4 ${q.trim()}

🎵 Se deseja baixar o ÁUDIO, use: ${prefix}play ${q.trim()}
`
 
// 🖼️ Envia a thumbnail da música
conn.sendMessage(from, {image: {url: data[0]?.thumb || logoslink.logo}, caption: bla}, {quoted: info})
 
// 📄 Envia o arquivo como documento
conn.sendMessage(from, {document: {url: `https://api.bronxyshost.com.br/api-bronxys/play?nome_url=${q}&apikey=${API_KEY_BRONXYS}`}, mimetype: "audio/mpeg", fileName: data[0]?.titulo || "play.mp3"}, {quoted: info}).catch(e => {
return reply("❌ Erro ao baixar documento. Tente novamente...")
})
} catch (e) {
console.log(e)
return reply("🔍 Seja mais específico ou tente outro nome. / Erro na busca");
}
break

// =============================================================================
// 🎬 CATEGORIA: VÍDEOS E REDES SOCIAIS
// =============================================================================
// Comandos para baixar vídeos de várias redes sociais e plataformas

// 🎵 COMANDO: Baixar vídeo do TikTok
// ====================================
// O que faz? Baixa vídeos do TikTok em formato de vídeo
// Como usar? Digite: !tiktok_video link do TikTok
// Exemplo: !tiktok_video https://www.tiktok.com/@usuario/video/1234567890
case 'tiktok_video':
try {
if(!q.includes("tiktok")) return reply(`🎬 Exemplo: ${prefix+command} link do TikTok\n\n📝 Cole o link completo do vídeo do TikTok.`)
reply("🎬 Realizando ação..");
conn.sendMessage(from, {video: {url:`https://api.bronxyshost.com.br/api-bronxys/tiktok?url=${q}&apikey=${API_KEY_BRONXYS}`}, mimetype: "video/mp4"}, {quoted: info}).catch(e => {
console.log(e)
return reply("❌ Erro ao baixar vídeo do TikTok..")
})
} catch (e) {
console.log(e)
return reply("❌ Erro ao processar vídeo do TikTok...");
}
break;

// 🎵 COMANDO: Baixar áudio do TikTok
// ====================================
// O que faz? Extrai apenas o áudio de vídeos do TikTok
// Como usar? Digite: !tiktok_audio link do TikTok
// Exemplo: !tiktok_audio https://www.tiktok.com/@usuario/video/1234567890
case 'tiktok_audio':
try {
if(!q.includes("tiktok")) return reply(`🎵 Exemplo: ${prefix+command} link do TikTok\n\n📝 Cole o link completo do vídeo do TikTok para extrair o áudio.`)
reply("🎵 Realizando ação..");
conn.sendMessage(from, {audio: {url:`https://api.bronxyshost.com.br/api-bronxys/tiktok?url=${q}&apikey=${API_KEY_BRONXYS}`}, mimetype: "audio/mpeg"}, {quoted: info}).catch(e => {
console.log(e)
return reply("❌ Erro ao extrair áudio do TikTok..")
})
} catch (e) {
console.log(e)
return reply("❌ Erro ao processar áudio do TikTok...");
}
break;

// 📘 COMANDO: Baixar vídeo do Facebook
// =====================================
// O que faz? Baixa vídeos do Facebook em formato de vídeo
// Como usar? Digite: !face_video link do Facebook
// Exemplo: !face_video https://www.facebook.com/watch?v=1234567890
case 'face_video':
try {
if(!q.includes("facebook") && !q.includes("fb.watch")) return reply(`📘 Exemplo: ${prefix+command} link do Facebook\n\n📝 Cole o link do vídeo do Facebook (pode ser facebook.com ou fb.watch).`)
reply("📘 Realizando ação..")
conn.sendMessage(from, {video: {url: `https://api.bronxyshost.com.br/api-bronxys/${command}?url=${q}&apikey=${API_KEY_BRONXYS}`}, mimetype: "video/mp4"}).catch(e => {
return reply("❌ Erro ao baixar vídeo do Facebook..")
})
} catch (e) {
return reply("❌ Erro ao processar vídeo do Facebook...")
}
break;

// 🎵 COMANDO: Baixar áudio do Facebook
// =====================================
// O que faz? Extrai apenas o áudio de vídeos do Facebook
// Como usar? Digite: !face_audio link do Facebook
// Exemplo: !face_audio https://www.facebook.com/watch?v=1234567890
case 'face_audio':
try {
if(!q.includes("facebook") && !q.includes("fb.watch")) return reply(`🎵 Exemplo: ${prefix+command} link do Facebook\n\n📝 Cole o link do vídeo do Facebook para extrair apenas o áudio.`)
reply("🎵 Realizando ação..")
conn.sendMessage(from, {audio: {url: `https://api.bronxyshost.com.br/api-bronxys/${command}?url=${q}&apikey=${API_KEY_BRONXYS}`}, mimetype: "audio/mpeg"}).catch(e => {
return reply("❌ Erro ao extrair áudio do Facebook..")
})
} catch (e) {
return reply("❌ Erro ao processar áudio do Facebook...")
}
break;

// 🐦 COMANDO: Baixar vídeo do Twitter
// ====================================
// O que faz? Baixa vídeos do Twitter/X em formato de vídeo
// Como usar? Digite: !twitter_video link do Twitter
// Exemplo: !twitter_video https://twitter.com/usuario/status/1234567890
case 'twitter_video':
try {
if(!q.includes("twitter")) return reply(`🐦 Exemplo: ${prefix+command} link do Twitter\n\n📝 Cole o link completo do vídeo do Twitter/X.`)
reply("🐦 Realizando ação..")
conn.sendMessage(from, {video: {url: `https://api.bronxyshost.com.br/api-bronxys/${command}?url=${q}&apikey=${API_KEY_BRONXYS}`}, mimetype: "video/mp4"}).catch(e => {
return reply("❌ Erro ao baixar vídeo do Twitter..")
})
} catch (e) {
return reply("❌ Erro ao processar vídeo do Twitter...")
}
break;

// 🎵 COMANDO: Baixar áudio do Twitter
// ====================================
// O que faz? Extrai apenas o áudio de vídeos do Twitter/X
// Como usar? Digite: !twitter_audio link do Twitter
// Exemplo: !twitter_audio https://twitter.com/usuario/status/1234567890
case 'twitter_audio':
try {
if(!q.includes("twitter")) return reply(`🎵 Exemplo: ${prefix+command} link do Twitter\n\n📝 Cole o link completo do vídeo do Twitter/X para extrair apenas o áudio.`)
reply("🎵 Realizando ação..")
conn.sendMessage(from, {audio: {url: `https://api.bronxyshost.com.br/api-bronxys/${command}?url=${q}&apikey=${API_KEY_BRONXYS}`}, mimetype: "audio/mpeg"}).catch(e => {
return reply("❌ Erro ao extrair áudio do Twitter..")
})
} catch (e) {
return reply("❌ Erro ao processar áudio do Twitter...")
}
break;

// 📷 COMANDO: Baixar conteúdo do Instagram
// =======================================
// O que faz? Baixa fotos, vídeos ou reels do Instagram
// Como usar? Digite: !instagram link do Instagram
// Exemplo: !instagram https://www.instagram.com/p/ABC123/
// ⚠️ Funciona com: fotos, vídeos, reels e stories
case 'instagram':
try {
if(q.length < 5) return reply(`📷 Exemplo: ${prefix+command} link do Instagram\n\n📝 Cole o link completo do post/reel/foto do Instagram.`)
 
// 📡 Busca informações do conteúdo na API
ABC = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/instagram?url=${q.trim()}&apikey=${API_KEY_BRONXYS}`)
reply("📷 Realizando ação..")
 
// 🔍 Verifica o tipo de conteúdo e define o formato correto
let DM_T = ABC.msg[0].type
var A_T = DM_T === "mp4" ? "video/mp4" : DM_T === "webp" ? "image/webp" : DM_T === "jpg" ? "image/jpeg" : DM_T === "mp3" ? "audio/mpeg" : "video/mp4"
 
// 📤 Envia o conteúdo no formato correto
conn.sendMessage(from, {[A_T.split("/")[0]]: {url: ABC.msg[0].url}, mimetype: A_T}, {quoted: info}).catch(e => {
return reply("❌ Erro ao baixar do Instagram..")
})
} catch (e) {
return reply("❌ Erro ao processar conteúdo do Instagram...")
}
break;

// 🎵 COMANDO: Extrair áudio do Instagram
// ======================================
// O que faz? Extrai apenas o áudio de vídeos/reels do Instagram
// Como usar? Digite: !insta_audio link do Instagram
// Exemplo: !insta_audio https://www.instagram.com/reel/ABC123/
case 'insta_audio':
try {
if(!q.trim()) return reply(`🎵 Exemplo: ${prefix+command} link do Instagram\n\n📝 Cole o link do vídeo/reel do Instagram para extrair apenas o áudio.`)
 
// 📡 Busca informações do conteúdo na API
ABC = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/instagram?url=${q.trim()}&apikey=${API_KEY_BRONXYS}`)
reply("🎵 AGUARDE, REALIZANDO AÇÃO.")
 
// 🔍 Verifica o tipo de conteúdo e define como áudio
let DM_T = ABC.msg[0].type
var A_T = DM_T === "webp" ? "image/webp" : DM_T === "jpg" ? "image/jpeg" : DM_T === "mp3" ? "audio/mpeg" : "audio/mpeg"
 
// 🎵 Envia o conteúdo como áudio
conn.sendMessage(from, {[A_T.split("/")[0]]: {url: ABC.msg[0].url}, mimetype: A_T}, {quoted: info}).catch(e => {
return reply("❌ Erro ao extrair áudio do Instagram..")
})
} catch (e) {
return reply("❌ Erro ao processar áudio do Instagram...")
}
break;

case 'mediafire':
try {
if(!q.includes("mediafire.com")) return reply("Faltando o link do mediafire para download do arquivo, cade?");
ABC = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/mediafire?url=${q}&apikey=${API_KEY_BRONXYS}`)
reply(`Enviando: ${ABC.resultado[0].nama}\n\nPeso: ${ABC.resultado[0].size}`)
conn.sendMessage(from, {document: {url: ABC.resultado[0].link}, mimetype: "application/"+ABC.resultado[0].mime, fileName: ABC.resultado[0].nama}).catch(e => {
return reply("Erro..");
})
} catch (e) {
console.log(String(e))
return reply("Erro..")
}
break;

case 'signo':
try {
if(!q.trim()) return reply(`Digite seu signo, exemplo: ${prefix+command} virgem`);
ABC = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/horoscopo?signo=${q}&apikey=${API_KEY_BRONXYS}`)
conn.sendMessage(from, {image: {url: ABC.img}, caption: `Signo: ${q}\n\n${ABC.title}\n${ABC.body}`}).catch(e => {
return reply("Erro..");
})
} catch (e) {
return reply("Erro..");
}
break;

// 💰 COMANDO: Cotações de Moedas
// ================================
// O que faz? Mostra o valor atual das principais moedas e criptomoedas
// Como usar? Digite: !moedas ou !moeda
case 'moedas': case 'moeda':
try {
// 📡 Busca cotações atualizadas
ABC = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/Moedas_Agora?apikey=${API_KEY_BRONXYS}`)
 
// 💰 Mostra todas as cotações formatadas
reply(`💰 COTAÇÕES ATUALIZADAS:\n\n${ABC?.dolar}\n\n${ABC?.euro}\n\n${ABC?.libra}\n\n${ABC?.bitcoin}\n\n${ABC?.ethereum}\n\n${ABC?.bovespa}\n\n${ABC?.ouro}`);
} catch {
return reply("❌ Erro ao buscar cotações. Tente novamente em alguns minutos.")
}
break;

case "letra": case "liryc": case "letram": case "letramusic": case "letramusica": {
if(!q.trim()) return reply(`Exemplo: ${prefix+command} Ela me traiu`)
try {
reply("Aguarde...")
const abc = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/letra_musica?letra=${q.trim()}&apikey=${API_KEY_BRONXYS}`)
reply(` - Titulo: ${abc.titulo}\n\n - Compositor: ${abc.compositor}\n\n - Letra: ${abc.letra}`)
} catch (e) {
reply("Erro...")
}
}
break;

case 'pergunta': case 'openai': case 'gpt': case 'chatgpt':
try {
reply("Aguarde, criando / pesquisando sobre o que esta perguntando ou pedindo.");
ABC = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/PERGUNTE_E_EU_RESPONDO?q=${q.trim()}&apikey=${API_KEY_BRONXYS}`)
reply(`( ${ABC.msg} )`)
} catch { 
reply("Erro..")
}
break;

// 📰 COMANDO: Notícias de Esportes
// ================================
// O que faz? Busca as últimas notícias do mundo dos esportes
// Como usar? Digite qualquer um dos comandos abaixo:
// • !esportenoticias | • !espnoticia | • !noticiaesporte | • !esporte_noticias
case 'esportenoticias': case 'esportenoticia': case 'espnoticia': case 'espnoticias':
case 'noticiasesporte': case 'noticiaesporte': case 'noticiaesp': case 'noticiasesp':
case 'esporte_noticias': case 'esporte_noticia': case 'esporte-noticias': case 'esporte-noticia':
reply("📰 Buscando notícias de esportes..")
try {
// 📡 Busca notícias na API
ABC = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/esporte_noticias?apikey=${API_KEY_BRONXYS}`)
 
// 📝 Monta a lista de notícias
AB =""
for ( i = 1; i < ABC.length; i++) {
AB += `📰 ${ABC[i].titulo}\n\n`
}
 
// 🖼️ Envia imagem junto com as notícias
conn.sendMessage(from, {image: {url: ABC[0].img}, caption: AB}, {quoted: info})
} catch {
return reply("❌ Erro ao buscar notícias. Tente novamente mais tarde.")
}
break;

case "playstore":
if(q.length < 2) return reply("Cade o título do apk que deseja pesquisar?")
data = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/playstore?nome=${q}&apikey=${API_KEY_BRONXYS}`)
ABC = "Play Store pesquisa:\n\n"
for(let a of data.resultados) {
ABC += `\n\n${a.title}\n\n----------------------------------------------\nID:
${a.appId}\n\n----------------------------------------------\n\nURL:
${a.url}\n\n----------------------------------------------`
}
reply(ABC)
break;

case 'celular':
try {
if(!q.trim()) return reply(`Exemplo: ${prefix+command} galaxy a9 2018`);
reply("Realizando ação..");
ABC = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/info_celular?celular=${q}&apikey=${API_KEY_BRONXYS}`);
reply(`📱 Celular: ${ABC.celular || "Não encontrado"}\n\nInformações:\n${ABC.resumo || ABC.infoc || "Não encontrado, seja mais específico, a marca e a versão"}`);
} catch (e) {
return reply("Erro...");
}
break;

case 'amazon': case 'amazonsearch':
if(q.trim().length < 4) return reply(`Exemplo: ${prefix+command} fone redmi airdots 2`)
try {
reply("Aguarde..")
ABC = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/Amazon_Pesquisa?pesquisa=${q.trim()}&apikey=${API_KEY_BRONXYS}`)
RST = "Pesquisa Amazon:\n\n"
for ( i  = 0; i < (ABC.length > 40 ? 40: ABC.length); i++) {
RST +=  `( ${i+1} ) - Titulo: ${ABC[i].titulo}\n- Preço: ${ABC[i].preco}\n- Url: ${ABC[i].url}\n${"_".repeat(27)}\n\n`
}
reply(RST);
} catch {
return reply(`Erro, não foi possivel encontrar.`)
}
break;

case 'pesquisa_yt': case 'ytsearch':
try {
if(!q.trim()) return reply(`Digite o nome de algum vídeo ou música que deseja encontrar..`);
AB = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/pesquisa_ytb?nome=${q}&apikey=${API_KEY_BRONXYS}`)
ABC = `${"-\t".repeat(13)}\n\n`
for (var i of AB) {
ABC += `Titulo: ${i.titulo}\nUrl: ${i.url}\nTempo: ${i.tempo}\nPostado: ${i.postado}\n\nDescrição: ${i.desc}\n\n`;
ABC += `${"-\t".repeat(13)}\n\n`
}
reply(ABC);
} catch (e) {
return reply(`Erro....`)
}
break;

case 'print': case 'printdesite':
if(!q.trim()) return reply(`Faltando a url do site que quer tirar print, Exemplo: ${prefix+command} https://google.com\n\nNão esqueça do https se o site tiver, ou http se não for um site com ssl`)
try {
conn.sendMessage(from, {image: {url: `https://api.bronxyshost.com.br/api-bronxys/print_de_site?url=${q.trim()}&apikey=${API_KEY_BRONXYS}`}}, {quoted: info}) 
} catch {
return reply("Erro..");
}
break;

case 'gimage':
try {
if(!q.trim()) return reply(`Exemplo: ${prefix+command} naruto`)
ABC = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/google-img?nome=${q}&apikey=${API_KEY_BRONXYS}`);
conn.sendMessage(from, {image: {url: ABC[Math.floor(Math.random() * ABC.length)].url}}).catch(() => {
return reply("Erro..");
})
} catch (e) {
return reply("Erro..");
}
break;

case 'pinterest':
try {
if(!q.trim()) return reply(`Exemplo: ${prefix+command} naruto`)
ABC = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/pinterest?nome=${q}&apikey=${API_KEY_BRONXYS}`);
conn.sendMessage(from, {image: {url: ABC[Math.floor(Math.random() * ABC.length)]}}).catch(() => {
return reply("Erro..");
})
} catch (e) {
return reply("Erro..");
}
break;

case 'cep':
try {
if(!q.trim()) return reply("digite o CEP que deseja buscar informações..");
ABC = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/consultacep?cep=51240230&apikey=${API_KEY_BRONXYS}`)
reply(`Cep: ${ABC.cep}\nRua: ${ABC.rua}\nComplemento: ${ABC.complemento}\nBairro: ${ABC.vizinhança}\nCidade: ${ABC.cidade}\nEstado: ${ABC.estado}\nGia: ${ABC.gia}\nIbge: ${ABC.ibge}\nddd: ${ABC.ddd}\nSiafi: ${ABC.siafi}`)
} catch (e) {
return reply("Erro..")
}
break

case 'metadinha':
try {
ABC = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/metadinha?apikey=${API_KEY_BRONXYS}`);
conn.sendMessage(from, {image: {url: ABC.link1}}).catch(e => {
return reply("Erro..")
})
conn.sendMessage(from, {image: {url: ABC.link2}}).catch(e => {
return reply("Erro..")
})
} catch (e) {
return reply("Erro..")
}
break;

//COMANDOS BÁSICOS DE LOGOS
case 'angelwing':  case 'hackneon': case 'fpsmascote': 
case 'equipemascote': case 'txtquadrinhos': case 'ffavatar':
case 'mascotegame': case 'angelglx': case 'gizquadro': 
case 'wingeffect': case 'blackpink': case 'metalgold':
case 'girlmascote': case 'logogame':
try {
if(!q.trim()) return reply(`Digite algo, Exemplo: ${prefix+command} bronxys`);  
reply("Realizando ação..");
ABC = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/logos_EPH?texto=${q}&category=${command}&apikey=${API_KEY_BRONXYS}`);
conn.sendMessage(from, {image: {url: ABC.resultado}}, {quoted: info}).catch(() => {
return reply("Erro..")
})
} catch (e) {
return reply("Erro...");
}
break;

case 'shadow': case 'metalgold': case 'cup': case 'txtborboleta':
case 'cemiterio': case 'efeitoneon': case 'harryp':
case 'lobometal': case 'neon2': case 'madeira': case 'lovemsg3':
case 'coffecup': case 'coffecup2': case 'florwooden':
case 'narutologo': case 'fire': case 'romantic': case 'smoke':  
case 'papel': case 'lovemsg': case 'lovemsg2':
try {
if(!q.trim()) return reply(`Digite algo, Exemplo: ${prefix+command} bronxys`);  
reply("Realizando ação..");
ABC = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/logos_PHT?texto=${q}&category=${command}&apikey=${API_KEY_BRONXYS}`);
conn.sendMessage(from, {image: {url: ABC.resultado.imageUrl}}, {quoted: info}).catch(() => {
return reply("Erro..")
})
} catch (e) {
return reply("Erro...");
}
break;

case 'fiction': case '3dstone': case 'areia': case 'style': 
case 'blood': case 'pink': case 'cattxt': case 'neondevil':
case 'carbon': case 'metalfire': case 'thunder': case 'vidro': 
case 'jokerlogo': case 'transformer': case 'demonfire':
case 'jeans': case 'metalblue': case 'natal': case 'ossos':
case 'asfalto': case 'break': case 'glitch2': case 'colaq':
case 'neon3': case 'nuvem': case 'horror': case 'matrix':
case 'berry': case 'luxury': case 'lava': case 'thunderv2':
case 'neongreen': case 'neve': case 'neon': case 'neon1':  
case 'neon3d': case 'gelo': case 'neon3': case '3dgold':
case 'lapis': case 'toxic': case 'demongreen': case 'rainbow':
case 'halloween':
try {
if(!q.trim()) return reply(`Digite algo, Exemplo: ${prefix+command} bronxys`);  
reply("Realizando ação..");
ABC = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/logos?texto=${q}&category=${command}&apikey=${API_KEY_BRONXYS}`);
bufferImg(ABC.resultado);
} catch (e) {
return reply("Erro...");
}
break;

case 'marvel': case 'pornhub': case 'space': case 'stone': case 'steel': case 'grafity': case 'glitch3': case 'america':
try {
var [DG, DG2] = q.split("|")
if(!q.includes("|")) return reply(`Exemplo: ${prefix+command} Bronxys|Aleatory`)
reply("Realizando ação..");
ABC = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/logos_2?texto=${DG}&texto2=${DG2}&category=${command}&apikey=${API_KEY_BRONXYS}`);
bufferImg(ABC.resultado);
} catch (e) {
return reply("Erro...");
}
break;

// COMANDOS BÁSICOS // PARA MEMBRO COMUM
case 'gerarnick':
try {
if(!q.trim()) return reply(`Escreveva um nome para eu enviar ele com letras modificadas, Exemplo: ${prefix+command} bronxys`);
ABC = await fetchJson(`https://api.bronxyshost.com.br/api-bronxys/gerar_nick?nick=${encodeURI(q)}&apikey=${API_KEY_BRONXYS}`)
AB = `Lista com base no Nick informado, para encontrar melhor fonte para utilizar:\n\n`;
for ( i of ABC) {
AB += `${i}\n\n`;
}
reply(AB);
} catch (e) {
return reply("Erro..");
}
break;

case 'attp': case 'attp2':
try {
if(!q.trim()) return reply(`Exemplo: ${prefix+command} bronxys`);
reply("AGUARDE, REALIZANDO AÇÃO.")
var Fontes = command === "attp2" ? "Roboto" : "Noto Emoji, Noto Sans Mono"
conn.sendMessage(from, {sticker: {url: `https://api.bronxyshost.com.br/api-bronxys/attp_edit?texto=${encodeURIComponent(q)}&fonte=${Fontes}&apikey=${API_KEY_BRONXYS}`}}, {quoted: info}).catch(() => {
return reply("Erro..");
})
} catch (e) {
return reply("Erro..");
}
break;

// 🎨 CATEGORIA: TEXT-TO-IMAGE CUSTOM (WHITE & BRAT)
case 'ttp_white': case 'ttp_brat':
try {
if(!q.trim()) return reply(`🎨 Exemplo: ${prefix+command} seu texto aqui`);
reply("🎨 Realizando ação, aguarde..");
const url = `https://api.bronxyshost.com.br/api-bronxys/${command}?texto=${encodeURIComponent(q)}&fonte=Arial&apikey=${API_KEY_BRONXYS}`;
conn.sendMessage(from, {sticker: {url: url}}, {quoted: info}).catch(() => reply("❌ Erro ao gerar figurinha."));
} catch (e) {
return reply("❌ Erro no comando..");
}
break;

case 'attp_white': case 'attp_brat':
case 'attp_white_video': case 'attp_brat_video':
try {
if(!q.trim()) return reply(`🎬 Exemplo: ${prefix+command} seu texto aqui`);
reply("🎬 Realizando ação, aguarde..");
const isVideo = String(command).includes('_video');
const baseEndpoint = String(command).replace('_video', '');
const typeParam = isVideo ? '&type=video' : '';
const url = `https://api.bronxyshost.com.br/api-bronxys/${baseEndpoint}?texto=${encodeURIComponent(q)}&fonte=Arial${typeParam}&apikey=${API_KEY_BRONXYS}`;

if (isVideo) {
    conn.sendMessage(from, {video: {url: url}, mimetype: "video/mp4"}, {quoted: info}).catch(() => reply("❌ Erro ao gerar vídeo."));
} else {
    conn.sendMessage(from, {sticker: {url: url}}, {quoted: info}).catch(() => reply("❌ Erro ao gerar sticker."));
}
} catch (e) {
return reply("❌ Erro no comando..");
}
break;

// MONTAGEM
case 'lixo': case 'lgbt': case 'morto': case 'preso': case 'deletem':
case 'procurado': case 'hitler': case 'borrar': case 'merda':
try {
IMG = JSON.parse(JSON.stringify(info)?.replace('quotedM','m'))?.message?.extendedTextMessage?.contextInfo?.message?.imageMessage || info.message?.imageMessage
PXR = await getFileBuffer(IMG, "image")
reply("Realizando ação..")
link = await upload(PXR)
conn.sendMessage(from, {image: {url:`https://api.bronxyshost.com.br/api-bronxys/montagem?url=${link}&category=${command}&apikey=${API_KEY_BRONXYS}`}}, {quoted: info}).catch(e => {
return reply("Erro..")
})
} catch (e) {
return reply('Marque uma imagem no WhatsApp, formato jpeg/jpg');
}
break
break