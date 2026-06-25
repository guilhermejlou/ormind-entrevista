export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nome, empresa, cargo, email, lang, responses } = req.body;

  if (!nome || !empresa || !cargo) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const lines = [];
  lines.push('Respondente: ' + nome);
  lines.push('Empresa: ' + empresa);
  lines.push('Cargo: ' + cargo);
  if (email) lines.push('E-mail: ' + email);
  lines.push('Idioma: ' + (lang || 'PT').toUpperCase());
  lines.push('');

  if (responses) {
    responses.forEach(function(r) {
      lines.push(r.sec + ' | ' + r.id + ': ' + r.resposta);
      if (r.comment) lines.push('  Obs: ' + r.comment);
    });
  }

  const bodyText = lines.join('\r\n');

  const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.EMAIL_TO || 'guilherme@ormind.com.br',
    subject: '[Ormind] Respostas - ' + nome + ' - ' + empresa,
    text: bodyText,
  };

  if (email) {
    mailOptions.bcc = email;
  }

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
