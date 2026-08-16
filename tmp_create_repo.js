(async ()=>{
  try{
    const base='http://127.0.0.1:3000';
    console.log('Fetching users...');
    let res = await fetch(base + '/allUsers');
    const users = await res.json();
    if (!Array.isArray(users) || users.length===0){
      console.log('No users found; create a user first');
      return;
    }
    const owner = users[0]._id || users[0].id;
    console.log('Using owner:', owner);
    res = await fetch(base + '/repo/create', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ owner, name: 'demo-repo-' + Date.now(), description: 'Demo repo created by script', visibility: true }) });
    console.log('Create status', res.status);
    console.log(await res.text());
  }catch(e){console.error('Failed', e)}
})();
