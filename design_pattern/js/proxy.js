// 代理模式 所谓的代理者是指一个类别可以作为其它东西的接口

class  RealInternetAccess {
  constructor(employee) {
    this.employee = employee;  
  }
  grantInternetAccess() {
    console.log("Internet Access granted for employee: "+ this.employee.name);  
  }
}
// 代理类
class ProxyInternetAccess {
 constructor(employee) {
    this.employee = employee;  
  }
  grantInternetAccess() {
    // level 大于 4， 有网络访问权限
    if (this.employee.level > 4) {
       const realAccess = new RealInternetAccess(this.employee);
       realAccess.grantInternetAccess();
       return
    }
    console.log('No Internet access granted. Your job level is below 5')
  }
}

const accesser = new ProxyInternetAccess({ name: "zack zhong", level: 4 });
accesser.grantInternetAccess();