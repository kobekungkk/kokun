require.config({
    paths:{
        jquery:'jquery-1.11.3',
        'jquery-cookie':'jquery.cookie',
        parabola:'parabola',
        detail1:'detail1',
    },
    shim:{
        'jquery-cookie':['jquery'],
        parabola:{
            exports:'_'
        }
    }
})
require(['detail1','jquery','jquery-cookie'],function(detail1){
    detail1.downloadDetail()
    detail1.scale()
    detail1.btnClick()
    detail1.addShoppingCar()
    detail1.downloadnav()
    detail1.navHover()
  
    // detail1.ballMove()
})