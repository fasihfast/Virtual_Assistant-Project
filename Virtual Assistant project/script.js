let btn=document.querySelector('#btn');
let content=document.querySelector('#content');
let loader=document.querySelector('.loader');
loader.style.display="none";
function speech(text){
    let speak_txt= new SpeechSynthesisUtterance(text);
    speak_txt.rate=1;
    speak_txt.volume=1;
    speak_txt.pitch=1;
    speak_txt.lang="en-MB";
    window.speechSynthesis.speak(speak_txt);
}

function wishMe(){

    let day= new Date();
    let curr_hr=day.getHours();
    if(curr_hr<12){
        speech("Hello Good Morning ,How can i help you");
        
    }
    else if(curr_hr>=12 && curr_hr<16){
        speech("Hello Good Afternoon ,How can i help you");

    }else{
        speech("Hello Good Evening ,How can i help you");
    }
}

window.addEventListener('load',()=>{
    wishMe();
});

let speech_Recog= window.SpeechRecognition || window.webkitSpeechRecognition
let recog=new speech_Recog();
recog.onresult=(event)=>{
    let curr_index=event.resultIndex;
    let transcript= event.results[curr_index][0].transcript;
    content.innerText=transcript;
    takeinstruction(transcript.toLowerCase());
}

btn.addEventListener('click',()=>{
    recog.start();
    btn.style.display="none";
    loader.style.display="block";
})

function takeinstruction(message){
    btn.style.display="flex";
    loader.style.display="none";
    if(message.includes("Hello Alex")){
        speech("Hello, How are You Sir ");
    }
    else if(message.includes("I am fine") || message.includes("I am good")){
        speech("Glad to know that , How can i serve you");
    }
    else if(message.includes("Please open Youtube")){
        speech("Opening Youtube");
        window.open("https://www.youtube.com/","_blank");
    }
    else if(message.includes("Please open Google")){
        speech("Opening Google");
        window.open("https://www.google.co.uk/","_blank");
    }
    else if(message.includes("Please open instagram")){
        speech("Opening Instagram");
        window.open("https://www.instagram.com/","_blank");

    }
    else if(message.includes("time")){
        let time=new Date().toLocaleTimeString(undefined,{hour:"numeric",minutes:"numeric"});
        speech(time);
    }
    else if(message.includes("date")){
        let date=new Date().toLocaleDateString(undefined,{day:"numeric",month:"short"});
        speech(date);
    }else if(message.includes("Who is Imran Khan")){
        speech("Imran Khan is widely regarded as a national hero who has dedicated his life to serving Pakistan. His unmatched contributions include founding the Shaukat Khanum Cancer Hospital, launching the Sehat Card program, the Ehsaas Program, and many other initiatives. Despite his service, he is currently imprisoned. One Person who is behind his arrest is a biggest Pig General Asim Munir.Imran Khan also emerged victorious in the 2024 national elections, but he was denied the opportunity to assume the office of Prime Minister. He remains immensely popular among the people of Pakistan, who continue to support him passionately. With Allah's will (InshaAllah), he will return as Prime Minister, and under his leadership, Pakistan will rise to greatness once again.");
    }
    else{
        speech(`This is what is found on internet realted to ${message.replace("alex","")}`);
        window.open(`https://www.google.com/search?q=${message.replace("alex","")}`,"_blank");
    }
}