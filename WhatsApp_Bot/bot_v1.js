//############################### START FUNCTION TIME ####################################
function datefull(){
    var currentdate = new Date(); 
    //day
    var day = currentdate.getDate();
    if(day < 10 ){
        day = "0" + day;
    }
    //month
    var month = (currentdate.getMonth()+1);
    if(month < 10 ){
        month = "0" + month;
    }
    //hours
    var hours = currentdate.getHours();
    if(hours < 10 ){
        hours = "0" + hours;
    }
    //minutes
    var minutes = currentdate.getMinutes();
    if(minutes < 10 ){
        minutes = "0" + minutes;
    }
    //seconds
    var seconds = currentdate.getSeconds();
    if(seconds < 10 ){
        seconds = "0" + seconds;
    }
    //year
    var year = currentdate.getFullYear();
    
    var datetime = `${day}/${month}/${year} @ ${hours}:${minutes}:${seconds}`;
    return datetime;
    }
    //############################### END FUNCTION TIME ####################################
    
    
    //############################### START FUNCTION MSG ####################################
    function msg(path,filename){
        //read files
        var fs = require('fs');
        const { type } = require('os');
        const internal = require('stream');
        //variables
        var text = "";
        let newtext = "";
        let firstline = "";
        let final_text = [];
        //read files
        text = fs.readFileSync(path+"\\"+filename, 'utf8').toString().split("\n"); //read all lines of the file
        firstline = text[0].split('\n').toString() + "\n";//getting only the firstline
            text.slice(1).forEach(element => { //foreach to ignore the first line and save all others
            newtext = newtext + element + "\n";
        });
        //remove the used line
        fs.writeFile(path+"\\"+filename, newtext, (err) => { //write the new file, with the first line removed
            // In case of a error throw err.
            if (err) throw err;
        })
          final_text[0] = firstline.substring(0,firstline.indexOf(' ')); //numbers
          final_text[1] = firstline.substring(firstline.indexOf(' ') + 1); //text
        return final_text;
        }
    //############################### END FUNCTION MSG ####################################
    
    
    //############################### START FUNCTION WHATSAPP ####################################
    function wpp(path,filename,delay_message=5000,delay_read=1000,max_error_tries=3){
    //code start
    console.log("Starting Code...");
    const args = process.argv;
    const qrcode = require('qrcode-terminal');
    const { Client, LocalAuth } = require('whatsapp-web.js');
    console.log("Auth ok...");
    
    let repeat = true;
    let i = 0;
    
    while(repeat == true){
        try{ //start try
                    repeat = false; //stop while loop
                    //auth
                    const client = new Client({
                        authStrategy: new LocalAuth()
                    });
                    console.log("New client OK...");
                    //qr code
                    client.on('qr', qr => {
                        qrcode.generate(qr, {small: true});
                    });
                    console.log("QR code OK...");
    
                    //client ready
                    client.on('ready', () => {
                        console.log('Client is ready!');
    
                    //send msg
                    time=setInterval(function(){
                        let returning = msg(path,filename);

                    //console.log(numbers);
                    //console.log(text);
                    if(returning[0].length > 10){
                    const numbers = returning[0].split(",");
                    let text = returning[1];
                    console.log(`Message Found on first Line - ${datefull()}.`);
                    let rename = new RegExp("xxx", "g"); 
                    text = text.replace(rename, '\n'); //replace all "xxx" to breakline "\n"
                    let rename2 = new RegExp("_", "g");
                    text = text.replace(rename2, ' '); //replace all "_" to " "
                    let chatId = "";
                    let j = 0;
                    console.log(returning);
                    numbers.forEach(element => {
                           setTimeout(function() {
                            chatId = element + "@c.us";
                            client.sendMessage(chatId, text);
                            console.log(`Message Sent to ${element} - ${datefull()}.`);
                           }, delay_message * j);
                            j++;   
                    });
                    }
                    else{
                        //console.log(`First line has empty message - ${datefull()}.`);
                    }
                    },delay_read);
    
                    });
                    client.initialize();
    
            } //end try
        catch{ //start catch
            repeat = true; //repeate while loop
            if(i++ == max_error_tries){ 
                let errorcode = 1;
                console.log(errorcode);
                return errorcode;    
                }
            } //end catch
    }
    }
    //############################### END FUNCTION WHATSAPP ####################################
    
    //---------
    //START CONFIG
    const path = "";
    const filename = "";
    //END CONFIG
    //---------
    
    //call function wpp
    wpp(path,filename,delay_read=10000,delay_message=5000);