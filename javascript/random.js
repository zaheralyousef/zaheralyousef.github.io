      var quotes=[
            {"hadith":"A man asked the Messenger of Allah (pbuh): “Which act in Islam is the best?” He (pbuh) replied, “To give food, and to greet everyone, whether you know or you do not.”","Rawi":"[Bukhari and Muslim]."}, 
            {"hadith":"The Prophet (pbuh) said: “Envy is justified in regard to two types of persons only: a man whom Allah has given knowledge of the Qur’an, and so he recites it during the night and during the day; and a man whom Allah has given wealth and so he spends from it during the night and during the day.", "Rawi": "[Bukhari and Muslim]."},
            {"hadith":"The Messenger of Allah (pbuh) said, “He who performs the Wudu’ perfectly (i.e., according to Sunnah), his sins will leave from his body, even from under his nails.”","Rawi": "[Muslim]."},
            {"hadith":"The Messenger of Allah (pbuh) said: “The supplication made between the Adhan and the Iqamah is never rejected.”","Rawi":" [Abu Dawud and Tirmidhi]."}, 
            {"hadith":"The Messenger of Allah said, “When Allah wishes good for someone, He bestows upon him the understanding of Deen (Islam).” ","Rawi":"[Bukhari and Muslim]."},
            {"hadith":"The Messenger of Allah (pbuh) said, “He who calls others to follow the Right Guidance will have a reward equal to the reward of those who follow him, without their reward being diminished in any respect on that account.”","Rawi":"[Muslim]."},
            {"hadith":"The Messenger of Allah (pbuh) said: “By his good character a believer will attain the degree of one who prays during the night and fasts during the day.” ","Rawi":"[Abu Dawud]"},
            {"hadith":"The Prophet (pbuh) said, “He who believes in Allah and the Last Day must either speak good or remain silent.”","Rawi":" [Muslim]."},
            {"hadith":"The Messenger of Allah (pbuh) said, “Do not indulge in excessive talk except when remembering Allah. Excessive talking without the Remembrance of Allah hardens the heart; and those who are the farthest from Allah are those whose hearts are hard.” ","Rawi":"[Tirmidhi]"},
            {"hadith":"The Messenger of Allah (pbuh) said: “The blood, honour and property of a Muslim is inviolable for another Muslim.” ","Rawi":"[Muslim]."}
            ];   
            
       var quote;              
       function generateQuote(){
          var qId=Math.floor( Math.random()*quotes.length);
          document.getElementById("quoteBlock").innerHTML=quotes[qId].hadith;
          document.getElementById("rawi").innerHTML=quotes[qId].Rawi; 
        }
      
      function GetData(){
        console.log("exicutes");
        $.getJSON("/quotes.json",function(data){
        console.log(data);
        quote = JSON.parse(data);
        console.log(qoute);
       }).success(function(){
           console.log("succes");
       }).error(function(){
           console.log("error")
       }); 
      }
          
      
       $(document).ready( function(){
        generateQuote();
        GetData();

        });
       
  