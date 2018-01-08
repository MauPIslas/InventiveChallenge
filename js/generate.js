'use strict'
document.addEventListener('DOMContentLoaded', genereteData)

function genereteData(){
  var mainCont =document.getElementById('main');
  // console.log(mainCont);


      var button =document.getElementById('genereteData');
      button.addEventListener('click', postData);
      // console.log(button.parentElement);


      function postData(){

        // var toHide = this.parentElement;
        // $(toHide).fadeToggle();
        //   setTimeout(function(){ toHide.remove(); }, 1000);

        var data =[{
                  "name": "Angelo",
                  "company": "JelpMi",
                  "experience": 5   },
                  {
                  "name": "Ken",
                  "company": "Mariachi",
                  "experience": 6   },
                  {
                  "name": "Hector",
                  "company": "Mariachi",
                  "experience": 6   },
                  {
                  "name": "Baza",
                  "company": "JelpMi",
                  "experience": 6   },
                  {
                  "name": "Aaron",
                  "company": "Finerio",
                  "experience": 4
                                    },
                  {
                  "name": "Carla",
                  "company": "Uber",
                  "experience": 1
                                    }];

        for(var developer in data){
          console.log(data[developer]);
          $.post("http://localhost:8000/api/developers", data[developer],'json');
        };

      };








};
