  // 策略模式的demo: 对象有交税的行为，但交税 payTax 在不同的情况下有不同的实现算法，  
  // https://zh.wikipedia.org/wiki/%E7%AD%96%E7%95%A5%E6%A8%A1%E5%BC%8F
  
  function Context(strategy) {
    this.strategy = strategy;
  }
  Context.prototype.payTax = function() {
    this.strategy();
  };
  
  // 交税算法 A
  function strategyA() {
    console.log('在中国交税...')
  }
  // 交税算法 B
  function strategyB() {
    console.log('在美国交税...')
  }

  var contextA = new Context(strategyA);
  contextA.payTax() // 在中国交税

  var contextB = new Context(strategyB);
  contextB.payTax() // 在美国交税