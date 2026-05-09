import db from '../database.js';

export function getHistory(req, res) {
  db.all('SELECT * FROM analysis_history ORDER BY id DESC LIMIT 20', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to load history.' });
    res.json(rows);
  });
}

export function getStats(req, res) {
  db.all('SELECT * FROM analysis_history', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to load stats.' });
    const stats = {
      total: rows.length,
      fake: rows.filter((r) => r.prediction === 'Fake News').length,
      real: rows.filter((r) => r.prediction === 'Real News').length,
      urdu: rows.filter((r) => r.language === 'urdu').length,
      english: rows.filter((r) => r.language === 'english').length,
      imageChecks: rows.filter((r) => r.input_type === 'image').length,
      textChecks: rows.filter((r) => r.input_type === 'text').length
    };
    res.json(stats);
  });
}
