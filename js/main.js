'use strict'

document.addEventListener('DOMContentLoaded', makeJs);

function makeJs(){
  var url = 'http://localhost:8000/api/developers';
  var globalData;
  $.getJSON(url, getDevelopers)


  function getDevelopers(response){
    // console.log(response);
    globalData = response;
    var main = document.getElementById('main')
    var name;
    var company;
    var experience;
    var element;
    var idDev;
    var divElement;
    var deleteDev;
    var editDev;
    for (var i= 0; i<response.length ;i++){
      // console.log(response[i]);
      name = response[i].name;
      company = response[i].company;
      experience = response[i].experience;
      idDev = response[i].id;

      element= document.createElement('article');
      divElement= document.createElement('div');
      element.className += "card";
      element.setAttribute('id', idDev);
      divElement.className += "flex";
      divElement.innerHTML = '<p class="name"><b>'+name+'</b></p> <p class="company">Company: '+company+'</p> <p class="experience"> Experience: '+experience+' years</p><p class=""></p> <div class="buttonSection"><a class="blue btn pri" id="e'+idDev+'">Edit</a><a class="red btn pri" id="d'+idDev+'">Delete</a></div>';
      element.appendChild(divElement);
      var IDD= 'd'+idDev;
      var IDE= 'e'+idDev;
      main.appendChild(element);
      


      deleteDev = document.getElementById(IDD);
      deleteDev.addEventListener('click', deleteDeveloper);
      editDev = document.getElementById(IDE);
      editDev.addEventListener('click', editDeveloper);
      // console.log(editDev)

    }
  };



  function makePost(dataPost){
    console.log(dataPost)
    $.post("http://localhost:8000/api/developers", dataPost, function(datapost,status){},'json');
    render();
  };
  var divDev;
  function render(){
    divDev= document.getElementById('main')
    $(divDev).empty();
    $.getJSON(url, getDevelopers);
  }

  var refId;
  var nameRef;
  function deleteDeveloper(){

    refId= this.getAttribute('id')
    refId= refId.split('');
    refId= Number(refId[1]);
    console.log(refId);
    var nameRef= prompt('¿Estas seguro de querer borrar a este developer?, si es así introduce el nombre del usuario');
    console.log(globalData);
    for (var item in globalData){
      console.log(globalData[item].name);
      if(nameRef === globalData[item].name){
          refId= globalData[item].id
          var urlRef = 'http://localhost:8000/api/developers/'+refId
          $.ajax({
                    url: urlRef,
                    type: 'DELETE',
                    success: render
                });
      }
    };
  };
  function editDeveloper(){
    console.log(this)
    refId= this.getAttribute('id')
    refId= refId.split('');
    refId= Number(refId[1]);
    console.log(refId);
    var formul = document.forms.editDev;
    formul.addEventListener('submit', validateDeveloper);
    //Modificar la funcion validate dev to only validate forms without send anything to the server
  }

  var formul = document.forms.formulname;
  formul.addEventListener('submit', validateDeveloper);

  function validateDeveloper(e){
    var form = this;
    e.preventDefault();
    var name = form.name.value;
    var company = form.company.value;
    var experience = form.experience.value;
    experience = Number(experience);

    if(typeof name != 'string' || name.length < 2 || name.length > 35) {
      alert('algo va mal con el nombre');
      return false;
    }else{
      if(typeof company != 'string' || company.length < 2 || company.length > 25) {
        alert('algo va mal con la empresa');
        return false;
      }else{
        if(isNaN(experience)){
          alert('algo va mal con la experiencia');
          return false;
        }else{
          var dataPost ={
            "name": name,
            "company": company,
            "experience": experience};
            makePost(dataPost);
        }

      }

    }

  }


}
