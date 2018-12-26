'use strict';

const ngrok = require('./get_public_url');
const ViberBot = require('viber-bot').Bot;
const winston = require('winston');
const toYAML = require('winston-console-formatter');
const BotEvents = require('viber-bot').Events;
const PictureMessage = require('viber-bot').Message.Picture;
const TextMessage = require('viber-bot').Message.Text;
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const bot = new ViberBot({
    authToken: "48cea3353aa7d4d0-3dcf0c72ef38a324-92e2662305cbb93f",
    name: "Football",
    avatar: "https://vi.ill.in.ua/m/625x469/1371357.jpg"
});

var regexp1 = /\bexternal\b/g;
//var regexp1 = /\btest\b/g;
var regexp2 = /\bExternal\b/g;
var SmallVidelenoeTolkovanieSlova;
var BigVidelenoeTolkovanieSlova;
var i = 0;


function pereda4a2Bot(Message2bot, responseFromMerriam) {
    var text2windowsL = "Synonyms " + `\u00AB` + Message2bot + `\u00BB` + ": " + `\u000A\u000D\u000A\u000D`;
    //	var xhrGlosbe;
    //  var urlGlosbe;
    var urlMerriam;
    var xhrMerriam;
    var urlBotT;
    var xhrBotT;
    //	var slovoZapros2Glosbe;
    var slovoZapros2Merriam;
    //	var StrokaGlosbeJsonData;
    var StrokaMerriamJsonData;
    //	var ObjectGlosbeJsonData;
    var ObjectMerriamJsonData;
    var SynonymsSlova;

    // ----------------

    var Dictionary = require('./dictionary'),

        //pass the constructor a config object with your key
        dict = new Dictionary({
            key: process.argv[2]
        });

    //sample method
    //  var Message2botMerriam = Message2bot.toLowerCase();
    dict.define(Message2bot, function(error, result) {
        if (error == null) {
            for (var i = 0; i < result.length; i++) {
                console.log(i + '.');
                console.log(result[i]);
                console.log('Part of speech: ' + result[i].partOfSpeech);
                console.log('Definitions: ' + result[i].definition);
                console.log(result[i].definition)
                responseFromMerriam.send(new TextMessage(`Part of speech: ${result[i].partOfSpeech} \nDefinitions: ${result[i].definition}`));
            }
        } else if (error === "suggestions") {
            console.log(Message2bot + ' not found in dictionary. Possible suggestions:');
            for (var i = 0; i < result.length; i++) {
                //  			console.log('66 :' + result[i]);
                responseFromMerriam.send(new TextMessage(`${result[i]}`));
            }
        } else console.log(error);
    });

    //------------------

    console.log("36 Message2bot: " + Message2bot);
    /*
      //  запрос в glosbe
    //	slovoZapros2Glosbe = encodeURIComponent(Message2bot);
    	slovoZapros2Merriam = encodeURIComponent(Message2bot);

    //  responseFromGlosbe.send( new TextMessage(`${text2windowsL}`));

    //  xhrGlosbe = new XMLHttpRequest();
      xhrMerriam = new XMLHttpRequest();

    	//urlGlosbe = "https://glosbe.com/gapi/tm?from=eng&dest=eng&format=json&pretty=true&phrase=" + slovoZapros2Glosbe;
    //	urlGlosbe = "https://glosbe.com/gapi/tm?from=eng&dest=eng&format=json&pretty=false&phrase=" + slovoZapros2Glosbe;
      urlMerriam = `https://dictionaryapi.com/api/v3/references/thesaurus/json/${Message2bot}?key=ccf9ce88-1b2f-4fe2-84d4-8e13dfc98050`;

    //  xhrGlosbe.open('GET', urlGlosbe, true);
    //  xhrGlosbe.open('GET', urlMerriam, true);
      xhrMerriam.open('GET', urlMerriam, true);

      console.log("51 urlMerriam: " + urlMerriam);

      xhrMerriam.onload = function () {

        StrokaMerriamJsonData = xhrMerriam.responseText;
    	  ObjectMerriamJsonData = JSON.parse(StrokaMerriamJsonData);
    /*
       var count1 = 0;
    	 for (count1 in ObjectGlosbeJsonData.examples) {
    				var perevodSlovaFirst = ObjectGlosbeJsonData.examples[count1].first;
    				text2windowsL = text2windowsL + `\u2022` + perevodSlovaFirst + `\u000A\u000D\u000A\u000D`;
    //        console.log("57  " +text2windowsL );
    //        console.log('58 \n');
    //				var perevodSlovaSecond = ObjectGlosbeJsonData.examples[count1].second;
    //				text2windowsL = text2windowsL + ' ' + perevodSlovaSecond + '  ';
    //        console.log("61  " +text2windowsL );
    //        console.log('62 \n');
    		}

        console.log(ObjectMerriamJsonData);
        console.log();

        var countM1 = 0;
        var countM2 = 0;
        for (countM1 in ObjectMerriamJsonData){
          console.log(ObjectMerriamJsonData[0].meta.syns[0]);
          for(countM2 in ObjectMerriamJsonData[countM1].meta.syns){
            SynonymsSlova = ObjectMerriamJsonData[countM1].meta.syns[countM2];
            var i = 0;
            for (i = 0; i < SynonymsSlova.length; i++) {
              console.log(SynonymsSlova[i]);
              text2windowsL = text2windowsL + `\u2022` + SynonymsSlova[i] + `\u000A\u000D\u000A\u000D`;
            }
          }
       }

        console.log("67  " + text2windowsL );
    //    responseFromMerriam.send( new TextMessage(`${text2windowsL}`));
        console.log('66 ========================================================== \n');
    //    responseFromGlosbe.send( new TextMessage(`${text2windowsL}`));
      };
    /*
    	  alertOnCopyDic(text2windowsL);
        bot.sendMessage(Resp.userProfile, new TextMessage(`${text2windowsL}`));
    //    xhrGlosbe.send(null);
        xhrMerriam.send(null);

    //       отправка боту сообщение
    /*
        urlBotT = 'https://api.telegram.org/bot738032008:AAErHaeHaWgRltGq8pkytx4Vh9DEJYcJUYE/sendMessage?chat_id=@Dulbotplagin&text='+Message2bot;
    		xhrBotT = new XMLHttpRequest();
    		xhrBotT.open('GET', urlBotT, true);
    		xhrBotT.responseType = 'blob';
    		xhrBotT.send();

    */
}



bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    var pereda4a2BotText = '';
    /*
      console.log(response);
      console.log(message.trackingData);

      console.log(`id ->  ${DanieUser.id}`);
      console.log('\n');
      console.log(`name ->  ${DanieUser.name}`);
      console.log();
      console.log(`avatar ->  ${DanieUser.avatar}`);
      console.log();
      console.log(message);
    */
    var Resp = response;

    console.log("108 message.text: " + message.text);
    pereda4a2Bot(message.text, response);

    //  response.send(pereda4a2BotText);


    //  bot.sendMessage(response.userProfile, new PictureMessage('https://images.unsplash.com/photo-1532348374062-fee19177e98f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d4086d5d36662ba037e49111340611aa&auto=format&fit=crop&w=1650&q=80', 'Picture', 'http://boombob.ru/img/picture/Jul/04/76b0604043ef853145661526a3a8d366/mini_3.jpg'));
    //  console.log(response.userProfile);
    //  console.log(new PictureMessage('https://cdn.pixabay.com/photo/2018/12/16/16/48/railing-3878850__340.jpg', 'Picture', 'http://boombob.ru/img/picture/Jul/04/76b0604043ef853145661526a3a8d366/mini_3.jpg'));

    //  var DanieUser = response.userProfile;
    //  bot.getUserDetails(DanieUser)
    //      .then(userDetails => console.log(userDetails))

});



const http = require('http');
const port = process.env.PORT || 8080;
return ngrok.getPublicUrl().then(publicUrl => {
    console.log('Set the new webhook to"', publicUrl);
    http.createServer(bot.middleware()).listen(port, () => bot.setWebhook(publicUrl));
}).catch(error => {
    console.log('Can not connect to ngrok server. Is it running?');
    console.error(error);
});
