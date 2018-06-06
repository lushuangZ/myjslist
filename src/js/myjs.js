//1.
var personArr = [
    {name:'网管',src:'./src/img/1.png',des:'我们不一样', sex:'male'},
    {name:'刘璐路',src:'./src/img/2(1).png',des:'我是谁，我在哪', sex:'femal'},
    {name:'王小涵', src:'./src/img/4.png', des:'最可爱的len', sex:'femal'},    
    {name:'卡特', src:'./src/img/3.png',des:'苦涩的沙',sex:'male'},
    {name:'刘炸炸', src:'./src/img/5.png',des:"我来了", sex:'male'},
    {name:'郭奶奶',src:'./src/img/6.png',des:'魔法少女', sex:'male'},
    {name:'王丹',src:'./src/img/7.png',des:"帅炸了",sex:'femal'},
];
// getElementsByTagName 返回值  ；document 记录
//2.
var oUl = document.getElementsByTagName('ul')[0];
// store全局
var store = {
    text:'',
    sex:'btn all',
}
// ele 元素；index 指标；foreach循环用于列举出集合中所有的元素 innerHTML 网页内部
// 根据数组内的对象来展示信息条目 
//3.
function renderList (arr) {
    var htmlStr = '';
    arr.forEach(function (ele ,index){
        htmlStr += '<li><img src = "' + ele.src +'"/><p class="name">' +ele.name + '</p><p class="des">' + ele.des + '</p></li>';
    })
    oUl.innerHTML = htmlStr;
}
renderList(personArr);
//4.
var oInp = document.getElementsByTagName('input')[0];

//6.
oInp.oninput = function () {
    store.text = this.value;
    renderList( lastFilter(personArr) );
};
// oninput 事件 事件对象 render 渲染 ；filterByText 过滤函数
// indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置
// filter过滤数组
//5.
function filterByText (filterText, arr) {
    if(!filterText) {
        return arr;
    }else{
          return arr.filter(function(ele,index){
           return ele.name.indexOf(filterText) != -1;
       });
    }
}

//slice() 方法可从已有的数组中返回选定的元素
//forEach() 方法用于调用数组的每个元素,并将元素传递给回调函数
var oRadioArr = Array.prototype.slice.call(document.getElementsByClassName('btn'),0);
oRadioArr.forEach(function(ele,index) {
     ele.onclick = function() {
         store.sex = this.className;
         renderList( lastFilter(personArr) );
     }
});
function filterBySex ( sexStr,arr) {
    if (sexStr == 'btn all') {
        return arr;
    }else{
        return arr.filter(function (ele,index) {
            if (sexStr.indexOf(ele.sex) != -1) {
                return true;
            }
        })
    }
};
function combineFilterFunc (obj) {
    var combineFilterObj = obj;
    return function (arr) {
        var lastArr = arr;
// for...in 语句用于遍历数组或者对象的属性(对数组或者对象的属性进行循环操作
        for (var prop in combineFilterObj) {
            lastArr = combineFilterObj[prop](store[prop],lastArr);
        }
        return lastArr;
    };
}
 
var lastFilter = combineFilterFunc({text:filterByText,sex:filterBySex});