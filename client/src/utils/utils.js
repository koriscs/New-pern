export const combineArrays = (reduxCart, dbCart) => {
    console.log("This is the redux store "+JSON.stringify(reduxCart));
    console.log("This is the database"+JSON.stringify(dbCart));
  const combinedArrays = dbCart.filter(items => {
   return reduxCart.filter(reduxItems =>(reduxItems.size !== items.size || reduxItems.item_name !== items.item_name) )
   })
   console.log("This is the combined Array "+JSON.stringify(combinedArrays));
   return combinedArrays;
}