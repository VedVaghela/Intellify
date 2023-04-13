

let sse = new EventSource("http://10.90.0.42:3000/");
if(sse){
  sse.omessage = console.log
  console.log(sse);
  console.log("hi")
}