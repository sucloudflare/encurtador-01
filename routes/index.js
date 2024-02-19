// routes/index.js

const express = require('express');
const router = express.Router();
const Link = require('../models/link');

router.get('/:code/stats', async (req, res, next) => {
  const code = req.params.code;
  const resultado = await Link.findOne({ where: { code } });

  if (!resultado) {
    return res.sendStatus(404);
  }

  resultado.hits++;
  await resultado.save();

  // Renderiza a página de estatísticas
  res.render('stats', resultado.dataValues);
});

router.get('/:code', async (req, res, next) => {
  const code = req.params.code;
  const resultado = await Link.findOne({ where: { code } });

  if (!resultado) {
    return res.sendStatus(404);
  }

  resultado.hits++;
  await resultado.save();

  res.redirect(resultado.url);
});

router.post('/new', async (req, res, next) => {
  const url = req.body.url;
  const code = generateCode();

  const resultado = await Link.create({
    url,
    code,
  });

  const shortenedUrl = `${process.env.DOMAIN}${code}`;
  res.render('stats', { ...resultado.dataValues, shortenedUrl });
});

// Rota padrão para a página inicial
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Encurtador' });
});

app.get('/contato.ejs', (req, res) => {
  res.render('contato'); // Certifique-se de que o nome do arquivo EJS esteja correto
});

module.exports = router;
