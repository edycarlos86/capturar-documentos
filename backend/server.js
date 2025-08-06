const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({ static: 'uploads' });

server.use(bodyParser.json({ limit: '25mb' }));
server.use(middlewares);

// Endpoint para receber imagens em base64 e salvar como arquivos
server.post('/upload', (req, res) => {
  const { selfie, docFrente, docVerso } = req.body;

  const saveBase64Image = (base64, filename) => {
    const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
    fs.writeFileSync(path.join(__dirname, 'uploads', filename), base64Data, 'base64');
  };

  try {
    if (selfie) saveBase64Image(selfie, 'selfie.png');
    if (docFrente) saveBase64Image(docFrente, 'doc-frente.png');
    if (docVerso) saveBase64Image(docVerso, 'doc-verso.png');
    res.json({ message: 'Imagens salvas com sucesso!' });
  } catch (e) {
    res.status(500).json({ error: 'Erro ao salvar imagens' });
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('✅ JSON Server rodando em http://localhost:3000');
});
