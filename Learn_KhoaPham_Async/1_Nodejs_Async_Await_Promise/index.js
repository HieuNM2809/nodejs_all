console.log('Start App');

let aPromise = ()=>{
    return new Promise(function(resolve, reject)  {  
        setTimeout(() => resolve(4),  2000);
    })
};
 
 // handler can't change promise, just value
 var callFunc = async ()=>  {
   var a = await aPromise();
   console.log(a);
   console.log('in func 2');
 };
 callFunc();
 console.log('End App');