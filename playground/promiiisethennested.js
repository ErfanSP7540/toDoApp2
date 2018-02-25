var p = new Promise( (res,rej)=>{
    res('this is output')
} );

var p2 = new Promise( (res,rej)=>{
    rej('from_promse2')
} );

// p
// .then( out=> {console.log(out);return out+"1" } )
// .then( out=> {console.log(out);return out+"2" } )
// .then( out=> {console.log(out);return out+"3" } )
// .then( out=> {console.log(out);return out+"4" } )
// .then( out=> {console.log(out);return out+"5" } )
// .catch( out=>console.log(out) )



p
.then( out=> {console.log(out);return out+"1" } )
.then( out=> {console.log(out);return out+"2" } )
.then( out=> {console.log(out+'<<');return (p2.then( ()=>{return "promise2"}  )) } )
.then( out=> {console.log(out+"<<<");return out+"4" } )
.then( out=> {console.log(out);return out+"5" } )
.catch( out=>console.log("catch:"+out) )