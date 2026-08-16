(async ()=>{
  const base = 'http://127.0.0.1:3000';
  const username = 'flow_' + Date.now();
  const email = `flow_${Date.now()}@example.com`;
  const password = 'Password123';
  try{
    console.log('Signup', email);
    let res = await fetch(base + '/signup', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ username, email, password }) });
    const body = await res.json();
    console.log('Signup', res.status, body);
    const token = body.token;

    // create repo with Authorization header
    const createRes = await fetch(base + '/repo/create', { method: 'POST', headers: {'Content-Type':'application/json','Authorization': 'Bearer '+token}, body: JSON.stringify({ owner: body.userId, name: 'flow-repo-'+Date.now(), description:'flow repo', visibility:true }) });
    console.log('Create status', createRes.status, await createRes.text());

    // fetch all repos and pick one
    let all = await fetch(base + '/repo/all');
    all = await all.json();
    const repo = all[0];
    console.log('Repo picked', repo._id);

    // update repo content using token
    const upd = await fetch(base + '/repo/update/' + repo._id, { method: 'PUT', headers: {'Content-Type':'application/json','Authorization': 'Bearer '+token}, body: JSON.stringify({ content: 'First content from flow', description: repo.description || '' }) });
    console.log('Update status', upd.status, await upd.text());

    // fetch repo by id
    const fetched = await fetch(base + '/repo/' + repo._id);
    console.log('Fetched repo', await fetched.text());

  }catch(e){console.error('Flow failed', e)}
})();
