/* THE TURBAN HOUSE - Database Sync Bridge */
(function(){
  const KEYS = {
    TH_PRODUCTS:'/api/sync/products',
    TH_ORDERS:'/api/sync/orders',
    TH_CUSTOMERS:'/api/sync/customers',
    TH_COUPONS:'/api/sync/coupons',
    TH_REVIEWS:'/api/sync/reviews'
  };
  const originalSet = localStorage.setItem.bind(localStorage);
  let hydrating = true;
  const setLocal = (k,v)=>originalSet(k,v);
  async function hydrate(){
    for(const [key,url] of Object.entries(KEYS)){
      try{
        const r=await fetch(url,{cache:'no-store'});
        if(!r.ok) continue;
        const d=await r.json();
        if(Array.isArray(d.data)) setLocal(key,JSON.stringify(d.data));
      }catch(e){ console.warn('DB sync read failed:',key,e.message); }
    }
    hydrating=false;
  }
  localStorage.setItem = function(key,value){
    originalSet(key,value);
    if(!hydrating && KEYS[key]){
      try{
        const data=JSON.parse(value);
        fetch(KEYS[key],{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({data})})
          .then(r=>{if(!r.ok) console.warn('DB sync write failed:',key,r.status);})
          .catch(e=>console.warn('DB sync write failed:',key,e.message));
      }catch(e){ console.warn('DB sync data invalid:',key); }
    }
  };
  window.TH_DB_SYNC = { hydrate };
  hydrate();
})();
