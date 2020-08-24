require.config({
    paths:{
        jquery:'jquery-1.11.3',
        'jquery-cookie':'jquery.cookie',
        parabola:'parabola',
        list1:'list1',
    },
    shim:{
        'jquery-cookie':['jquery'],
        parabola:{
            exports:'_'
        }
    }
})
require(['list1'],function(list1){
    list1.downloadData()
})