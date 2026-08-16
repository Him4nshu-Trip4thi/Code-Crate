(async () => {
  try {
    const res = await fetch('http://127.0.0.1:3000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'smoketest', email: 'smoke@example.com', password: 'Password123' })
    });
    const text = await res.text();
    console.log('Status', res.status);
    console.log('Body', text);
  } catch (e) {
    console.error('Request failed', e);
  }
})();
