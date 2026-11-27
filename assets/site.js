(function(){
  var demos=[{u:"example-restaurant.co.uk",n:"Example restaurant",h:"Fresh food, ordered in two taps.",p:"A sample ordering layout. Not a Mortify client.",b:"Order now",a:"#c8442b",c:"#fff1e6",d:"#f0a35e"},{u:"example-homes.co.uk",n:"Example estate agent",h:"Find the right home faster.",p:"A sample listings layout. Not a Mortify client.",b:"Search homes",a:"#0f6b5c",c:"#e6f5f1",d:"#7fd1b8"},{u:"example-clinic.co.uk",n:"Example clinic",h:"Book care without the phone tag.",p:"A sample enquiry layout. Not a Mortify client.",b:"Book a visit",a:"#2d4fd6",c:"#e8eefc",d:"#8fb0ff"}];
  var tabs=document.getElementById("tabs");
  if(tabs){
    var names=["Restaurant","Property","Clinic"],k=0,timer;
    tabs.innerHTML=names.map(function(n,i){return '<button type="button" data-i="'+i+'">'+n+'</button>'}).join("");
    function show(i){
      var d=demos[i],s=document.getElementById("site");
      s.style.setProperty("--s1",d.a);s.style.setProperty("--s2",d.c);s.style.setProperty("--s3",d.d);
      document.getElementById("u").textContent=d.u;
      document.getElementById("sn").textContent=d.n;
      document.getElementById("sh").textContent=d.h;
      document.getElementById("sp").textContent=d.p;
      document.getElementById("sb").textContent=d.b;
      [].forEach.call(tabs.children,function(b,j){b.setAttribute("aria-selected",j===i?"true":"false")});
    }
    tabs.onclick=function(e){if(e.target.dataset.i){clearInterval(timer);show(+e.target.dataset.i)}};
    show(0);
    if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){timer=setInterval(function(){k=(k+1)%3;show(k)},4500)}
  }
  function calc(){
    var out=document.getElementById("rout"); if(!out) return;
    var n=(+document.getElementById("r1").value||0)*(+document.getElementById("r2").value||0)*(+document.getElementById("r3").value||0)*52;
    out.textContent="£"+Math.round(n).toLocaleString("en-GB");
  }
  ["r1","r2","r3"].forEach(function(id){var el=document.getElementById(id); if(el) el.oninput=calc});
  calc();
  var flt=document.getElementById("flt");
  if(flt){
    var sectors=["All","Restaurants","Healthcare","Property","Logistics","Retail","Education"];
    flt.innerHTML=sectors.map(function(s){return '<button type="button">'+s+'</button>'}).join("");
    function ports(f){
      [].forEach.call(document.querySelectorAll("#ports article"),function(card){
        card.hidden=f!=="All"&&card.dataset.sector!==f;
      });
      [].forEach.call(flt.children,function(b){b.setAttribute("aria-pressed",b.textContent===f?"true":"false")});
    }
    flt.onclick=function(e){if(e.target.tagName==="BUTTON")ports(e.target.textContent)};
    ports("All");
  }
  [].forEach.call(document.querySelectorAll("form[data-subject]"),function(f){
    f.onsubmit=function(e){
      e.preventDefault();
      var data=new FormData(f), lines=[];
      data.forEach(function(v,k){if(v) lines.push(k+": "+v)});
      location.href="mailto:hello@mortify.co.uk?subject="+encodeURIComponent(f.dataset.subject)+"&body="+encodeURIComponent(lines.join("\n"));
    };
  });
})();
