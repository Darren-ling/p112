prediction_1="";

Webcam.set({
    height:350,
    width:350,
    image_format:'jpeg',
    jpeg_quality:100
})
Webcam.attach('#div_camera');

function take_snapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("div_snapshot").innerHTML='<img id="capture_image" src="'+data_uri+'"/>';
});    
}

console.log("ml5 version:",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/IhLNQmYVW/model.json",modelLoaded)
function modelLoaded(){
    console.log("modelLoaded successfully")
}

function capture_image(){
    img=document.getElementById("capture_image")
    classifier.classify(img,gotResult)
}

function gotResult(error,result){
    if (error){
        console.log(error)
    }else{
        console.log(result)
        document.getElementById("p1_name").innerHTML=result[0].label
        prediction_1=result[0].label
        check();
        if (result[0].label == "This is looking great"){
document.getElementById("e1_emoji").innerHTML="&#128076;";
        }
        if (result[0].label == "All the best"){
            document.getElementById("e1_emoji").innerHTML="&#128077;";
        }
        if (result[0].label == "That was a marvelous victory"){
            document.getElementById("e1_emoji").innerHTML="&#9996;";
        }           
    }
}

function check(){
var synth=window.speechSynthesis;
speak_data_1="The first prediction is"+prediction_1;
var utterThis = new SpeechSynthesisUtterance(speak_data_1);
synth.speak(utterThis);
}