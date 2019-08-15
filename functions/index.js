const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
function getones(num){
    var count = 0;
    let local = Math.floor(num);
    while(local>0){
        if(local%2===1){
            count = count + 1;
        }
        local = Math.floor(local/2);
    }
    return count;
}



exports.Bitproblem = functions.https.onRequest( async(request, response) => {
   
   
   try{
    var A = request.query.A;
   var B = request.query.B;
   }catch(exeption){
       response.send("Hello from Priyanshu! \n \n "+
       "There is Something wrong with the input please check");
   }

   var onesinA = getones(A);
    var onesinB = getones((B-1));

   var result = -1;

   if(B !== 1){
       if(onesinA<=onesinB){
           result = onesinB - onesinA;
       }else{
           result = 1;
       }
       result++;
   }
   try{
    const snapshot = await admin.database().ref('/query').push({"A": A,"B":B,"Answer":result}); 
   }catch(exeption){
       Console.log("Unable to update "+exeption);
   }
   
   response.send(
        "<center>Hello from Priyanshu!<br> <br>"+
        "Thanks for using this website<br> <br>"+
        "Your Answer for A = "+A+"  B = "+B+
        "  is : "+result+
        "<br> <br> You can find the question at : <br>"+
        "https://www.codechef.com/JUNE18B/problems/BINSHFFL/"+
        "<br> <br> <br> <br> Enjoy :D"
        );
});
