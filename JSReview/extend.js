function Animal(species) {
    this.species = species;
}

Animal.prototype.move = function() {};


function Cat(name, color) {
    this.name = name;
    this.color = color;
}


//构造函数继承: 将父类的构造函数绑定在子对象上
/**
 * 缺点：
 *      实例并不是父类的实例，只是子类的实例
 *      只能继承父类的实例属性和方法，不能继承原型属性/方法
 *      无法实现函数复用，每个子类都有父类实例函数的副本，影响性能
 */

function CatConstructorExtend(name, color) {
    Animal.call(this, 'CatConstructorExtend');
    this.name = name;
    this.color = color;
}

CatConstructorExtend.prototype.clumb = function() {
    console.log(`${this.name}爬了'5'米！`);
};

let cat1 = new CatConstructorExtend('瓜子', '白色');

//*****************************************************************

//原型继承： 将子类的Prototype对象指向Animal的实例对象,可以继承父类上的原型属性
/**
 * 缺点：
 * 无法实现多继承
 * 要新增原型属性和方法，则必须放在new Animal()这样的语句之后执行
 * 来自原型对象的引用属性是所有实例共享的:new Animal('CatPrototypeExtend')
 * 创建子类实例时，无法向父类构造函数传参
 */

// 且在指向父类对象的过程中，父类构造参数写死，不灵活
function CatPrototypeExtend(name, color) {
    this.name = name;
    this.color = color;
}

CatPrototypeExtend.prototype = new Animal('CatPrototypeExtend');
CatPrototypeExtend.prototype.constructor = CatPrototypeExtend;
let cat2 = new CatPrototypeExtend('瓜子', '白色');


//利用空对象作为中介进行继承：
function NoopObjectExtend(child, parent) {
    let F = function() {};
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.uber = parent.prototype;//备用：用于打开父对象，调用父对象的方法
}

/**
 * 组合继承：
 *      优点：
 *          可以继承实例属性/方法，也可以继承原型属性/方法
 *          既是子类的实例，也是父类的实例
 *          不存在引用属性共享问题
 *          可传参
 *          函数可复用
 *      缺点：
 *        调用了两次父类构造函数，生成了两份实例
 */
function CatMix(name, color){
    Animal.call(this);
    this.name = name;
    this.color = color;
}
CatMix.prototype = new Animal();
CatMix.prototype.constructor = Cat;


//拷贝继承：for in
function CatCopy(name){
    var animal = new Animal();
    for(var p in animal){
        Cat.prototype[p] = animal[p];
    }
    Cat.prototype.name = name || 'Tom';
}

//git当前分值'dev'上提交：冲突master