let trainedNet;

function encode(arg) {
	return arg.split('').map(function(x){if(x.charCodeAt(0)>=255 || x.charCodeAt(0)<0) console.log(x+": "+arg);return (x.charCodeAt(0) / 255)});
   //return arg.split('').map(x => (x.charCodeAt(0) / 255));
}

function processTrainingData(data) {
   return data.map(d => {
       return {
           input: zeroFilledArray(encode(d.input)),
           output: d.output
       }
   })
}

function shuffle(arr){
    var newArr = [];
    while (arr.length) {
        var randomIndex = Math.floor(Math.random() * arr.length),
            element = arr.splice(randomIndex, 1);
		newArr.push(element[0]);       
    }
	return newArr;
  }

function zeroFilledArray(arr){
	let zero = new Array(280).fill(0);
	for(var i=0;i<arr.length;i+=1){
		zero[i]=arr[i];
	}
	return zero;
}

function train(data) {
	const config = {
		hiddenLayers: [7,5],     // array of ints for the sizes of the hidden layers in the network
		activation: 'sigmoid',  // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
	};
   let net = new brain.NeuralNetwork();
   console.log("Starting IA training...");
   net.train(processTrainingData(shuffle(data)),{
		log: true,
		logPeriod: 10,
		errorThresh: 0.016,
		learningRate: 0.09
   });
   trainedNet = net.toFunction();
   console.log('Finished training.');
};

function execute(input) {
   let results = trainedNet(zeroFilledArray(encode(input)));
   console.log(results);
   let output;
   results.trump > results.hillary ? output = 'TRUMP' : output = 'HILLARY';
   return output;
}
train(trainingData);

console.log("Testing AI:");
//HILLARY
tweet="If we claim we are for families, then we have to fix our immigration system. We can't wait any longer for a path to full, equal citizenship.";
console.log("Tweet written by HILLARY: "+tweet);
console.log("AI thinks it is written by "+execute(tweet));
//hillary
tweet="The Jefferson-Jackson Dinner is an Iowa tradition. This year, it starts the 100-day countdown to the caucus. A big night here in Des Moines!";
console.log("Tweet written by HILLARY: "+tweet);
console.log("AI thinks it is written by "+execute(tweet));
//TRUMP
tweet="The reason for the plan negotiated between the Republicans and Democrats is that we need 60 votes in the Senate which are not there! We....";
console.log("Tweet written by TRUMP: "+tweet);
console.log("AI thinks it is written by "+execute(tweet));
//TRUMP
tweet="President Andrew Jackson, who died 16 years before the Civil War started, saw it coming and was angry. Would never have let it happen!";
console.log("Tweet written by TRUMP: "+tweet);
console.log("AI thinks it is written by "+execute(tweet));
//TRUMP
tweet="either elect more Republican Senators in 2018 or change the rules now to 51%. Our country needs a good \"shutdown\" in September to fix mess!";
console.log("Tweet written by TRUMP: "+tweet);
console.log("AI thinks it is written by "+execute(tweet));
//TRUMP
tweet="This month we celebrate the contributions of Asian Americans &amp; Pacific Islanders that enrich our Nation. https://t.co/rEJi9ahOaY";
console.log("Tweet written by TRUMP: "+tweet);
console.log("AI thinks it is written by "+execute(tweet));
//TRUMP
tweet="Congratulations! \n\n'First New Coal Mine of Trump Era Opens in Pennsylvania' https://t.co/aIRllxNLQA";
console.log("Tweet written by TRUMP: "+tweet);
console.log("AI thinks it is written by "+execute(tweet));