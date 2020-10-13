var budgetController = (function() {

    var Expense = function(id, description, value){
        this.id =id;
        this.description= description;
        this.value = value
    }

    var Income = function(id, description, value){
        this.id =id;
        this.description= description;
        this.value = value
    }

    var data ={
        allitems:{
            exp:[],
            inc:[]
        },
        total:{
            exp:0,
            inc:0
        }
    }
    
    return {
        addItem: function(type, des, val){
            var newItem;
            var ID;
            if(data.allitems[type].length >0){
                ID = data.allitems[type][data.allitems[type].length-1].id+1;
            }else{
                ID= 0;
            }

            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            }else if(type==='inc'){
                newItem = new Income(ID, des, val);
            }

            data.allitems[type].push(newItem);

        },
        testing:function(){
            console.log(data);
        }
    }
})();


var UIController = (function(){
    //Code
    var DOMStrings ={
        inputType:'.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value'
    };
    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            }
        },
        getDOMStrings : function(){
            return DOMStrings;
        }
    }
})();

var controller = (function(budgetCtrl,UICtrl) {

    var setupEventListeners = function(){
        var DOM =UICtrl.getDOMStrings();
        document.querySelector(".add__btn").addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        })
    }



    var ctrlAddItem = function(){
        var input, newItem;
        input =UICtrl.getInput();

        newItem = budgetController.addItem(input.type, input.description, input.value);
    }

    return {
        init: setupEventListeners
    }



})(budgetController, UIController);

controller.init();