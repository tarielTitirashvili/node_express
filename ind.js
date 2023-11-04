var isHappy = function(n, finalResult) {
  if(n > 0){
      let result = null
      const sum = n.toString().split('').reduce((acc, num)=>acc + (+num * +num), 0)
      if(sum === 1) return finalResult(true)
      else if(sum < 1) return finalResult(false)
      else if(!finalResult){
        isHappy(sum, (res)=>result = res)
      }
      else isHappy(sum, finalResult)
      return result
  }else return false
};

console.log(isHappy(2));
