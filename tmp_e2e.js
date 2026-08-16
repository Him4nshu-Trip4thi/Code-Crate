(async ()=>{
  const base = 'http://127.0.0.1:3000';
  const username = 'e2e_' + Date.now();
  const email = `e2e_${Date.now()}@example.com`;
  const password = 'Password123';
  try {
    console.log('Signing up', email);
    let res = await fetch(base + '/signup', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ username, email, password }) });
    console.log('Signup status', res.status);
    console.log(await res.text());

    console.log('Logging in');
    res = await fetch(base + '/login', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) });
    console.log('Login status', res.status);
    const body = await res.text();
    console.log(body);

    process.exit(0);
  } catch (e) {
    console.error('E2E failed', e);
    process.exit(1);
  }
})();
