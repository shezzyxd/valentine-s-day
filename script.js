/* ===== ZAGADKI ===== */
const zagadki=[
{p:"Ile jesteśmy razem? (napisz liczbe ile lat)",o:"2"},
{p:"Kto pierwszy powiedział kocham Cię? (Napisz imię)",o:"adrian"},
{p:"Ile liter ma słowo MIŁOŚĆ?",o:"6"},
{p:"Jaka liczba to liczba miłosci?",o:"6"},
{p:"Jak mam na drugie imię?",o:"konrad"},
{p:"Od kiedy jesteśmy razem? (Napisz date)",o:"07.03.2024"}
];

const losowa=zagadki[Math.floor(Math.random()*zagadki.length)];
document.getElementById("pytanie").innerText=losowa.p;

/* ===== KUPONY ===== */
const kuponyLista=[
"Wieczór filmowy - Ty wybierasz film i oglądam go bez wymówek 🍿",
"Masaż pleców ❤️",
"Śniadanie do łóżka 😍",
"Spacer bez marudzenia 😄",
"Maraton TikToków 😂",
"Kolacja razem 🍝",
"Mini sesja zdjęciowa 📸",
"Lody lub coś słodkiego bez wymówek 🍦",
"Dzień tylko dla nas 💕",
"Niespodzianka 🎁"
];

const kuponyBox=document.getElementById("kuponyBox");
let usedKupony=JSON.parse(localStorage.getItem("usedKupony"))||[];

kuponyLista.forEach((tekst,i)=>{
  const div=document.createElement("div");
  div.className="kupon";
  div.innerText=tekst;

  if(usedKupony.includes(i)){
    div.classList.add("used");
    div.innerText+=" (UŻYTY ❤️)";
  }

  div.onclick=()=>{
    if(usedKupony.includes(i)) return;

    div.classList.add("used");
    div.innerText+=" (UŻYTY ❤️)";
    usedKupony.push(i);
    localStorage.setItem("usedKupony",JSON.stringify(usedKupony));

    explodeHearts();
  }
  // Sprawdzenie czy wszystkie kupony użyte
if(usedKupony.length === kuponyLista.length){
  setTimeout(()=>{
    alert("🎉 Wszystkie kupony użyte! Gratulacje… wygrałaś główną nagrodę: Mnie na zawsze ❤️");
  }, 500); // małe opóźnienie, żeby eksplozja serduszek była pierwsza
}

  kuponyBox.appendChild(div);
});

/* ===== SPRAWDZANIE ===== */
function sprawdz(){
  const odp=document.getElementById("odpowiedz").value.toLowerCase().trim();
  if(odp===losowa.o){
    document.getElementById("puzzleBox").style.display="none";
    document.getElementById("kuponyBox").style.display="block";
    document.getElementById("music").play();
  }else{
    document.getElementById("komunikat").innerText="Spróbuj jeszcze raz 😏";
  }
}

/* ===== TŁO SERCA ===== */
const heartsContainer=document.getElementById("hearts");

function createHeart(){
  const heart=document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML="❤️";
  heart.style.left=Math.random()*100+"vw";
  heart.style.fontSize=(15+Math.random()*25)+"px";
  heart.style.animationDuration=(4+Math.random()*4)+"s";
  heartsContainer.appendChild(heart);
  setTimeout(()=>heart.remove(),8000);
}
setInterval(createHeart,400);

/* ===== EKSPLOZJA ===== */
function explodeHearts(){
  for(let i=0;i<20;i++){
    const heart=document.createElement("div");
    heart.innerHTML="💖";
    heart.style.position="fixed";
    heart.style.left="50%";
    heart.style.top="50%";
    heart.style.fontSize="20px";
    heart.style.pointerEvents="none";
    document.body.appendChild(heart);

    const angle=Math.random()*2*Math.PI;
    const distance=100+Math.random()*100;
    const x=Math.cos(angle)*distance;
    const y=Math.sin(angle)*distance;

    heart.animate([
      {transform:"translate(-50%,-50%) scale(1)",opacity:1},
      {transform:`translate(${x}px,${y}px) scale(0.5)`,opacity:0}
    ],{
      duration:1000
    });

    setTimeout(()=>heart.remove(),1000);
  }
}