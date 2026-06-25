const ExcelJS = require('exceljs');
const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nome, empresa, cargo, email, lang, responses } = req.body;

  if (!nome || !empresa || !cargo) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Ormind';
  workbook.created = new Date();

  const sheet = workbook.addWorksheet('Respostas');

  sheet.columns = [
    { header: 'Seção', key: 'sec', width: 20 },
    { header: 'ID', key: 'id', width: 8 },
    { header: 'Pergunta', key: 'pergunta', width: 50 },
    { header: 'Resposta', key: 'resposta', width: 40 },
    { header: 'Observação', key: 'comment', width: 40 },
  ];

  sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 11 };
  sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF123D70' } };
  sheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

  if (responses) {
    responses.forEach(function(r) {
      sheet.addRow({
        sec: r.sec || '',
        id: r.id || '',
        pergunta: r.pergunta || '',
        resposta: r.resposta || '',
        comment: r.comment || '',
      });
    });
  }

  const buf = await workbook.xlsx.writeBuffer();

  const respTable = (responses || []).map(function(r) {
    return '<tr>'
      + '<td style="padding:6px 10px;border:1px solid #D3D1C7;font-size:12px;color:#5F5E5A">' + escHtml(r.sec || '') + '</td>'
      + '<td style="padding:6px 10px;border:1px solid #D3D1C7;font-size:12px;color:#5F5E5A;font-weight:600">' + escHtml(r.id || '') + '</td>'
      + '<td style="padding:6px 10px;border:1px solid #D3D1C7;font-size:12px;color:#2C2C2A">' + escHtml(r.pergunta || '') + '</td>'
      + '<td style="padding:6px 10px;border:1px solid #D3D1C7;font-size:12px;color:#2C2C2A">' + escHtml(r.resposta || '') + '</td>'
      + (r.comment ? '<td style="padding:6px 10px;border:1px solid #D3D1C7;font-size:12px;color:#888780;font-style:italic">' + escHtml(r.comment) + '</td>' : '<td style="padding:6px 10px;border:1px solid #D3D1C7;font-size:12px;color:#D3D1C7">—</td>')
      + '</tr>';
  }).join('');

  const html = '<!DOCTYPE html>'
    + '<html><head><meta charset="UTF-8"></head>'
    + '<body style="margin:0;padding:0;background-color:#F8F7F4;font-family:Questrial,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif">'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F8F7F4;padding:40px 20px">'
    + '<tr><td align="center">'
    + '<table width="600" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;border-radius:10px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.07)">'
    + '<tr><td style="background:linear-gradient(135deg,#E8EDF5,#E1F5EE);padding:32px 40px;text-align:center;border-bottom:2px solid #123D70">'
    + '<div style="font-family:Questrial,sans-serif;font-size:28px;font-weight:400;color:#123D70;text-transform:uppercase;letter-spacing:3px;margin-bottom:8px">ORMIND</div>'
    + '<div style="font-size:13px;color:#5F5E5A">Pesquisa de Descoberta — Gestão Financeira</div>'
    + '</td></tr>'
    + '<tr><td style="padding:32px 40px">'
    + '<p style="font-size:16px;color:#2C2C2A;line-height:1.6;margin:0 0 20px">Olá <strong style="color:#123D70">' + escHtml(nome) + '</strong>,</p>'
    + '<p style="font-size:14px;color:#5F5E5A;line-height:1.6;margin:0 0 20px">Muito obrigado por participar da nossa pesquisa! Suas respostas foram registradas e já estão nos ajudando a mapear os desafios reais de gestão financeira em startups.</p>'
    + '<p style="font-size:14px;color:#5F5E5A;line-height:1.6;margin:0 0 24px">A <strong style="color:#123D70">Ormind</strong> está incubada no <strong style="color:#123D70">Inova USP</strong> a partir do programa <strong style="color:#123D70">Samsung Ocean</strong>. Cada resposta contribui diretamente com a inovação em soluções de governança financeira — e a sua faz toda a diferença.</p>'
    + '<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E2E0D6;border-radius:6px;overflow:hidden;margin-bottom:24px">'
    + '<thead><tr>'
    + '<th style="padding:8px 10px;background-color:#123D70;color:#FFFFFF;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;text-align:left;border-right:1px solid #1a4a8a">Seção</th>'
    + '<th style="padding:8px 10px;background-color:#123D70;color:#FFFFFF;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;text-align:left;border-right:1px solid #1a4a8a">ID</th>'
    + '<th style="padding:8px 10px;background-color:#123D70;color:#FFFFFF;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;text-align:left;border-right:1px solid #1a4a8a">Pergunta</th>'
    + '<th style="padding:8px 10px;background-color:#123D70;color:#FFFFFF;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;text-align:left">Resposta</th>'
    + '</tr></thead>'
    + '<tbody>' + respTable + '</tbody>'
    + '</table>'
    + '<p style="font-size:13px;color:#888780;line-height:1.5;margin:0 0 6px"><strong style="color:#2C2C2A">Respondente:</strong> ' + escHtml(nome) + ' · ' + escHtml(empresa) + ' · ' + escHtml(cargo) + (email ? ' · ' + escHtml(email) : '') + '</p>'
    + '</td></tr>'
    + '<tr><td style="background-color:#F8F7F4;padding:24px 40px;text-align:center;border-top:1px solid #E2E0D6">'
    + '<div style="font-family:Questrial,sans-serif;font-size:14px;font-weight:400;color:#123D70;text-transform:uppercase;letter-spacing:2px;margin-bottom:12px">ORMIND</div>'
    + '<p style="font-size:12px;color:#888780;line-height:1.6;margin:0 0 8px">'
    + '<a href="https://ormind.com.br" style="color:#123D70;text-decoration:none">ormind.com.br</a>'
    + ' · <a href="mailto:guilherme@ormind.com.br" style="color:#123D70;text-decoration:none">guilherme@ormind.com.br</a>'
    + ' · <a href="https://wa.me/5512981900916" style="color:#123D70;text-decoration:none">+55 12 98190-0916</a>'
    + '</p>'
    + '<p style="font-size:10px;color:#B0AFA8;line-height:1.4;margin:0">Incubado no Inova USP · Programa Samsung Ocean</p>'
    + '</td></tr>'
    + '</table>'
    + '</td></tr>'
    + '</table>'
    + '</body></html>';

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
    from: '"Ormind" <' + (process.env.SMTP_FROM || process.env.SMTP_USER) + '>',
    to: process.env.EMAIL_TO || 'guilherme@ormind.com.br',
    subject: '[Ormind] Respostas - ' + nome + ' - ' + empresa,
    html: html,
    attachments: [{
      filename: 'respostas-' + nome.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase() + '-' + Date.now() + '.xlsx',
      content: Buffer.from(buf),
      contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }],
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

function escHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
