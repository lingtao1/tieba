export default function debounce(fn, delay = 10000,immediate = false) {
      var timer // 维护一个 timer
      return function () {
        var _this = this // 取debounce执行作用域的this
        var args = arguments
        if (timer) {
          clearTimeout(timer)
        }

        if(immediate){
          var callnow = !timer
          if(callnow) {
            fn.apply(_this, args)
          }

           timer = setTimeout(()=>{
              timer = null
            },delay)
        }else {
          timer = setTimeout(function () {
          fn.apply(_this, args) // 用apply指向调用debounce的对象，相当于_this.fn(args);
        }, delay)
        }

      
      }
    }