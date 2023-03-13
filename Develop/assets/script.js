Plan = [];

//load Plan
var loadPlan = function(){
    Plan = JSON.parse(localStorage.getItem("Plan"))
    if(!Plan) {
        Plan={};
    } ;
    printPlan(Plan)
}

var printPlan = function(){
    $.each(Plan, function(list, arr){
        var taskP = $("<p>").addClass("description task-item-" + list).text(arr)
        $("#task-item-" + list).replaceWith(taskP);
    })
 }



var Today = (moment().format("MMMM D, YYYY hh:mm"))
    $("#currentDay").text(Today);

//COLOR CHANGE BASED ON CURRENT TIME
var changeColorHour =function(){
    var currentHour = moment().hour()

    for(var i=8; i<18; i++){
        var taskArea = $("#task-"+i)
        if(currentHour>i){
            $(taskArea).addClass("past");
        } else if (currentHour === i){
            $(taskArea).addClass("present");
        }else{
            $(taskArea).addClass("future")
        }
    }
}

// Update plan
$(".taskBin").on("click", "p", function(){

    var text =$(this)
      .text()
      .trim();
    var textInput =$("<textarea>")
      .addClass("form-control")
      .val(text);

    $(this).replaceWith(textInput);
     textInput.trigger("focus");
  });


$(".taskBin").on("blur", "textarea", function() {

    var text = $(this)
      .val()
      .trim();

    //recreate p element
    var taskP = $("<p>")
      .addClass("taskItem")
      .text(text);


    $(this).replaceWith(taskP);
  });

  //Save Plan
  $(".saveBtn").on("click", function(){

      var index = $(".saveBtn").index(this);

      Plan[index] = $(this).parent().find(".taskItem").text();
      localStorage.setItem("Plan", JSON.stringify(Plan));
  });

  setInterval(function(){
      changeColorHour();},1000*60*60);

  loadPlan();
  changeColorHour();
